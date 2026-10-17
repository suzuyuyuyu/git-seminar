---
id: "identity"
title: "commitに記録する名前を設定する"
state: "identity"
diagram: "assets/foundations-prepare.svg"
---

user.nameとuser.emailはcommitの作者情報です。GitHubへのログイン名やパスワードを設定するコマンドではありません。下の値を自分の情報に置き換えます。

メールを公開したくない場合は、GitHubのSettings → Emailsに表示される自分専用のnoreplyアドレスを使えます。--globalは、このユーザーの各リポジトリに共通する既定値の設定です。

## コマンド

```sh
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
git config --get user.name
git config --get user.email
```

## 要点

作者情報と、接続の認証は別の設定。

## 付箋

### prepare-email [講義]

例のメールをそのまま使わず、自分のアドレスへ置き換えましょう。
