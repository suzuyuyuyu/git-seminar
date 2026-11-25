---
id: "show-and-blame"
title: "show / blame"
state: "advanced-inspect-show-and-blame"
diagram: "assets/commands/advanced-show-and-blame.svg"
---

`git show HEAD` は最新commitの説明と差分を読みます。`git blame README.md` は各行を最後に変更したcommitを示します。気になる行のハッシュを `git show` に渡すと、変更理由を調べられます。

blameの名前だけで原因を決めず、commit全体と周辺の履歴を読みましょう。整形だけの変更が直近の履歴になる場合もあります。どちらも履歴を読む操作で、ファイルは変わりません。

## スライド説明

showは指定commitの説明と差分を、blameはファイルの各行を最後に変更したcommitを表示します。

気になる行から変更の経緯や理由を調べるときに使います。

`blame -L 10,20` は10〜20行に絞ります。見つけたIDを`show`に渡し、変更全体を確認します。

## コマンド

```sh
git blame -L 10,20 README.md
git show COMMIT_HASH
```

## 要点

行からcommitへ進み、差分と説明を合わせて読む。
