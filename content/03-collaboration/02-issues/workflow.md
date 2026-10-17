---
id: "workflow"
title: "Issue・ブランチ・PRをつなぐ"
state: "workflow"
diagram: "assets/collaboration-planning.svg"
---

Issueで決めた作業ごとにブランチを用意し、変更を小さなコミットに分けて記録します。mainを直接変更する代わりに作業を分けると、何のための変更かを追いかけやすくなります。ブランチの作成と切り替えは次の章で扱います。

変更を共有したらPull Requestで差分を確認してもらい、合意した内容をmainへ統合します。説明にIssueへの参照を残すと、目的・実装・議論がつながります。GitHubではPull Request、GitLabではMerge Requestと呼びます。これは今回の練習の流れであり、チームによって運用は変わります。

## 要点

目的はIssue、作業はブランチ、確認と統合はPR。

## 付箋

### workflow-git [講義]

IssueとPRはGitHubなどのサービスの機能です。Gitのコミットやブランチとは役割が違います。
