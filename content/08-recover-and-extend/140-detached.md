---
id: detached
title: "過去版を見て、続けるならブランチを作る"
state: detached
---

git switch --detach で過去コミットを確認すると、HEADはブランチ名を介さずコミットを直接指します。これがdetached HEADです。ブランチの先端を動かさず、その版のファイルを調べられます。

そこで作業を続けるなら、その場でgit switch -cを実行して名前を付けます。detached HEADのまま作ったコミットも有効ですが、別の場所へ切り替えるとブランチから到達できなくなり、見失う可能性があります。

## コマンド

```sh
git switch --detach v1.0
# この版から変更を続けたい場合
git switch -c investigate-v1
```

## 要点

過去版を見るのはdetach。残す作業にはブランチを付ける。

## 付箋

### detached-lecture [講義]

切り替える前に、残したいコミットへの目印を確認します。

### detached-study

調査だけなら、未コミットの変更を保存・退避してgit switch mainで戻ります。見失ったら早めにreflogで探しbranchを作ります。detached HEAD自体がファイルを削除するわけではありません。
