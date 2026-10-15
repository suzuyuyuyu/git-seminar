---
id: rebase
title: "同じ分岐をrebaseとmergeで比べる"
state: rebase
---

原資料の図は、同じ共通commitからmainとfeat/popupが分かれ、その両方にcommitが増えた状態を出発点にしています。mainでgit rebase feat/popupを行うと、main側だけにあった変更をfeat/popupの先端の上へ順に適用し直します。mainの元のcommitは別IDのcommitへ作り直され、mainの目印がその先へ進みます。

比較対象のgit merge feat/popupは、同じ分岐前の状態からmainで実行する別の選択肢です。両方の既存履歴を残し、2つの親を持つmerge commitをmainに追加します。図のrebase後とmerge後は、コマンドを連続で実行した結果ではありません。

どの枝の履歴を作り直すかが重要です。この原図はmainを作り直す比較なので、未共有の練習用mainに限る例です。実際の共有済みmainでは実行せず、共有前の作業ブランチで扱います。競合時は解消・add後にgit rebase --continue、中止はgit rebase --abortです。

## コマンド

```sh
# 未共有の練習用mainで、どちらかを比較する
git switch main
git rebase feat/popup
# 同じ出発点での代替案。上の直後に実行しない
git merge feat/popup
```

## 要点

rebaseは適用し直し、mergeは元の履歴をつなぐ。

## 付箋

### rebase-lecture [講義]

原図のmainを書き換える例は、未共有の練習用履歴に限ります。

### rebase-study

PDF85の「最新へ乗せ直す」は、指定したブランチを新しい土台にする意味です。常に最新になるとは限りません。共有済み履歴を変更するなら共同作業者との合意が必要で、--force-with-leaseも万能ではありません。期待値省略はリモート追跡参照に依存し、バックグラウンドfetchで保護が弱まる場合があります。
