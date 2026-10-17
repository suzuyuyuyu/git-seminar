---
id: "simple-flow"
title: "簡単な流れ：4つの領域と3つの操作"
state: "solo-flow-simple-flow"
diagram: "assets/curriculum-guide.svg"
---

working treeは実際に編集するファイルの場所、indexは次のcommitに入れる内容、local repositoryは手元の履歴、remote repositoryはGitHubなどにある共有先の履歴です。

addは作業ファイルの内容をindexへ反映し、commitはindexからスナップショットを作ります。pushは手元で作ったcommitを共有先へ送ります。addした後にさらに編集すると、indexと作業ファイルの内容は別々になるため、commit前にdiff --stagedで確認します。

## コマンド

```sh
git add hello.py
git diff --staged
git commit -m "Update greeting"
git push
```

## 要点

working tree → index → local repository → remote repositoryの順に反映する。
