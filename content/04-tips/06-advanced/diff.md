---
id: "diff"
title: "何が変わったかをdiffで読む"
state: "diff"
diagram: "assets/foundations-inspect.svg"
---

git diffはworking treeとindexを比べ、まだaddしていない編集を表示します。git diff --stagedはindexと現在のcommitを比べ、次のcommitに入る変更を表示します。

同じファイルでもaddの前後で表示先が変わります。未追跡ファイルの中身は通常のdiffには出ません。ファイルをエディターで確認してからaddします。

## コマンド

```sh
git diff
git diff --staged
```

## 要点

diffとdiff --stagedは、比較する場所が違う。

## 付箋

### inspect-diff-pager [講義]

長い表示がページャーで開いたらqで戻れます。−は削除側、+は追加側の行です。
