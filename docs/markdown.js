/* Small, intentionally limited Markdown renderer. Raw HTML is always plain text.
 * Browser checks: render multiline prose, headings, lists, quotes, and a fenced
 * code block containing blank lines; verify that javascript:, data:, //host,
 * backslash URLs, and HTML event handlers stay inert. No HTML parsing is used.
 */
(() => {
  'use strict';

  function safeHref(value) {
    const href = value.trim();
    if (!href || /[\s\u0000-\u001f\u007f\\]/u.test(href) || href.startsWith('//')) return null;
    if (/^[a-z][a-z0-9+.-]*:/iu.test(href) && !/^https?:\/\//iu.test(href)) return null;
    return href;
  }

  function appendInline(parent, source, depth = 0) {
    if (depth > 12) {
      parent.append(document.createTextNode(source));
      return;
    }
    let position = 0;
    let plain = '';
    const flush = () => {
      if (plain) parent.append(document.createTextNode(plain));
      plain = '';
    };
    while (position < source.length) {
      if (source[position] === '\\' && /[\\`*\[\]()]/u.test(source[position + 1] || '')) {
        plain += source[position + 1];
        position += 2;
        continue;
      }
      if (source[position] === '`') {
        const marker = source.slice(position).match(/^`+/u)[0];
        const end = source.indexOf(marker, position + marker.length);
        if (end !== -1) {
          flush();
          const code = document.createElement('code');
          code.textContent = source.slice(position + marker.length, end).replace(/\n/gu, ' ');
          parent.append(code);
          position = end + marker.length;
          continue;
        }
      }
      if (source.startsWith('**', position)) {
        const end = source.indexOf('**', position + 2);
        if (end > position + 2) {
          flush();
          const strong = document.createElement('strong');
          appendInline(strong, source.slice(position + 2, end), depth + 1);
          parent.append(strong);
          position = end + 2;
          continue;
        }
      }
      if (source[position] === '[') {
        const labelEnd = source.indexOf('](', position + 1);
        if (labelEnd !== -1) {
          let cursor = labelEnd + 2;
          let nesting = 1;
          for (; cursor < source.length; cursor += 1) {
            if (source[cursor] === '(') nesting += 1;
            if (source[cursor] === ')' && --nesting === 0) break;
          }
          if (nesting === 0) {
            const href = safeHref(source.slice(labelEnd + 2, cursor));
            if (href) {
              flush();
              const link = document.createElement('a');
              link.setAttribute('href', href);
              appendInline(link, source.slice(position + 1, labelEnd), depth + 1);
              parent.append(link);
              position = cursor + 1;
              continue;
            }
          }
        }
      }
      plain += source[position];
      position += 1;
    }
    flush();
  }

  const fenceStart = line => line.match(/^ {0,3}(`{3,}|~{3,})([^\n]*)$/u);
  const heading = line => line.match(/^ {0,3}(#{2,4})\s+(.+?)\s*#*\s*$/u);
  const listItem = line => line.match(/^ {0,3}(?:([-+*])|([0-9]{1,6})[.)])\s+(.+)$/u);
  const quoteLine = line => /^ {0,3}>[ ]?/u.test(line);
  const startsBlock = line => fenceStart(line) || heading(line) || listItem(line) || quoteLine(line);

  function render(text) {
    const root = document.createElement('div');
    root.className = 'markdown-content';
    const lines = String(text ?? '').replace(/\r\n?/gu, '\n').split('\n');
    let index = 0;
    while (index < lines.length) {
      const line = lines[index];
      if (!line.trim()) { index += 1; continue; }
      const fence = fenceStart(line);
      if (fence) {
        const marker = fence[1];
        const body = [];
        index += 1;
        while (index < lines.length) {
          const candidate = lines[index].trim();
          if (candidate.length >= marker.length && [...candidate].every(character => character === marker[0])) {
            index += 1;
            break;
          }
          body.push(lines[index]);
          index += 1;
        }
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.textContent = body.join('\n');
        const language = fence[2].trim();
        if (/^[\w+-]+$/u.test(language)) code.dataset.language = language;
        pre.append(code);
        root.append(pre);
        continue;
      }
      const title = heading(line);
      if (title) {
        const element = document.createElement(`h${title[1].length}`);
        appendInline(element, title[2]);
        root.append(element);
        index += 1;
        continue;
      }
      if (quoteLine(line)) {
        const body = [];
        while (index < lines.length && quoteLine(lines[index])) {
          body.push(lines[index].replace(/^ {0,3}>[ ]?/u, ''));
          index += 1;
        }
        const quote = document.createElement('blockquote');
        quote.append(render(body.join('\n')));
        root.append(quote);
        continue;
      }
      const firstItem = listItem(line);
      if (firstItem) {
        const ordered = firstItem[2] !== undefined;
        const list = document.createElement(ordered ? 'ol' : 'ul');
        if (ordered && Number(firstItem[2]) !== 1) list.start = Number(firstItem[2]);
        while (index < lines.length) {
          const item = listItem(lines[index]);
          if (!item || (item[2] !== undefined) !== ordered) break;
          const element = document.createElement('li');
          appendInline(element, item[3]);
          list.append(element);
          index += 1;
        }
        root.append(list);
        continue;
      }
      const body = [line];
      index += 1;
      while (index < lines.length && lines[index].trim() && !startsBlock(lines[index])) {
        body.push(lines[index]);
        index += 1;
      }
      const paragraph = document.createElement('p');
      appendInline(paragraph, body.join('\n'));
      root.append(paragraph);
    }
    return root;
  }

  window.GitSeminarMarkdown = Object.freeze({ render });
})();
