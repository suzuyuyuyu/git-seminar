---
id: "commit"
title: "手元に履歴を記録する"
state: "commit"
diagram: "assets/record-flow.svg"
---

git commitは、indexに準備した状態を新しいcommitとしてローカルリポジトリに記録します。commitには、ファイルの状態に加え、親commitや作者、メッセージなどの情報が残ります。

今回の記録は「挨拶を変更した」というひとつのまとまりです。メッセージを付けておくと、あとで履歴を読む人が変更の意図を理解しやすくなります。

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
