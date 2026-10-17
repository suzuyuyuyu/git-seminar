---
id: "register"
title: ".pubだけをGitHubに登録する"
state: "register"
diagram: "assets/foundations-prepare.svg"
---

公開鍵はid_ed25519_github.pub、秘密鍵は拡張子なしのid_ed25519_githubです。既存の鍵や別名の鍵を使う場合は、下のパスも自分が選んだ鍵名に置き換え、末尾の.pubを付けます。公開鍵を表示し、ssh-ed25519で始まる1行全体をコピーします。

GitHubのSettings → SSH and GPG keys → New SSH keyで、認証用の鍵として登録します。秘密鍵の中身はGitHub、チャット、リポジトリに貼り付けません。

## コマンド

```sh
cat ~/.ssh/id_ed25519_github.pub
```

## 要点

登録するのは、末尾が.pubの公開鍵だけ。

## 付箋

### prepare-private-key [講義]

BEGIN OPENSSH PRIVATE KEYと表示されたら秘密鍵です。コピーや共有をしないでください。
