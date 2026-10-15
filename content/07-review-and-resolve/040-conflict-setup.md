---
id: conflict-setup
title: "別の練習用フォルダに競合の履歴を用意する"
state: conflict-setup
presentation-lines: 2, 12, 16, 19
---

PRの練習とは別の、新しいローカル専用フォルダーを使います。初期のhello.pyはdef greet():の次の行を4スペース字下げし、print("Hello, world!")と書きます。挨拶の追加、READMEの追加、READMEへの実行手順追記をそれぞれcommitすると、図にある3つの共通commitができます。

mainからfeat/jaを作り、挨拶だけを「こんにちは!」へ変えてcommitします。これが前章で見た「mainから枝を分けた」時点です。その後mainへ戻り、同じ行の挨拶を「Hello, everyone!」に変えてcommitします。PR統合済みの履歴を再利用せず、独立した履歴で比較します。remoteやpushは不要です。

## コマンド

```sh
mkdir git-seminar-conflict-demo
cd git-seminar-conflict-demo
git init -b main
# hello.py を本文の初期コードで作成
git add hello.py
git commit -m "Add original greeting"
# README.md に教材名を書いて保存
git add README.md
git commit -m "Add README"
# README.md に関数の実行手順を追記して保存
git add README.md
git commit -m "Document how to run greeting"
git switch -c feat/ja
# 挨拶を こんにちは! へ変更して保存
git add hello.py
git commit -m "Translate greeting"
git switch main
# 同じ行を Hello, everyone! へ変更して保存
git add hello.py
git commit -m "Greet everyone"
git status
```

## 要点

別のローカル履歴で、同じ行への二つの変更を作る。

## 付箋

### setup-separate [講義]

PR統合済みのブランチをもう一度mergeしても、この競合例にはなりません。ここでは別の履歴を初めから作ります。
