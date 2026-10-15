---
id: connect
title: "07 GitHubとの接続を確認する"
state: connect
---

ssh -T git@github.comを実行します。初回に接続先の指紋が表示されたら、末尾の公式「SSHホスト鍵の指紋」と照合してから承認します。求められるパスフレーズは手元の鍵に設定したものです。

Hi USERNAME! You've successfully authenticated...と自分のアカウント名が表示されれば認証成功です。GitHubはシェルへのログインを提供しないため、その旨が続きます。終了コード1でも、この成功メッセージなら問題ありません。

## コマンド

```sh
ssh -T git@github.com
```

## 要点

成功メッセージと、自分のアカウント名を確認する。

## 付箋

### prepare-no-password [講義]

GitHubのアカウントパスワードをSSH認証に入力する手順ではありません。

### prepare-multiple-ssh

Windowsには複数のSSH実装がある場合があります。Git操作だけ失敗するなら、同じGit Bashで再確認し公式のOS別手順を参照します。
