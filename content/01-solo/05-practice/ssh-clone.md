---
id: "ssh-clone"
title: "SSHでcloneし、作業場所へ移動する"
state: "solo-practice-ssh-clone"
diagram: "assets/curriculum-guide.svg"
---

YOUR_ACCOUNTとYOUR_REPOSITORYを、自分が作ったリポジトリのアカウント名と名前に置き換えて実行します。git-seminar-practiceは新しく作るフォルダー名です。同名の作業場所がすでにある場合は、別の新しい名前を選びます。

clone後にcdで移動し、remote -vで共有先、statusで現在のbranchを確認します。この演習はmainがデフォルトのREADME付きリポジトリを前提にしています。認証に失敗したら「学習の準備」のSSH設定と接続確認を読み返します。clone済みの場所へgit initを重ねて実行する必要はありません。

## コマンド

```sh
git clone git@github.com:YOUR_ACCOUNT/YOUR_REPOSITORY.git git-seminar-practice
cd git-seminar-practice
git remote -v
git status
```

## 要点

SSH URLからcloneし、正しいフォルダーと共有先で作業しているか確認する。
