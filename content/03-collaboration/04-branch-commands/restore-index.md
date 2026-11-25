---
id: "restore-index"
title: "restore --staged"
state: "restore-index"
diagram: "assets/commands/branch-commands-restore-index.svg"
---

削除をgit addでステージ済みなら、インデックスからもファイルが取り除かれています。git restore --staged -- hello.pyは、インデックスをHEADの内容に戻します。この時点では作業ツリーのhello.pyはまだ存在しません。

続いてgit restore -- hello.pyを実行すると、戻したインデックスから作業ツリーへファイルを復元できます。編集済みファイルを単にステージから外す場合も--stagedを使い、その場合は作業ツリーの編集が残ります。ここでは最初のcommitがあるリポジトリを前提にしています。

## スライド説明

indexをHEADの内容へ戻し、指定したファイルをステージから外します。

addの対象を選び直すときに使います。作業ツリーにある編集はそのまま残ります。

`--staged` はindexを更新します。削除済みファイルを戻す場合は、その後に通常のrestoreで作業ツリーも復元します。

## コマンド

```sh
git restore --staged -- hello.py
# 削除したファイルも戻す場合
git restore -- hello.py
```

## 要点

HEAD→indexとindex→作業ツリーは、別の復元。

## 付箋

### restore-index-lecture [講義]

--stagedだけでは、作業ツリーのファイルは復元されません。

### restore-index-study

path指定のgit reset HEAD -- hello.pyもindexだけを更新します。両方をHEADへ合わせる--staged --worktreeの指定もありますが、この例は対象の違いを見るため2段階で示します。
