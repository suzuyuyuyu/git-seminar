---
id: remote
title: "04 自分専用の空の共有先を用意する"
state: remote
diagram: assets/foundations-practice.svg
---

GitHubで自分のアカウントに新しいリポジトリを作ります。公開範囲を選び、README・.gitignore・ライセンスの初期追加は選ばず、空のリポジトリにしてください。手元の最初の履歴を送るためです。

作成後のSSH URLをコピーし、下のYOUR_ACCOUNTとYOUR_REPOSITORYを置き換えます。remote addは共有先にoriginという名前を付ける操作で、まだファイルは送信しません。

## コマンド

```sh
git remote add origin git@github.com:YOUR_ACCOUNT/YOUR_REPOSITORY.git
git remote -v
```

## 要点

空の共有先に、originという名前を付ける。

## 付箋

### practice-own-remote [講義]

他の人のリポジトリではなく、自分の練習用URLを指定します。

### practice-existing-origin

origin already existsなら登録済みです。上書きせず、remote -vと現在のフォルダーを確認します。
