---
id: "diff"
title: "diff"
state: "diff"
diagram: "assets/commands/advanced-diff.svg"
---

git diffはworking treeとindexを比べ、まだaddしていない編集を表示します。git diff --stagedはindexと現在のcommitを比べ、次のcommitに入る変更を表示します。

同じファイルでもaddの前後で表示先が変わります。未追跡ファイルの中身は通常のdiffには出ません。ファイルをエディターで確認してからaddします。

## スライド説明

二つの状態を比較し、追加・削除した行を表示します。既定では未ステージの編集を表示します。

commitする内容を確認するときや、版の間で何が変わったか調べるときに使います。

`--staged` は次のcommitに入る差分、`--stat` は変更量の要約を表示します。`-- ファイル` で対象を絞れます。

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
