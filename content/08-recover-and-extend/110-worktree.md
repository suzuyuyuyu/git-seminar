---
id: worktree
title: "履歴を共有し、作業場所を分ける"
state: worktree
---

worktreeは、同じリポジトリのコミットや参照を共有しながら、作業ディレクトリを追加する仕組みです。解析中のmainを残し、別ディレクトリで修正を進められます。

例は新しいfix/analysisブランチを作り、隣のanalysis-fixにチェックアウトします。各worktreeの作業ツリーとインデックスは独立しています。同じブランチを複数worktreeで同時にチェックアウトすることは原則拒否されます。

## コマンド

```sh
git worktree add -b fix/analysis ../analysis-fix main
git worktree list
```

## 要点

履歴は共通、ブランチごとの作業場所は別々。

## 付箋

### worktree-lecture [講義]

別のworktreeでブランチを動かす影響も、共有されています。

### worktree-study

確認用なら git worktree add --detach ../analysis-check v1.0。片付けるときは作業が保存済みか確認し git worktree remove ../analysis-fix。同一ブランチの重複チェックアウトを--forceで回避する運用はここでは使いません。
