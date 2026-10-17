---
id: log
title: "04 commitのつながりを読む"
state: log
diagram: assets/foundations-inspect.svg
---

logは記録済みのcommitを表示します。--onelineで1件を短く、--graphで親子関係を線で、--decorateでbranchなどの目印を表示します。

--allを付けると、複数のbranchなどの参照からたどれる履歴をまとめて見られます。未commitの編集はこの図には出ません。HEADやbranchの詳しい関係はChapter 06で学びます。

## コマンド

```sh
git log --oneline --graph --decorate --all
```

## 要点

logに並ぶのは、記録済みのcommit。

## 付箋

### inspect-log-order [講義]

通常は新しいcommitが上に表示されます。図の線は親子関係で、単なる時刻の順番ではありません。
