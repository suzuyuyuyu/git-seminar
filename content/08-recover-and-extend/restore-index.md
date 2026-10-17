---
id: restore-index
title: "削除をステージした場合は、対象を分けて戻す"
state: restore-index
diagram: assets/recovery.svg
---

削除をgit addでステージ済みなら、インデックスからもファイルが取り除かれています。git restore --staged -- hello.pyは、インデックスをHEADの内容に戻します。この時点では作業ツリーのhello.pyはまだ存在しません。

続いてgit restore -- hello.pyを実行すると、戻したインデックスから作業ツリーへファイルを復元できます。編集済みファイルを単にステージから外す場合も--stagedを使い、その場合は作業ツリーの編集が残ります。ここでは最初のcommitがあるリポジトリを前提にしています。

## コマンド

```sh
# 削除をすでにステージした場合
git restore --staged -- hello.py
git restore -- hello.py
git status
```

## 要点

HEAD→indexとindex→作業ツリーは、別の復元。

## 付箋

### restore-index-lecture [講義]

--stagedだけでは、作業ツリーのファイルは復元されません。

### restore-index-study

PDF86の説明を補う節です。path指定のgit reset HEAD -- hello.pyもindexだけを更新します。両方をHEADへ合わせる--staged --worktreeの指定もありますが、この例は対象の違いを見るため2段階で示します。
