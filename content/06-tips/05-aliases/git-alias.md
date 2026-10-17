---
id: "git-alias"
title: "Gitのaliasでよく使う引数をまとめる"
state: "tips-aliases-git-alias"
diagram: "assets/curriculum-guide.svg"
---

`git config --global alias.st status` を設定すると、`git st` でstatusを実行できます。Gitのaliasはgitに続くサブコマンドを短くする設定で、シェルの設定とは別です。

`--global` は自分の他のリポジトリにも適用されます。対象リポジトリだけにしたい場合は `--local` を選びます。最初はstatusやlogなど結果を読み取るaliasから作り、`git config --get-regexp` で設定内容を確かめましょう。

## コマンド

```sh
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --decorate"
git config --get-regexp "^alias\."
git st
```

## 要点

Gitのaliasは git に続くコマンドを短くする。
