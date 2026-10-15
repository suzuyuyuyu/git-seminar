---
id: sync
title: "統合後のmainを手元へ取り込む"
state: sync
---

GitHubでPRをmergeしても、手元のmainは自動では更新されません。作業中の変更を整理したうえでmainへ切り替え、git pull --ff-onlyで追跡先から更新を取り込みます。ここではmainがorigin/mainを追跡している前提です。

--ff-onlyは、手元のmainをそのまま前へ進められる場合だけ更新する指定です。手元にも別のコミットがあって履歴が分かれていると停止します。そのときは無理に進めずgit statusやgit logで状態を確認します。最新のmainで動作確認を行うところまでが、共有した変更の確認です。

## コマンド

```sh
git switch main
git pull --ff-only
git status
```

## 要点

共有先の統合と、手元のmainの更新は別の操作。

## 付箋

### sync-tracking

mainに追跡先がない場合は設定を確認します。意図しないブランチを取り込まないようにしましょう。
