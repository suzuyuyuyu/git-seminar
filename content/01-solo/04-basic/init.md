---
id: "init"
title: "init"
state: "init"
diagram: "assets/commands/basic-init.svg"
---

既存のリポジトリの外にある、書き込み可能な親フォルダーへ移動して始めます。pwdで場所を確認し、新しいmy-projectを作成して中に入ります。同名のものがあれば別名を使います。

git init -b mainで、最初のbranch名をmainとしてGit管理を始めます。.gitに管理情報が作られますが、この時点ではまだcommitはありません。-bが使えない古いGitは、事前に更新します。

## スライド説明

現在のフォルダーに.gitを作り、Gitによる管理を始めます。履歴はまだ空です。

既存リポジトリを複製せず、新しいプロジェクトを手元で始めるときに使います。

`-b main` は最初のブランチ名を指定します。既存のリポジトリの外で実行します。

## コマンド

```sh
mkdir my-project
cd my-project
git init -b main
```

## 要点

新しい場所でinitし、まだ空の履歴から始める。

## 付箋

### practice-no-nested [講義]

研究コードの中や別のリポジトリ内で始めないよう、最初に場所を確認します。
