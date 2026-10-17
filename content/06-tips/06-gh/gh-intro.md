---
id: "gh-intro"
title: "ghはGitHub上の情報を扱うCLI"
state: "tips-gh-gh-intro"
diagram: "assets/curriculum-guide.svg"
---

`git` はcommitやbranchなどを扱い、`gh` はGitHubのIssue・Pull requestなどを扱います。まず `gh --version` でインストールを確認し、`gh auth status` でログイン先とアカウントを確認します。

ログインが必要な場合は `gh auth login` の案内に従います。GitのSSH接続の確認とghの認証は別に確かめましょう。対象リポジトリ内で `gh repo view` を使い、これから操作する場所が正しいか読んでから作成コマンドへ進みます。

## コマンド

```sh
gh --version
gh auth status
gh repo view
```

## 要点

Gitは履歴、ghはGitHub。アカウントと対象を先に確認。
