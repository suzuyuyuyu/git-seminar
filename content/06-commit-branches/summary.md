---
id: summary
title: "commit・branch・HEADを整理する"
state: summary
diagram: assets/branch-model.svg
---

commitはある瞬間のスナップショットを参照する記録で、IDと親子関係を持ちます。branchはそのcommitを一つ指す名前付きの目印です。HEADは通常、現在作業しているbranchを指し、commitを直接指すとdetached HEADになります。

記録を増やす操作と、目印を付ける操作と、現在地を変える操作を区別できれば、次の実習を図で追えます。原資料64で触れるtagもcommitを指す目印ですが、branchのように新しいcommitに自動で追従させるためのものではありません。

## 要点

記録・名前付きの目印・現在地を分けて読む。

## 付箋

### summary-note [講義]

図の丸、四角、赤いHEADがそれぞれどの役割かを確認してから実習へ進みます。
