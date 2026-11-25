(() => {
  "use strict";

  const namespace = "http://www.w3.org/2000/svg";
  let renderCount = 0;

  function element(name, attributes = {}, content) {
    const node = document.createElementNS(namespace, name);
    Object.entries(attributes).forEach(([key, value]) => {
      node.setAttribute(key, String(value));
    });
    if (content !== undefined) node.textContent = content;
    return node;
  }

  function render(graph, state) {
    const snapshot = graph.states[state] || graph.states.history;
    if (!snapshot) throw new Error(`Unknown commit graph state: ${state}`);

    const prefix = `git-commit-graph-${++renderCount}`;
    const visible = new Set(snapshot.visible || graph.nodes.map(node => node.id));
    const focus = new Set(snapshot.focus || []);
    const nodes = graph.nodes.filter(node => visible.has(node.id)).map(node => ({
      ...node,
      ...(snapshot.nodePositions?.[node.id] || {}),
      parents: snapshot.parents?.[node.id] || node.parents,
      label: snapshot.labels?.[node.id] ?? node.label,
    }));
    const byId = new Map(nodes.map(node => [node.id, node]));
    const branches = Object.entries(snapshot.branches || {})
      .filter(([, id]) => byId.has(id))
      .sort(([left], [right]) => {
        if (left === right) return 0;
        if (left === "main") return -1;
        if (right === "main") return 1;
        return left.localeCompare(right);
      });
    const head = snapshot.head?.branch;
    const detached = snapshot.head?.commit;
    const viewBox = snapshot.viewBox || graph.viewBox || "0 0 640 640";
    const [, , canvasWidth, canvasHeight] = viewBox.split(/\s+/).map(Number);
    const svg = element("svg", {
      id: prefix,
      viewBox,
      role: "img",
      "aria-labelledby": `${prefix}-title ${prefix}-desc`,
      "data-graph-state": state,
      "data-current-state": state,
    });

    svg.append(
      element("title", { id: `${prefix}-title` }, snapshot.title || "コミット履歴とブランチの現在地"),
      element("desc", { id: `${prefix}-desc` },
        snapshot.description || `下ほど古く、上ほど新しいコミットです。丸はコミットで、横の短いIDはそのコミットを識別します。灰色の実線は親子関係です。四角の目印はブランチの先端にある一つのコミットを囲みます。${detached ? `HEADは${detached}を直接指すdetached HEADです。` : head ? `HEADは現在のブランチ${head}を指します。` : "この図ではHEAD表示を省略しています。"}${branches.map(([name, id]) => `${name}は${id}を指します。`).join("")}`),
      element("style", {}, `
        svg#${prefix} {
          background: #fbfdfc;
          font-family: "Hiragino Sans", "Noto Sans JP", "Yu Gothic", Meiryo, sans-serif;
          text { fill: #1a211e; font-size: 22px; }
          .parent-link { stroke: #868e8b; stroke-width: 3; fill: none; }
          .time-axis { stroke: #b8bcba; stroke-width: 2; stroke-dasharray: 4 7; }
          .time-label { fill: #5f6563; }
          .commit { fill: #30a46c; stroke: #218358; stroke-width: 2; }
          .commit-id { font-family: ui-monospace, Consolas, monospace; }
          .focus { fill: none; stroke: #d13415; stroke-width: 3; }
          .branch-marker { fill: none; stroke: #218358; stroke-width: 2; }
          .branch-connector { fill: none; stroke: #218358; stroke-width: 1.5; }
          .branch-label {
            rect { fill: #e6f6eb; stroke: #cbcfcd; }
            text { fill: #218358; font-size: 24px; font-weight: 600; }
          }
          .head-label {
            rect { fill: #feebe7; }
            text { fill: #d13415; font-size: 22px; font-weight: 700; }
            path { fill: none; stroke: #d13415; stroke-width: 2; }
          }
          .legend { fill: #5f6563; }
          .annotation { font-size: 24px; }
          .highlight-path { fill: none; stroke-width: 5; stroke-linecap: round; opacity: .65; }
        }
      `),
    );

    const definitions = element("defs");
    const timeArrow = element("marker", {
      id: `${prefix}-time-arrow`, viewBox: "0 0 10 10", refX: 8, refY: 5,
      markerWidth: 6, markerHeight: 6, orient: "auto",
    });
    timeArrow.append(element("path", {
      d: "M 1 1 L 8 5 L 1 9", fill: "none", stroke: "#b8bcba", "stroke-width": 1.5,
    }));
    definitions.append(timeArrow);
    svg.append(definitions);

    if (snapshot.showTimeAxis !== false) svg.append(
      element("line", {
        class: "time-axis", x1: 28, y1: 558, x2: 28, y2: 104,
        "marker-end": `url(#${prefix}-time-arrow)`,
      }),
      element("text", { class: "time-label", x: 28, y: 82, "text-anchor": "middle" }, "新"),
      element("text", { class: "time-label", x: 28, y: 586, "text-anchor": "middle" }, "古"),
      element("text", { class: "time-label", x: 18, y: 354, transform: "rotate(-90 18 354)", "text-anchor": "middle" }, "時間"),
    );

    const links = element("g", { "aria-hidden": "true" });
    nodes.forEach(node => {
      (node.parents || []).forEach(parentId => {
        const parent = byId.get(parentId);
        if (!parent) return;
        links.append(element("line", {
          class: "parent-link", x1: parent.x, y1: parent.y, x2: node.x, y2: node.y,
        }));
      });
    });
    svg.append(links);

    (snapshot.paths || []).forEach(route => {
      const points = route.nodes.map(id => byId.get(id)).filter(Boolean);
      if (points.length < 2) return;
      svg.append(element("path", {
        class: "highlight-path", stroke: route.color || "#218358",
        d: points.map((node, index) => `${index ? "L" : "M"} ${node.x} ${node.y}`).join(" "),
      }));
    });

    const commits = element("g");
    nodes.forEach(node => {
      const group = element("g", { "data-commit-id": node.id });
      if (focus.has(node.id)) {
        group.append(element("circle", { class: "focus", cx: node.x, cy: node.y, r: 25,
          style: snapshot.focusColors?.[node.id] ? `stroke:${snapshot.focusColors[node.id]}` : "" }));
      }
      group.append(
        element("circle", { class: "commit", cx: node.x, cy: node.y, r: 17,
          style: snapshot.nodeColors?.[node.id] ? `fill:${snapshot.nodeColors[node.id]}` : "" }),
        element("text", {
          class: "commit-id", x: node.x - 34, y: node.y + 8, "text-anchor": "end",
        }, node.label ?? node.id),
      );
      commits.append(group);
    });
    svg.append(commits);

    // A shared commit gets one frame; its branch labels stack beside that frame.
    const branchOffsets = new Map();
    const branchCounts = new Map();
    branches.forEach(([, id]) => branchCounts.set(id, (branchCounts.get(id) || 0) + 1));
    const framed = new Set();
    const branchLayer = element("g");
    branches.forEach(([name, id]) => {
      const node = byId.get(id);
      const index = branchOffsets.get(id) || 0;
      branchOffsets.set(id, index + 1);
      if (!framed.has(id)) {
        branchLayer.append(element("rect", {
          class: "branch-marker", x: node.x - 29, y: node.y - 29,
          width: 58, height: 58, rx: 4,
        }));
        framed.add(id);
      }

      const position = snapshot.branchPositions?.[name] || {};
      const width = position.width || Math.min(212, Math.max(84, name.length * 14 + 22));
      const x = position.x ?? Math.min(node.x + 36, canvasWidth - 16 - width);
      const y = position.y ?? node.y - (branchCounts.get(id) > 1 ? 76 : 20) + index * 76;
      branchLayer.append(element("path", {
        class: "branch-connector",
        d: `M ${node.x + 29} ${node.y} H ${x - 5} V ${y + 17} H ${x}`,
      }));
      const label = element("g", { class: "branch-label", "data-branch": name });
      const textAttributes = { x: x + 11, y: y + 25 };
      if (name.length * 14 > width - 22) {
        textAttributes.textLength = width - 22;
        textAttributes.lengthAdjust = "spacingAndGlyphs";
      }
      label.append(
        element("rect", { x, y, width, height: 34, rx: 7 }),
        element("text", textAttributes, name),
      );
      branchLayer.append(label);

      if (name === head) {
        const headLabel = element("g", { class: "head-label" });
        const sharedCommit = branchCounts.get(id) > 1;
        const headY = sharedCommit ? y + 44 : y - 42;
        const connector = sharedCommit
          ? `M ${x + 38} ${y + 44} V ${y + 36} m -4 4 l 4 -4 l 4 4`
          : `M ${x + 38} ${headY + 28} V ${y - 2} m -4 -4 l 4 4 l 4 -4`;
        headLabel.append(
          element("path", { d: connector }),
          element("rect", { x, y: headY, width: 76, height: 28, rx: 6 }),
          element("text", { x: x + 38, y: headY + 21, "text-anchor": "middle" }, "HEAD"),
        );
        branchLayer.append(headLabel);
      }
    });
    svg.append(branchLayer);
    if (detached && byId.has(detached)) {
      const node = byId.get(detached);
      const x = node.x + 40;
      const y = node.y - 12;
      const label = element("g", { class: "head-label", "data-detached-head": detached });
      label.append(
        element("path", { d: `M ${x} ${y + 14} H ${node.x + 21} m 7 -4 l -7 4 l 7 4` }),
        element("rect", { x, y, width: 76, height: 28, rx: 6 }),
        element("text", { x: x + 38, y: y + 21, "text-anchor": "middle" }, "HEAD"),
      );
      svg.append(label);
    }
    (snapshot.annotations || []).forEach(item => svg.append(element("text", {
      class: "annotation", x: item.x, y: item.y,
      style: item.color ? `fill:${item.color}` : "",
      "text-anchor": item.anchor || "start",
    }, item.text)));
    if (snapshot.legend !== false) svg.append(element("text", { class: "legend", x: 20, y: canvasHeight - 17 }, snapshot.legend || "丸＝コミット　線＝親子関係　四角＝ブランチ"));
    return svg;
  }

  window.GitCommitGraph = { render };
})();
