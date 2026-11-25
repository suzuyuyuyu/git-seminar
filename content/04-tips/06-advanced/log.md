---
id: "log"
title: "log"
state: "log"
diagram: "assets/commands/advanced-log.svg"
---

logは記録済みのcommitを表示します。--onelineで1件を短く、--graphで親子関係を線で、--decorateでbranchなどの目印を表示します。

--allを付けると、複数のbranchなどの参照からたどれる履歴をまとめて見られます。未commitの編集はこの図には出ません。HEADやbranchの関係は「Gitの難関 “branch” を理解する」のまとめでも確認できます。

## スライド説明

記録済みcommitのメッセージと親子関係を表示します。未commitの編集は表示しません。

変更の経緯や、ブランチの分岐・統合を確認するときに使います。

`--oneline` は1行表示、`--graph` は親子関係、`--decorate` は参照名、`--all` は各参照からたどれる履歴を表示します。

## コマンド

```sh
git log --oneline --graph --decorate --all
```

## 要点

logに並ぶのは、記録済みのcommit。

## 付箋

### inspect-log-order [講義]

通常は新しいcommitが上に表示されます。図の線は親子関係で、単なる時刻の順番ではありません。
