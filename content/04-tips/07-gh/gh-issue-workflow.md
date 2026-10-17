---
id: "gh-issue-workflow"
title: "Issueを確認し、必要なものを作成する"
state: "tips-gh-gh-issue-workflow"
diagram: "assets/curriculum-guide.svg"
---

`gh issue list` で既存のIssueを探し、番号を指定した `gh issue view 12` で内容を読みます。新規作成前に、同じ問題が既に報告されていないか確認します。

作成例は、背景・期待する結果・実際の結果・再現手順などをまとめた `issue.md` を用意してから使います。`gh issue create` はGitHubへ実際に投稿する操作です。投稿先と本文を確認し、作成後に返るURLで結果を確かめます。

## コマンド

```sh
gh issue list
gh issue view 12
# 事前にissue.mdを作成した場合の投稿例
# gh issue create --title "表示のずれを修正する" --body-file issue.md
```

## 要点

既存Issueを読む → 内容を準備する → 対象を確かめて作成。
