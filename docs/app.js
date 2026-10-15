/* Lesson copy, graph models, and diagram states have one shared source. */
(() => {
  'use strict';
  let data;
  const byId = id => document.getElementById(id);
  let activeLesson = null;
  let activeStep = 0;
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
    return activeLesson.sections[activeStep].diagram || activeLesson.diagram || { type: 'svg', src: 'assets/record-flow.svg' };
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
      target.replaceChildren(window.GitCommitGraph.render(activeLesson.graph, activeLesson.sections[activeStep].diagramState));
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
    svg.setAttribute('data-current-state', activeLesson.sections[0].diagramState);
  }

  function showDiagramState(target, state) {
    const diagram = currentDiagram();
    const source = diagram.type === 'commit-graph' ? 'commit-graph' : diagram.src;
    if (target.dataset.source !== source) mountDiagram(target, target.dataset.instance || target.id);
    let svg = target.querySelector('svg');
    if (!svg) return;
    const isGraph = diagram.type === 'commit-graph';
    if (isGraph && svg.getAttribute('data-current-state') !== state) {
      svg = window.GitCommitGraph.render(activeLesson.graph, state);
      target.replaceChildren(svg);
    }
    svg.setAttribute('data-current-state', state);
    // Fit the complete vector drawing inside a stable slide frame, including on narrow screens.
    svg.setAttribute('viewBox', isGraph ? graphViewBox(activeLesson.graph, state) : svg.dataset.fullViewbox);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  }

  function enlargeDiagram() {
    mountDiagram(byId('large-diagram'), 'large');
    showDiagramState(byId('large-diagram'), activeLesson.sections[activeStep].diagramState);
    byId('large-diagram-caption').textContent = activeLesson.sections[activeStep].takeaway;
    byId('diagram-dialog').showModal();
  }

  function renderTOC() {
    const list = byId('chapter-list');
    list.replaceChildren();
    for (const chapter of data.chapters) {
      const row = element('article', 'chapter');
      row.append(element('span', 'chapter-number', String(chapter.number).padStart(2, '0')));
      const copy = element('div', 'chapter-copy');
      copy.append(element('h2', '', chapter.title), element('p', '', chapter.description));
      copy.append(element('p', 'chapter-goal', `到達目標：${chapter.goal}`));
      if (chapter.status === 'ready' && chapter.lessonId) {
        const links = element('div', 'chapter-links');
        const study = element('a', '', '自学習ページを読む');
        study.href = `#study/${chapter.lessonId}`;
        const present = element('a', '', '本番用を開く');
        present.href = `#present/${chapter.lessonId}`;
        links.append(study, present);
        copy.append(links);
      } else {
        copy.append(element('span', 'chapter-status', '構成案・本文は準備中'));
      }
      row.append(copy);
      list.append(row);
    }
    const ready = data.chapters.filter(chapter => chapter.status === 'ready').length;
    const steps = data.lessons.reduce((total, lesson) => total + lesson.sections.length, 0);
    byId('course-status').textContent = `${ready}章・${steps}節を収録。事前準備から共同開発へ順に進み、Chapter 08は必要に応じて参照できます。`;
  }

  function renderStudy(lesson) {
    byId('lesson-title').textContent = lesson.title;
    byId('lesson-description').textContent = lesson.description;
    const outline = byId('lesson-outline');
    outline.replaceChildren();
    for (const section of lesson.sections) {
      const link = element('a', '', section.title);
      link.href = `#study/${lesson.id}/${section.id}`;
      link.dataset.sectionId = section.id;
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
    for (const [index, section] of lesson.sections.entries()) {
      const row = element('section', 'lesson-step');
      row.id = `step-${section.id}`;
      row.dataset.step = index;
      const copy = element('div', 'step-copy');
      const heading = element('h2', '', section.title);
      const anchor = element('a', 'step-anchor', 'この節へのリンク');
      anchor.href = `#study/${lesson.id}/${section.id}`;
      copy.append(element('span', 'step-number', `STEP ${String(index + 1).padStart(2, '0')}`), heading);
      for (const text of section.body) copy.append(window.GitSeminarMarkdown.render(text));
      if (section.command) {
        const pre = element('pre', 'command-block');
        pre.append(element('code', '', section.command));
        copy.append(pre);
      }
      copy.append(element('p', 'takeaway', section.takeaway), anchor);
      const notes = element('aside', 'step-notes');
      notes.setAttribute('aria-label', `${section.title}の補足`);
      for (const note of section.notes) {
        const card = element('div', 'note');
        card.append(element('span', 'note-label', '補足'), window.GitSeminarMarkdown.render(note.body));
        notes.append(card);
      }
      row.append(copy, notes);
      container.append(row);
    }
    mountDiagram(byId('study-diagram'), 'study');
    byId('lesson-present-link').href = `#present/${lesson.id}`;
    const navigation = byId('chapter-navigation');
    navigation.replaceChildren();
    const available = data.chapters.filter(chapter => chapter.status === 'ready');
    const position = available.findIndex(chapter => chapter.lessonId === lesson.id);
    for (const [offset, label] of [[-1, '前の教材'], [1, '次の教材']]) {
      const chapter = available[position + offset];
      if (!chapter) continue;
      const link = element('a', '', `${label}：${chapter.title}`);
      link.href = `#study/${chapter.lessonId}`;
      navigation.append(link);
    }
  }

  function setStudyStep(index) {
    activeStep = index;
    const section = activeLesson.sections[index];
    showDiagramState(byId('study-diagram'), section.diagramState);
    byId('study-diagram-caption').textContent = section.takeaway;
    const modeLink = byId('mode-links').querySelector('a');
    if (modeLink) modeLink.href = `#present/${activeLesson.id}/${section.id}`;
    byId('lesson-present-link').href = `#present/${activeLesson.id}/${section.id}`;
    byId('lesson-outline').querySelectorAll('a').forEach(link => {
      if (link.dataset.sectionId === section.id) link.setAttribute('aria-current', 'location');
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
    if (mode !== 'study' || !activeLesson) return;
    const rows = [...document.querySelectorAll('.lesson-step')];
    const small = window.matchMedia('(max-width:760px), (orientation:portrait) and (max-width:1000px)').matches;
    const line = small ? Math.min(window.innerHeight - 40, document.querySelector('.diagram-panel').getBoundingClientRect().bottom + 40) : window.innerHeight * 0.5;
    let index = 0;
    rows.forEach((row, i) => { if (row.getBoundingClientRect().top <= line) index = i; });
    if (rows.at(-1).getBoundingClientRect().top <= line || window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) index = rows.length - 1;
    setStudyStep(index);
  }

  function renderPresentation() {
    const section = activeLesson.sections[activeStep];
    byId('present-title').textContent = section.title;
    byId('present-takeaway').textContent = section.takeaway;
    const command = section.command || '';
    byId('present-command').textContent = section.presentationCommandLines
      ? section.presentationCommandLines.map(index => command.split('\n')[index]).join('\n')
      : command;
    byId('present-command').hidden = !section.command;
    byId('present-progress').textContent = `${activeStep + 1} / ${activeLesson.sections.length}`;
    const notes = byId('present-notes');
    notes.replaceChildren();
    section.notes.filter(note => note.showInPresentation).forEach(note => {
      const card = element('div', 'note');
      card.append(window.GitSeminarMarkdown.render(note.body));
      notes.append(card);
    });
    showDiagramState(byId('present-diagram'), section.diagramState);
    byId('previous-step').disabled = activeStep === 0;
    byId('next-step').disabled = activeStep === activeLesson.sections.length - 1;
    byId('back-to-study').href = `#study/${activeLesson.id}/${section.id}`;
  }

  function changePresentationStep(delta) {
    if (mode !== 'present') return;
    const next = Math.max(0, Math.min(activeLesson.sections.length - 1, activeStep + delta));
    if (next !== activeStep) {
      activeStep = next;
      location.hash = `present/${activeLesson.id}/${activeLesson.sections[next].id}`;
    }
  }

  function route() {
    if (location.hash === '#main') {
      byId('main').setAttribute('tabindex', '-1');
      byId('main').focus();
      return;
    }
    const [requestedMode, lessonId, sectionId] = location.hash.slice(1).split('/');
    const lesson = data.lessons.find(item => item.id === lessonId);
    const nextMode = lesson && ['study', 'present'].includes(requestedMode) ? requestedMode : 'toc';
    const previousMode = mode;
    const previousLesson = activeLesson;
    mode = nextMode;
    ['toc', 'study', 'present'].forEach(view => { byId(`${view}-view`).hidden = view !== mode; });
    document.body.dataset.mode = mode;
    const links = byId('mode-links');
    links.replaceChildren();
    if (mode === 'toc') {
      document.title = `${data.title} — 目次`;
      window.scrollTo(0, 0);
      return;
    }
    activeLesson = lesson;
    const index = lesson.sections.findIndex(section => section.id === sectionId);
    activeStep = Math.max(0, index);
    const counterpart = mode === 'study' ? 'present' : 'study';
    const link = element('a', '', mode === 'study' ? '本番用を開く' : '自学習用を開く');
    link.href = `#${counterpart}/${lesson.id}/${lesson.sections[activeStep].id}`;
    links.append(link);
    document.title = `${lesson.title} — ${mode === 'study' ? '自学習' : 'ゼミ本番'}`;
    if (mode === 'study') {
      renderStudy(lesson);
      setStudyStep(activeStep);
      requestAnimationFrame(() => {
        centerStudyDiagram();
        if (index >= 0) {
          const small = window.matchMedia('(max-width:760px), (orientation:portrait) and (max-width:1000px)').matches;
          const panel = document.querySelector('.diagram-panel');
          const offset = small ? parseFloat(getComputedStyle(panel).top) + panel.getBoundingClientRect().height + 20 : 110;
          const target = byId(`step-${sectionId}`);
          window.scrollTo(0, window.scrollY + target.getBoundingClientRect().top - offset);
        }
        else window.scrollTo(0, 0);
        trackReading();
      });
    } else {
      if (previousMode !== 'present' || previousLesson !== lesson) mountDiagram(byId('present-diagram'), 'present');
      renderPresentation();
      window.scrollTo(0, 0);
    }
  }

  async function start() {
    try {
      const courseResponse = await fetch('course.json', { cache: 'no-store' });
      if (!courseResponse.ok) throw new Error(`course.json (${courseResponse.status}): ${await courseResponse.text()}`);
      data = await courseResponse.json();
      const sources = new Set();
      for (const lesson of data.lessons) {
        for (const section of lesson.sections) {
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
        if (event.key === 'Home') { event.preventDefault(); location.hash = `present/${activeLesson.id}/${activeLesson.sections[0].id}`; }
        if (event.key === 'End') { event.preventDefault(); location.hash = `present/${activeLesson.id}/${activeLesson.sections.at(-1).id}`; }
      });
      route();
    } catch (error) {
      byId('chapter-list').textContent = `教材を読み込めませんでした。${error.message}`;
      console.error(error);
    }
  }
  start();
})();
