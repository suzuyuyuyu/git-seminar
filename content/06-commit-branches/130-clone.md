---
id: clone
title: "実習用のリポジトリをcloneする"
state: clone
presentation-lines: 1, 3, 4
---

ここからは概念図とは別の実習です。書き込み権限のある練習用リポジトリを、まだ存在しない新しい作業フォルダへcloneします。先生が案内する実際のURLを使ってください。READMEにプロフィールを追加するIssueは、第05章で用意したものを使います。

clone後にmainへ切り替え、git statusで未記録の変更がないことを確認します。ここでは共有先のデフォルトブランチがmainで、README.mdがある前提です。概念図のm5などのmerge済み履歴を手元で作ってから、この演習を始める必要はありません。

## コマンド

```sh
# 練習用リポジトリの実際のURLに置き換える
git clone <練習用URL> git-seminar-branch-practice
cd git-seminar-branch-practice
git switch main
git status
```

## 要点

mainを直接編集する前に、別の作業ブランチを用意する。

## 付箋

### clone-note [講義]

URLの山括弧は入力しません。ここではコマンドは教材として表示しており、自動でcloneや投稿はしません。
