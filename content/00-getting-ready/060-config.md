---
id: config
title: "06 接続に使う鍵を指定する"
state: config
---

エディターで ~/.ssh/config を開きます。なければ拡張子なしで作成し、下の設定を記入します。これはシェルで実行するコマンドではなく、設定ファイルの内容です。

IdentityFileは秘密鍵へのパスです。生成した鍵名と一致させます。既にHost github.comの設定がある場合は、重複して追記せず内容を確認します。

## コマンド

```sh
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_github
  IdentitiesOnly yes
```

## 要点

鍵の名前と、IdentityFileのパスを揃える。

## 付箋

### prepare-config-file [講義]

config.txtにならないように注意。WindowsのGit Bashでは通常、~はWindowsユーザーのホームを指します。
