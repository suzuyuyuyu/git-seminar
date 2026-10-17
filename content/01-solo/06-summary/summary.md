---
id: "summary"
title: "前半のまとめ：状態を読んで、変更を記録する"
state: "solo-summary-summary"
diagram: "assets/curriculum-guide.svg"
---

初めて使う共有リポジトリはcloneし、手元で編集したらstatusとdiffで確認します。addで内容を選び、diff --stagedで確かめ、commitで履歴を残し、pushで共有します。ほかの変更を取得するときは作業を保存・退避してからpull --ff-onlyを使い、分岐していたら内容を確認します。

reset・clean・stashなどは必要になってから調べて使います。Gitに記録していない変更が自動で守られるわけではありません。自分のコードを一つ選び、「変更した目的が伝わるcommitを作り、GitHubで確認する」までを練習してください。

## コマンド

```sh
git status
git diff
git diff --staged
git log --oneline
```

## 要点

clone・add・commit・push・pull・statusを、流れの中で使い分ける。
