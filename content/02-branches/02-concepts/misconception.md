---
id: "misconception"
title: "branchを線全体で囲むと読み違える"
state: "misconception"
diagram: "assets/branch-misconception-source.svg"
---

左右は同じcommitと親子関係です。左は誤解しやすい描き方で、branchが線上のcommit一式を包んでいます。右が今回の読み方で、ブランチの四角は一つの先端commitだけを囲みます。それぞれの比較の中で、左側は別々に進んだ例、右側は統合後の例です。

過去のcommitは親をたどって到達できるため、ブランチから履歴を読むことができます。しかし過去のcommitが、そのブランチにだけ所有されているわけではありません。明示的に統合するまでは、作業ブランチのcommitでmainの目印が自動的に進むこともありません。

## 要点

branchは線ではなく、あくまでも一つのcommitを指す。
