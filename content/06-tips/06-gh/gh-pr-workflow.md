---
id: "gh-pr-workflow"
title: "作業branchをpushしてPull requestを開く"
state: "tips-gh-gh-pr-workflow"
diagram: "assets/curriculum-guide.svg"
---

変更をcommitし、テストした作業branchをpushしてからPRを作ります。対象branchを明示する例では、baseが取り込み先のmain、headが作業branchのfeature/readmeです。本文は変更理由と検証内容を `pr.md` に用意します。

`gh pr create` はGitHubにPRを作成します。未pushのbranchではpushやforkを案内される場合があるため、先に共有状態を確認します。作成後は `gh pr view` と `gh pr checks` で本文・差分のリンク・チェック結果を読み、レビューを待ちます。

## コマンド

```sh
git status
# 投稿操作の例。branchと本文を準備してから使う
# git push -u origin feature/readme
# gh pr create --base main --head feature/readme --title "READMEを改善" --body-file pr.md
# 作成済みPRの確認: gh pr view / gh pr checks
```

## 要点

baseとheadを区別し、変更理由と検証を添えてPRを作る。
