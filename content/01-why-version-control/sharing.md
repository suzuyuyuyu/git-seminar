---
id: sharing
title: "02 GitHubは記録を共有する場所"
state: sharing
diagram: assets/version-history.svg
---

図の中央は共有先のリモートリポジトリ、周りは各自のPCにあるローカルリポジトリです。GitHub・GitLab・Bitbucketなどのサービスに履歴を置き、手元から送ったり、コピーを取得したりできます。

それぞれのPCで独立して変更し、完成した変更を共有して統合できます。同じ部分を別々に編集すると競合することがあり、意図に合わせて解消します。branchで作業を分け、mergeで統合する考え方を後の章で学びます。

## 要点

各自のローカルと、共有先のリモートをつなぐ。

## 付箋

### intro-git-github [講義]

GitとGitHubは別のものです。Gitは履歴管理の仕組み、GitHubは共有と共同開発を支えるサービスです。

### intro-backup-limit

共有先に残るのは送信した履歴です。手元で保存・commitしただけの内容まで、自動でバックアップされるわけではありません。
