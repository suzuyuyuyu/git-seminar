---
id: "keep-work"
title: "過去版を見て、続けるならブランチを作る"
state: "detached"
diagram: "assets/recovery.svg"
---

git switch --detach で過去コミットを確認すると、HEADはブランチ名を介さずコミットを直接指します。これがdetached HEADです。ブランチの先端を動かさず、その版のファイルを調べられます。

そこで作業を続けるなら、その場でgit switch -cを実行して名前を付けます。detached HEADのまま作ったコミットも有効ですが、別の場所へ切り替えるとブランチから到達できなくなり、見失う可能性があります。以下はmainに2件以上のcommitがあり、作業ツリーがcleanな練習用リポジトリの例です。mainの一つ前を調べ、続ける作業に名前を付けます。

## コマンド

```sh
git status
git switch main
git switch --detach 'HEAD~1'
# この版から変更を続けたい場合
git switch -c investigate-previous
```

## 要点

過去版を見るのはdetach。残す作業にはブランチを付ける。

## 付箋

### detached-lecture [講義]

切り替える前に、残したいコミットへの目印を確認します。

### detached-study

調査だけなら、未コミットの変更を保存・退避してgit switch mainで戻ります。見失ったら早めにreflogで探しbranchを作ります。detached HEAD自体がファイルを削除するわけではありません。
