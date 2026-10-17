---
id: "feature-commit"
title: "add・commitして作業ブランチを進める"
state: "feature-commit"
diagram: "commit-graph"
---

git add README.mdのあと、statusでChanges to be committedになったことを確認します。続いてgit commitでプロフィール追加を記録します。コミットメッセージは何を変えたかわかる内容にします。

図では新しいf1が作られ、feature/nameだけがf1へ進みます。HEADはfeature/nameを指したままなので、作業の現在地もf1になります。mainはc3のままです。最後にstatusでworking tree cleanを確認します。

## コマンド

```sh
git add README.md
git status
git commit -m "docs: add my profile"
git status
```

## 要点

commitが増え、現在作業しているbranchだけが進む。

## 付箋

### feature-commit-note [講義]

元資料70の出力には別名branch/cも混じります。教材では実行したfeature/nameに名前を統一しています。
