---
id: "branches"
title: "commit・branch・HEADの関係"
state: "summary"
diagram: "assets/branch-model.svg"
---

commitはファイルのスナップショットと親commitなどを持つ記録です。branchは一つのcommitを指す名前付きの目印で、通常はそのbranchでcommitすると先端へ進みます。HEADは通常、現在作業しているbranchを指します。

switchは作業先の切り替え、mergeは別の履歴の統合、rebaseは変更の適用し直しです。記録そのものと参照の位置を区別すると、これらの操作を履歴図で追えます。

## スライド説明

commitはある時点の状態を参照する記録で、親子関係を持ちます。branchは履歴の線そのものではなく、特定のcommitを指す名前です。

HEADは通常、作業中のbranchを指します。commitを直接指すdetached HEADでは、残したい作業にbranchの名前を付けておきます。

switchは作業先を切り替え、mergeは履歴をつなぎます。rebaseは変更を適用し直すため、commitのIDが変わります。共有済みの履歴を作り直す場合は、共同作業者との合意が必要です。

## 要点

記録・目印・現在地を分けると、ブランチ操作を履歴から理解できる。
