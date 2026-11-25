---
id: "cherry-pick"
title: "cherry-pick"
state: "cherry-pick"
diagram: "assets/commands/basic-cherry-pick.svg"
---

別ブランチの特定コミットの変更だけが必要な場合、cherry-pickで現在のブランチへ適用できます。元のコミットを移動するのではなく、通常は別IDの新しいコミットを作ります。

適用先のブランチで実行します。使用例のCOMMIT_HASHを実際のIDに置き換え、差分を確認して使います。依存する変更が別コミットにあれば、1つだけ取っても動くとは限りません。競合時は解消してadd後に --continue、取りやめるなら --abort です。

## スライド説明

指定したcommitの変更を現在のブランチへ適用し、通常は別IDのcommitを作ります。

別ブランチの修正を、一つだけ選んで取り込みたいときに使います。

`--no-commit` はcommitせず適用します。競合解消後は`--continue`、中止する場合は`--abort`です。

## コマンド

```sh
git show COMMIT_HASH
git cherry-pick COMMIT_HASH
```

## 要点

コミット全体の履歴ではなく、選んだ変更を別の枝へ。

## 付箋

### cherry-pick-lecture [講義]

同じ修正を二重に取り込まないよう、適用済みか確認します。

### cherry-pick-study

元ブランチそのものを統合するmergeとは目的が異なります。マージコミットのcherry-pickには親の選択が必要なので、この基本例では通常コミットを使います。
