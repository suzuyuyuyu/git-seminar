---
id: stage
title: "02 次の記録に含める内容を選ぶ"
state: stage
diagram: assets/record-flow.svg
wide: true
---

git add hello.pyを実行すると、実行した時点のhello.pyの内容がindexに反映されます。indexは、次のcommitに含める状態を準備する場所です。staging areaとも呼びます。

addしても履歴はまだ増えません。今回の挨拶の変更を記録する準備ができた状態です。

## コマンド

```sh
git add hello.py
```

## 要点

addは、次のcommitに含める状態を準備する。

## 付箋

### add-snapshot [講義]

add後にさらに編集した内容は、もう一度addするまでindexに入りません。

### status-staged

git statusで「Changes to be committed」を確認できます。ファイルを移動する操作ではないので、working treeのファイルはそのまま残ります。
