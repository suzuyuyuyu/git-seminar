---
id: publish
title: "作業ブランチをpushする"
state: publish
presentation-lines: 1, 2, 4, 8
---

第06章の図で使った履歴とは別に、書き込み権限のある練習用リポジトリを新しい場所へcloneして使います。手元のmainをorigin/mainに同期し、作業ツリーに変更がないことを確認してから、新しいfeature/pr-demoブランチを作ります。READMEへ自分のプロフィールを追加してコミットし、git push -u origin feature/pr-demoで共有先へ送ります。-uは、成功したブランチの追跡先を設定する指定です。

pushしただけではmainへ統合されません。GitHubでPull Requestを開き、取り込み先のbaseをmain、変更元のcompareをfeature/pr-demoにします。タイトルと説明には、変更の目的、関連するIssue、動作確認の結果を書きます。第06章でローカルmainに作ったmerge commitは、このPRの作業には持ち込みません。

## コマンド

```sh
# 別の場所にclone済みの練習用リポジトリで実行
git switch main
git pull --ff-only
git status
git switch -c feature/pr-demo
# README.md にプロフィールを追加して保存
git add README.md
git commit -m "Add my profile to README"
git push -u origin feature/pr-demo
```

## 要点

同期済みのmainから作業を分け、pushしてPRを開く。

## 付箋

### publish-terms [講義]

GitHubのbase／compareは、GitLabではtarget／sourceに相当します。Pull RequestはGitLabではMerge Requestです。

### publish-precondition

mainはorigin/mainを追跡し、手元だけのコミットがない前提です。--ff-onlyが止まった場合、そのまま先へ進まず状態を確認します。
