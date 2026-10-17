---
id: "publish"
title: "作業ブランチをpushする"
state: "publish"
diagram: "assets/collaboration-integration.svg"
---

先ほどのStepでREADMEへプロフィールを追加し、feature/nameをpushしました。同じbranchを使い、git branch -vvで現在地と追跡先を確かめます。新しいbranchを作り直したり、同じプロフィールをもう一度commitしたりする必要はありません。

pushしただけではmainへ統合されません。GitHubでPull Requestを開き、取り込み先のbaseをmain、変更元のcompareをfeature/nameにします。タイトルと説明には、変更の目的、関連するIssue、動作確認の結果を書きます。Issue番号への参照を添え、PRの差分にプロフィールの変更だけが含まれることを確認します。

## コマンド

```sh
# 先ほどpushしたfeature/nameのまま確認
git status
git branch -vv
# GitHubでbase: main / compare: feature/nameのPRを作成
```

## 要点

push済みのfeature/nameから、変更の目的とIssueを添えてPRを開く。

## 付箋

### publish-terms [講義]

GitHubのbase／compareは、GitLabではtarget／sourceに相当します。Pull RequestはGitLabではMerge Requestです。

### publish-precondition

mainはorigin/mainを追跡し、手元だけのコミットがない前提です。--ff-onlyが止まった場合、そのまま先へ進まず状態を確認します。
