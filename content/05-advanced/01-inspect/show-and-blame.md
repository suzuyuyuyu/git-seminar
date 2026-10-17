---
id: "show-and-blame"
title: "変更の由来を show と blame でたどる"
state: "advanced-inspect-show-and-blame"
diagram: "assets/curriculum-guide.svg"
---

`git show HEAD` は最新commitの説明と差分を読みます。`git blame README.md` は各行を最後に変更したcommitを示します。気になる行のハッシュを `git show` に渡すと、変更理由を調べられます。

blameの名前だけで原因を決めず、commit全体と周辺の履歴を読みましょう。整形だけの変更が直近の履歴になる場合もあります。どちらも履歴を読む操作で、ファイルは変わりません。

## コマンド

```sh
git show HEAD
git blame README.md
```

## 要点

行からcommitへ進み、差分と説明を合わせて読む。
