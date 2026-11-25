---
id: "rebase"
title: "rebase"
state: "rebase"
diagram: "assets/commands/branch-commands-rebase.svg"
---

左図は、mainとfeat/popupが分岐した同じ状態から、rebaseとmergeを比較しています。mainでgit rebase feat/popupを実行すると、main固有の変更をfeat/popupの先端へ適用し直し、mainの目印を新しいcommitへ動かします。

mainでgit merge feat/popupを実行する方は、同じ出発点からの別の選択肢です。既存のcommitを残してmerge commitでつなぎます。rebase後に続けてmergeする例ではありません。図のmainは未共有の練習用履歴を前提にします。共有済みの履歴を書き換える場合は共同作業者と合意します。

## スライド説明

現在のブランチ固有の変更を、指定したブランチの先端へ適用し直します。左図ではmainの変更をfeat/popupの上へ乗せ直し、commitのIDも変わります。

未共有の履歴を整理するときに使います。左図はmainで2つの方法を比較するため、未共有の練習用履歴として読みます。

`-i` はcommitの並べ替えやまとめに使います。競合解消後は`--continue`、中止する場合は`--abort`です。

## コマンド

```sh
# 未共有の練習用mainで比較
git switch main
git rebase feat/popup
```

## 要点

rebaseは適用し直し、mergeは元の履歴をつなぐ。

## 付箋

### rebase-lecture [講義]

共有前の作業ブランチで履歴を整理します。共有済みの履歴の書き換えには合意が必要です。

### rebase-study

「履歴を乗せ直す」とは、指定したブランチを新しい土台にする意味です。常に最新になるとは限りません。共有済み履歴を変更するなら共同作業者との合意が必要で、--force-with-leaseも万能ではありません。期待値省略はリモート追跡参照に依存し、バックグラウンドfetchで保護が弱まる場合があります。
