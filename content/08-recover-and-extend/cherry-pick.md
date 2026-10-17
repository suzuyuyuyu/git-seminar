---
id: cherry-pick
title: "必要な変更だけを別の枝へ適用する"
state: cherry-pick
diagram: assets/recovery.svg
---

別ブランチの特定コミットの変更だけが必要な場合、cherry-pickで現在のブランチへ適用できます。元のコミットを移動するのではなく、通常は別IDの新しいコミットを作ります。

対象のIDと差分、適用先ブランチを確認して使います。依存する変更が別コミットにあれば、1つだけ取っても動くとは限りません。競合時は解消してadd後に --continue、取りやめるなら --abort です。

## コマンド

```sh
git switch release
git show abc1234
git cherry-pick abc1234
```

## 要点

コミット全体の履歴ではなく、選んだ変更を別の枝へ。

## 付箋

### cherry-pick-lecture [講義]

同じ修正を二重に取り込まないよう、適用済みか確認します。

### cherry-pick-study

元ブランチそのものを統合するmergeとは目的が異なります。マージコミットのcherry-pickには親の選択が必要なので、この基本例では通常コミットを使います。
