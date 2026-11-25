---
id: "stage"
title: "add"
state: "stage"
diagram: "assets/commands/essential-stage.svg"
---

git add hello.pyを実行すると、実行した時点のhello.pyの内容がindexに反映されます。indexは、次のcommitに含める状態を準備する場所です。staging areaとも呼びます。

addしても履歴はまだ増えません。今回の挨拶の変更を記録する準備ができた状態です。

## スライド説明

指定したファイルの現在の内容を、次のcommitに入れる準備場所（index）へ反映します。

編集のうち、今回まとめて記録する変更を選ぶときに使います。

`-p` は変更箇所ごとに選択します。`-A` はリポジトリ全体の追加・変更・削除を準備します。

## コマンド

```sh
git add hello.py
git diff --staged
```

## 要点

addは、次のcommitに含める状態を準備する。

## 付箋

### add-snapshot [講義]

add後にさらに編集した内容は、もう一度addするまでindexに入りません。

### status-staged

git statusで「Changes to be committed」を確認できます。ファイルを移動する操作ではないので、working treeのファイルはそのまま残ります。
