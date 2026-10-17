---
id: "working-tree"
title: "ファイルを編集する"
state: "working-tree"
diagram: "assets/record-flow.svg"
---

working treeは、エディターで開いて編集するファイルがある場所です。hello.pyの挨拶を変更して保存すると、まずここが変わります。

エディターで保存することと、Gitの履歴を記録することは別の操作です。この時点ではindexも、ローカルとリモートの記録も、変更前のままです。

## コマンド

```sh
git status
```

## 要点

編集と保存で変わるのは、working tree。

## 付箋

### save-is-not-commit [講義]

ファイルを保存しただけではcommitは増えません。

### status-before-stage

既に追跡されているhello.pyなら、statusに「Changes not staged for commit」と表示されます。
