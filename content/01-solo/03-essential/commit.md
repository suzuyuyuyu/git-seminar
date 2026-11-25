---
id: "commit"
title: "commit"
state: "commit"
diagram: "assets/commands/essential-commit.svg"
---

git commitは、indexに準備した状態を新しいcommitとしてローカルリポジトリに記録します。commitには、ファイルの状態に加え、親commitや作者、メッセージなどの情報が残ります。

今回の記録は「挨拶を変更した」というひとつのまとまりです。メッセージを付けておくと、あとで履歴を読む人が変更の意図を理解しやすくなります。

## スライド説明

indexに準備した内容を、新しいcommitとして手元の履歴に記録します。

動作する変更や、一つの目的にまとまった変更を保存するときに使います。

`-m` を省略すると設定されたエディターが開き、`--verbose` で差分も確認できます。`--amend` は直前のcommitを作り直します。メッセージのprefixはチームの運用に合わせます。

## コマンド

```sh
git commit -m "Change greeting"
```

## 要点

commitは、indexの状態を手元の履歴に記録する。

## 付箋

### commit-is-local [講義]

commitはローカルの操作です。まだリモートには届いていません。

### commit-includes-index

commitが記録するのはindexの状態です。addしていない編集は今回のcommitに含まれません。
