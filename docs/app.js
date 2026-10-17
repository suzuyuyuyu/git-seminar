/* Lesson copy, graph models, and diagram states have one shared source. */
(() => {
  'use strict';
  let data;
  const byId = id => document.getElementById(id);
  let activeSection = null;
  let activeStep = 0;
  let activeChapter = null;
  let orderedSections = [];
  let mode = 'toc';
  const svgSources = new Map();
  let scrollPending = false;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function currentDiagram() {
    return activeSection.steps[activeStep].diagram || activeSection.diagram || { type: 'svg', src: 'assets/record-flow.svg' };
  }

  function graphViewBox(graph, state) {
    const box = graph.states[state]?.viewBox || graph.viewBox;
    return Array.isArray(box) ? box.join(' ') : box || '0 0 640 640';
  }

  function mountDiagram(target, suffix) {
    const diagram = currentDiagram();
    target.dataset.source = diagram.type === 'commit-graph' ? 'commit-graph' : diagram.src;
    target.dataset.instance = suffix;
    if (diagram.type === 'commit-graph') {
      target.replaceChildren(window.GitCommitGraph.render(activeSection.graph, activeSection.steps[activeStep].diagramState));
      return;
    }
    target.innerHTML = svgSources.get(diagram.src);
    const svg = target.querySelector('svg');
    svg.dataset.fullViewbox = svg.getAttribute('viewBox');
    // Both instances use the same source, but accessibility IDs must be unique.
    const replacements = new Map();
    svg.querySelectorAll('[id]').forEach(node => {
      replacements.set(node.id, `${node.id}-${suffix}`);
      node.id = `${node.id}-${suffix}`;
    });
    for (const attribute of ['aria-labelledby', 'aria-describedby']) {
      if (svg.hasAttribute(attribute)) {
        svg.setAttribute(attribute, svg.getAttribute(attribute).split(/\s+/).map(id => replacements.get(id) || id).join(' '));
      }
    }
    svg.querySelectorAll('*').forEach(node => {
      for (const attribute of [...node.attributes]) {
        let value = attribute.value;
        replacements.forEach((replacement, original) => {
          value = value.replaceAll(`url(#${original})`, `url(#${replacement})`);
          if (value === `#${original}`) value = `#${replacement}`;
        });
        if (value !== attribute.value) node.setAttribute(attribute.name, value);
      }
    });
      svg.querySelectorAll('style').forEach(style => {
        let css = style.textContent;
        replacements.forEach((replacement, original) => {
          css = css.replaceAll(`url(#${original})`, `url(#${replacement})`);
        });
        style.textContent = css;
      });
    svg.querySelectorAll('image').forEach(node => {
      const href = node.getAttribute('href') || node.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
      if (href && !href.startsWith('#')) node.setAttribute('href', new URL(href, new URL(diagram.src, location.href)).href);
    });
    svg.setAttribute('data-current-state', activeSection.steps[activeStep].diagramState);
  }

  function showDiagramState(target, state) {
    const diagram = currentDiagram();
    const source = diagram.type === 'commit-graph' ? 'commit-graph' : diagram.src;
    if (target.dataset.source !== source) mountDiagram(target, target.dataset.instance || target.id);
    let svg = target.querySelector('svg');
    if (!svg) return;
    const isGraph = diagram.type === 'commit-graph';
    if (isGraph && svg.getAttribute('data-current-state') !== state) {
      svg = window.GitCommitGraph.render(activeSection.graph, state);
      target.replaceChildren(svg);
    }
    svg.setAttribute('data-current-state', state);
    // Fit the complete vector drawing inside a stable slide frame, including on narrow screens.
    svg.setAttribute('viewBox', isGraph ? graphViewBox(activeSection.graph, state) : svg.dataset.fullViewbox);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  }

  function enlargeDiagram() {
    mountDiagram(byId('large-diagram'), 'large');
    showDiagramState(byId('large-diagram'), activeSection.steps[activeStep].diagramState);
    byId('large-diagram-caption').textContent = activeSection.steps[activeStep].takeaway;
    byId('diagram-dialog').showModal();
  }

  function sectionPath(section, step) {
    return `${section.route}${step ? `/${step.id}` : ''}`;
  }

  function adjacentSection(offset) {
    return orderedSections[orderedSections.indexOf(activeSection) + offset];
  }

  function renderSectionNavigation(target, displayMode) {
    target.replaceChildren();
    for (const [offset, label] of [[-1, '前のSection'], [1, '次のSection']]) {
      const section = adjacentSection(offset);
      if (!section) continue;
      const link = element('a', '', `${offset < 0 ? '← ' : ''}${label}：${section.title}${offset > 0 ? ' →' : ''}`);
      link.href = `#${displayMode}/${sectionPath(section)}`;
      target.append(link);
    }
    if (!adjacentSection(1)) {
      const home = element('a', '', '全Sectionの最後です。目次へ →');
      home.href = '#toc';
      target.append(home);
    }
  }

  function renderBreadcrumbs(displayMode) {
    const target = byId(`${displayMode}-breadcrumbs`);
    target.replaceChildren();
    const home = element('a', '', '目次');
    home.href = '#toc';
    const chapter = element('a', '', `Chapter ${String(activeChapter.number).padStart(2, '0')} ${activeChapter.title}`);
    chapter.href = '#toc';
    const chapterId = activeChapter.id;
    chapter.addEventListener('click', () => requestAnimationFrame(() => byId(`chapter-${chapterId}`)?.scrollIntoView()));
    const section = element('a', '', activeSection.title);
    section.href = `#${displayMode}/${sectionPath(activeSection)}`;
    target.append(home, element('span', 'breadcrumb-separator', '›'), chapter, element('span', 'breadcrumb-separator', '›'), section);
    if (displayMode === 'present') target.append(element('span', 'breadcrumb-separator', '›'), element('span', '', `Step ${activeStep + 1}`));
    else section.setAttribute('aria-current', 'page');
  }

  function renderTOC() {
    const list = byId('chapter-list');
    list.replaceChildren();
    for (const chapter of data.chapters) {
      const row = element('article', 'chapter');
      row.id = `chapter-${chapter.id}`;
      row.append(element('span', 'chapter-number', String(chapter.number).padStart(2, '0')));
      const copy = element('div', 'chapter-copy');
      copy.append(element('h3', '', chapter.title), element('p', '', chapter.description));
      if (chapter.goal) copy.append(element('p', 'chapter-goal', `到達目標：${chapter.goal}`));
      const sections = element('ol', 'toc-sections');
      for (const id of chapter.sectionIds) {
        const section = data.sections.find(item => item.id === id && item.chapterId === chapter.id);
        if (!section) continue;
        const item = element('li', 'toc-section');
        const heading = element('div', 'toc-section-heading');
        const title = element('a', 'toc-section-title', section.title);
        title.href = `#study/${sectionPath(section)}`;
        heading.append(title, element('span', 'section-step-count', `${section.steps.length} Step${section.steps.length === 1 ? "" : "s"}`));
        const links = element('div', 'chapter-links');
        for (const [displayMode, label] of [['study', '自学習'], ['present', '講義']]) {
          const link = element('a', '', label);
          link.href = `#${displayMode}/${sectionPath(section)}`;
          link.setAttribute('aria-label', `${section.title}を${label}で開く`);
          links.append(link);
        }
        item.append(heading, links);
        sections.append(item);
      }
      copy.append(sections);
      row.append(copy);
      list.append(row);
    }
    const steps = data.sections.reduce((total, section) => total + section.steps.length, 0);
    byId('course-status').textContent = `${data.chapters.length} Chapters・${data.sections.length} Sections・${steps} Steps。Sectionごとにページを開き、図と説明を順に確かめます。`;
  }

  function renderStudy(lesson) {
    byId('lesson-title').textContent = lesson.title;
    byId('lesson-description').textContent = lesson.description;
    const outline = byId('lesson-outline');
    outline.replaceChildren();
    for (const section of lesson.steps) {
      const link = element('a', '', section.title);
      link.href = `#study/${sectionPath(lesson, section)}`;
      link.dataset.stepId = section.id;
        link.dataset.diagramState = section.diagramState;
      outline.append(link);
    }
    const sources = byId('lesson-sources');
    sources.replaceChildren();
    sources.hidden = !lesson.sources?.length;
    if (lesson.sources?.length) {
      sources.append(element('h2', '', '公式資料で確認する'));
      const list = element('ul');
      for (const source of lesson.sources) {
        const item = element('li');
        const link = element('a', '', source.label);
        link.href = source.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        item.append(link);
        list.append(item);
      }
      sources.append(list);
    }
    const container = byId('lesson-steps');
    container.replaceChildren();
    for (const [index, section] of lesson.steps.entries()) {
      const row = element('section', 'lesson-step');
      row.id = `step-${section.id}`;
      row.dataset.step = index;
      const copy = element('div', 'step-copy');
      const heading = element('h2', '', section.title);
      const anchor = element('a', 'step-anchor', 'このStepへのリンク');
      anchor.href = `#study/${sectionPath(lesson, section)}`;
      copy.append(element('span', 'step-number', `Step ${String(index + 1).padStart(2, '0')}`), heading);
      for (const text of section.body) copy.append(window.GitSeminarMarkdown.render(text));
      if (section.command) {
        const pre = element('pre', 'command-block');
        pre.append(element('code', '', section.command));
        copy.append(pre);
      }
      copy.append(element('p', 'takeaway', section.takeaway), anchor);
      const notes = element('aside', 'step-notes');
      notes.setAttribute('aria-label', `${section.title}の補足`);
      for (const note of section.notes || []) {
        const card = element('div', 'note');
        card.append(element('span', 'note-label', '補足'), window.GitSeminarMarkdown.render(note.body));
        notes.append(card);
      }
      row.append(copy, notes);
      container.append(row);
    }
    mountDiagram(byId('study-diagram'), 'study');
    byId('lesson-present-link').href = `#present/${sectionPath(lesson)}`;
    renderBreadcrumbs('study');
    renderSectionNavigation(byId('chapter-navigation'), 'study');
  }

  function setStudyStep(index) {
    activeStep = index;
    const section = activeSection.steps[index];
    showDiagramState(byId('study-diagram'), section.diagramState);
    byId('study-diagram-caption').textContent = section.takeaway;
    const modeLink = byId('mode-links').querySelector('a');
    if (modeLink) modeLink.href = `#present/${sectionPath(activeSection, section)}`;
    byId('lesson-present-link').href = `#present/${sectionPath(activeSection, section)}`;
    byId('lesson-outline').querySelectorAll('a').forEach(link => {
      if (link.dataset.stepId === section.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    document.querySelectorAll('.lesson-step').forEach((node, i) => node.classList.toggle('is-active', i === index));
  }

  function centerStudyDiagram() {
    const panel = document.querySelector('.diagram-panel');
    const frame = byId('study-diagram').getBoundingClientRect();
    if (!frame.height) return;
    const offset = frame.top - panel.getBoundingClientRect().top + frame.height / 2;
    panel.style.setProperty('--diagram-center-offset', `${offset}px`);
  }

  function trackReading() {
    if (mode !== 'study' || !activeSection) return;
    const rows = [...document.querySelectorAll('.lesson-step')];
    if (!rows.length) return;
    const small = window.matchMedia('(max-width:760px), (orientation:portrait) and (max-width:1000px)').matches;
    const line = small ? Math.min(window.innerHeight - 40, document.querySelector('.diagram-panel').getBoundingClientRect().bottom + 40) : window.innerHeight * 0.5;
    let index = 0;
    rows.forEach((row, i) => { if (row.getBoundingClientRect().top <= line) index = i; });
    if (rows.at(-1).getBoundingClientRect().top <= line || window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) index = rows.length - 1;
    setStudyStep(index);
  }

  function renderPresentation() {
    const section = activeSection.steps[activeStep];
    byId('present-title').textContent = section.title;
    byId('present-takeaway').textContent = section.takeaway;
    const command = section.command || '';
    byId('present-command').textContent = section.presentationCommandLines
      ? section.presentationCommandLines.map(index => command.split('\n')[index]).join('\n')
      : command;
    byId('present-command').hidden = !section.command;
    byId('present-progress').textContent = `Step ${activeStep + 1} / ${activeSection.steps.length}`;
    const notes = byId('present-notes');
    notes.replaceChildren();
    (section.notes || []).filter(note => note.showInPresentation).forEach(note => {
      const card = element('div', 'note');
      card.append(window.GitSeminarMarkdown.render(note.body));
      notes.append(card);
    });
    showDiagramState(byId('present-diagram'), section.diagramState);
    const previousSection = adjacentSection(-1);
    const nextSection = adjacentSection(1);
    const atStart = activeStep === 0;
    const atEnd = activeStep === activeSection.steps.length - 1;
    const previous = byId('previous-step');
    const next = byId('next-step');
    previous.disabled = atStart && !previousSection;
    next.disabled = atEnd && !nextSection;
    previous.querySelector('span').textContent = atStart && previousSection ? '前のSection' : '前のStep';
    next.querySelector('span').textContent = atEnd && nextSection ? '次のSection' : '次のStep';
    previous.setAttribute('aria-label', atStart && previousSection ? `前のSection：${previousSection.title}` : '前のStepへ');
    next.setAttribute('aria-label', atEnd && nextSection ? `次のSection：${nextSection.title}` : '次のStepへ');
    previous.title = previous.getAttribute('aria-label');
    next.title = next.getAttribute('aria-label');
    byId('back-to-study').href = `#study/${sectionPath(activeSection, section)}`;
    renderBreadcrumbs('present');
    renderSectionNavigation(byId('present-section-navigation'), 'present');
  }

  function changePresentationStep(delta) {
    if (mode !== 'present') return;
    const next = activeStep + delta;
    if (next >= 0 && next < activeSection.steps.length) {
      location.hash = `present/${sectionPath(activeSection, activeSection.steps[next])}`;
    } else {
      const section = adjacentSection(delta);
      if (section) location.hash = `present/${sectionPath(section, delta < 0 ? section.steps.at(-1) : section.steps[0])}`;
    }
  }

  function route() {
    if (location.hash === '#main') {
      byId('main').setAttribute('tabindex', '-1');
      byId('main').focus();
      return;
    }
    const raw = location.hash.slice(1);
    let parts;
    try { parts = decodeURIComponent(raw).split('/'); }
    catch { parts = []; }
    const requestedMode = parts[0];
    const legacy = parts.slice(1).join('/');
    if (['study', 'present'].includes(requestedMode) && data.redirects?.[legacy]) {
      history.replaceState(null, '', `#${requestedMode}/${data.redirects[legacy]}`);
      route();
      return;
    }
    const [, chapterId, sectionId, stepId] = parts;
    const chapter = data.chapters.find(item => item.id === chapterId);
    const section = data.sections.find(item => item.chapterId === chapterId && item.id === sectionId);
    const index = section && stepId ? section.steps.findIndex(step => step.id === stepId) : 0;
    const isTOC = raw === '' || raw === 'toc';
    const valid = ['study', 'present'].includes(requestedMode) && chapter && section && index >= 0 && parts.length <= 4;
    const nextMode = isTOC ? 'toc' : valid ? requestedMode : 'error';
    const previousMode = mode;
    const previousSection = activeSection;
    mode = nextMode;
    ['toc', 'study', 'present', 'error'].forEach(view => { byId(`${view}-view`).hidden = view !== mode; });
    document.body.dataset.mode = mode;
    const links = byId('mode-links');
    links.replaceChildren();
    if (mode === 'toc' || mode === 'error') {
      activeSection = null;
      document.title = `${data.title} — ${mode === 'toc' ? '目次' : 'ページが見つかりません'}`;
      if (mode === 'error') byId('unknown-route').textContent = location.hash;
      window.scrollTo(0, 0);
      return;
    }
    activeSection = section;
    activeChapter = chapter;
    activeStep = index;
    const counterpart = mode === 'study' ? 'present' : 'study';
    const link = element('a', '', mode === 'study' ? '講義表示を開く' : '自学習を開く');
    link.href = `#${counterpart}/${sectionPath(section, section.steps[activeStep])}`;
    links.append(link);
    document.title = `${section.title} — ${chapter.title} — ${mode === 'study' ? '自学習' : '講義'}`;
    if (mode === 'study') {
      renderStudy(section);
      setStudyStep(activeStep);
      requestAnimationFrame(() => {
        centerStudyDiagram();
        if (stepId) {
          const small = window.matchMedia('(max-width:760px), (orientation:portrait) and (max-width:1000px)').matches;
          const panel = document.querySelector('.diagram-panel');
          const offset = small ? parseFloat(getComputedStyle(panel).top) + panel.getBoundingClientRect().height + 20 : 110;
          const target = byId(`step-${stepId}`);
          window.scrollTo(0, window.scrollY + target.getBoundingClientRect().top - offset);
        }
        else window.scrollTo(0, 0);
        trackReading();
      });
    } else {
      if (previousMode !== 'present' || previousSection !== section) mountDiagram(byId('present-diagram'), 'present');
      renderPresentation();
      window.scrollTo(0, 0);
    }
  }

  async function start() {
    try {
      const courseResponse = await fetch('course.json', { cache: 'no-store' });
      if (!courseResponse.ok) throw new Error(`course.json (${courseResponse.status}): ${await courseResponse.text()}`);
      data = await courseResponse.json();
      orderedSections = data.chapters.flatMap(chapter => chapter.sectionIds.map(id => data.sections.find(section => section.id === id && section.chapterId === chapter.id)).filter(Boolean));
      const sources = new Set();
      for (const lesson of data.sections) {
        for (const section of lesson.steps) {
          const diagram = section.diagram || lesson.diagram || { type: 'svg', src: 'assets/record-flow.svg' };
          if (diagram.type !== 'commit-graph') sources.add(diagram.src);
        }
      }
      await Promise.all([...sources].map(async src => {
        const response = await fetch(src);
        if (!response.ok) throw new Error(`${src}: ${response.status}`);
        svgSources.set(src, await response.text());
      }));
      renderTOC();
      const panel = document.querySelector('.diagram-panel');
      const diagramFrame = byId('study-diagram');
      const centerDiagram = new ResizeObserver(centerStudyDiagram);
      centerDiagram.observe(panel);
      centerDiagram.observe(diagramFrame);
      byId('previous-step').addEventListener('click', () => changePresentationStep(-1));
      byId('next-step').addEventListener('click', () => changePresentationStep(1));
      byId('enlarge-study-diagram').addEventListener('click', enlargeDiagram);
      byId('enlarge-present-diagram').addEventListener('click', enlargeDiagram);
      byId('close-diagram-dialog').addEventListener('click', () => byId('diagram-dialog').close());
      window.addEventListener('hashchange', route);
      window.addEventListener('scroll', () => {
        if (scrollPending) return;
        scrollPending = true;
        requestAnimationFrame(() => { trackReading(); scrollPending = false; });
      }, { passive: true });
      window.addEventListener('resize', () => {
        if (mode === 'study') trackReading();
        else if (mode === 'present') renderPresentation();
      });
      window.addEventListener('keydown', event => {
        if (byId('diagram-dialog').open || mode !== 'present' || event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
        if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(event.key)) { event.preventDefault(); changePresentationStep(1); }
        if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); changePresentationStep(-1); }
        if (event.key === 'Home') { event.preventDefault(); location.hash = `present/${sectionPath(activeSection, activeSection.steps[0])}`; }
        if (event.key === 'End') { event.preventDefault(); location.hash = `present/${sectionPath(activeSection, activeSection.steps.at(-1))}`; }
      });
      route();
    } catch (error) {
      ['study', 'present', 'error'].forEach(view => { byId(`${view}-view`).hidden = true; });
      byId('toc-view').hidden = false;
      byId('chapter-list').textContent = `教材を読み込めませんでした。${error.message}`;
      console.error(error);
    }
  }
  start();
})();
