---
id: "workflow"
title: "IssueからPR、統合後の更新まで"
state: "collaboration-summary-workflow"
diagram: "assets/curriculum-guide.svg"
---

Issueで目的や完了条件を共有し、作業ブランチで変更を作ります。READMEやPRの説明をMarkdownで整えると、変更の背景や確認方法をほかの人へ伝えられます。変更は小さくcommitし、pushしてPRを作ります。

レビューでは、目的・差分・動作を確認します。修正は同じ作業ブランチへcommit・pushすると、既存のPRにも反映されます。統合後は手元のmainも更新します。競合した場合は両方の意図を確かめ、内容を編集して動作確認を行い、addして進行中の統合操作を完了します。

## スライド説明

Issueで「なぜ変更するか」と完了条件を共有します。作業ブランチで変更を作り、小さくcommitしてpushします。

PRでは、目的に合う差分か、必要な動作確認ができているかをレビューします。説明やREADMEをMarkdownで整えることも、共同作業の一部です。

競合したときは両方の変更意図を確認し、残す内容を編集します。動作を確かめてaddし、mergeやrebaseなど進行中の操作を完了します。

共有先で統合した後は、手元のmainへ切り替えて更新を取り込みます。mainがorigin/mainを追跡し、履歴をそのまま進められる場合は`git pull --ff-only`を使います。

## 要点

目的の共有、変更の記録、レビュー、統合後の更新までを一巡する。
