---
id: "push-pr"
title: "pushして、PRで統合を提案する"
state: "push-pr"
diagram: "assets/branch-model.svg"
---

git branch -vvで追跡先を確認します。作成直後のfeature/nameに共有先がなければ、git push -u origin feature/nameで送信し、追跡先も設定します。pushでローカルのcommitやbranchの位置が変わるわけではありません。commitしていない編集も送られません。

mainへ反映するには、GitHubのPull Requestでfeature/nameからmainへの統合を提案します。GitLabではMerge Requestと呼びます。比較図はpushの前後ではなく、その後の共有先でのmerge前後です。origin/HEADは共有先のデフォルトブランチを表す参照で、いま作業中のHEADとは別です。続くStepでPRを作成し、レビューと統合へ進みます。この段階ではローカルmainへmergeしません。

## コマンド

```sh
git branch -vv
git push -u origin feature/name
```

## 要点

pushで共有し、PRでmainへの統合を提案する。

## 付箋

### push-pr-note [講義]

比較図は共有先のmerge前後です。ローカルのHEADとは別に、origin/HEADはデフォルトブランチへの参照を示します。
