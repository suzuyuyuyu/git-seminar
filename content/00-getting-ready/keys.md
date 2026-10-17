---
id: keys
title: "04 SSH鍵のペアを作る"
state: keys
diagram: assets/foundations-prepare.svg
---

GitHubにブラウザーでログインできることを確認します。SSHは、手元の秘密鍵を使って接続先へ自分を証明する方式です。公開鍵と秘密鍵のペアを作ります。

まず既存の鍵を確認します。新規作成時は保存先として ~/.ssh/id_ed25519_github を指定し、既存ファイルを上書きしません。パスフレーズの設定を推奨します。入力中に文字が表示されなくても正常です。

## コマンド

```sh
mkdir -p ~/.ssh
ls -la ~/.ssh
ssh-keygen -t ed25519 -C "your-email@example.com" -f ~/.ssh/id_ed25519_github
```

## 要点

公開鍵は登録する。秘密鍵は手元に保つ。

## 付箋

### prepare-no-overwrite [講義]

同名の鍵がある場合は作り直さず、既存鍵を使うか別名を選びます。

### prepare-agent

パスフレーズの入力を省くssh-agentの設定はOSで異なります。必要なら末尾の公式OS別手順を参照してください。
