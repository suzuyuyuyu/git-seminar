---
id: head
title: "HEADは作業している場所を表す"
state: head
diagram: assets/branch-model.svg
---

現在の作業の基準を表すのがHEADです。通常は、HEADが現在のブランチを指し、そのブランチが一つのcommitを指します。図の左列はHEAD → main → 先端のcommitという関係です。ファイルを編集して保存しただけでは、まだこの関係は変わりません。

右の四列は、mainの位置を保ったまま、HEADがそれぞれ異なる過去のcommitを直接指す比較です。原資料ではHEADを「commitの現在地」と説明しています。到達するcommitだけでなく、間にブランチがあるかにも注目しましょう。ブランチの切り替えと、commitを直接読む操作では、次に記録するときの挙動が違います。

## コマンド

```sh
git status
```

## 要点

通常はHEAD → branch → commitという関係。

## 付箋

### head-note [講義]

図のHEADは赤、ブランチは一つの丸を囲む四角です。HEAD自体が履歴の線ではありません。
