---
id: "tools"
title: "Gitとターミナルを用意する"
state: "tools"
diagram: "assets/foundations-prepare.svg"
---

WindowsはGit for Windowsを導入し、Git Bashを開きます。macOS・Linuxは公式のOS別手順でGitを導入します。git --versionでバージョンが表示されれば、コマンドを呼び出せています。

この教材のSSH関連コマンドはGit Bash・bash/zsh向けです。PowerShellでは一部のコマンドやパス表現が異なります。ターミナルに表示される❯や$は入力せず、コマンドだけ実行します。

## コマンド

```sh
git --version
pwd
```

## 要点

使うシェルと、今いるフォルダーを確認する。

## 付箋

### prepare-shell [講義]

pwdは現在の場所、cdは移動です。以降のGit操作では対象のリポジトリ内にいるか確認します。
