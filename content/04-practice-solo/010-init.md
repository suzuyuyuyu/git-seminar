---
id: init
title: "01 新しい練習場所を作る"
state: init
---

既存のリポジトリの外にある、書き込み可能な親フォルダーへ移動して始めます。pwdで場所を確認し、新しいgit-seminar-practiceを作成して中に入ります。同名のものがあれば別名を使います。

git init -b mainで、最初のbranch名をmainとしてGit管理を始めます。.gitに管理情報が作られますが、この時点ではまだcommitはありません。-bが使えない古いGitは、事前に更新します。

## コマンド

```sh
pwd
mkdir git-seminar-practice
cd git-seminar-practice
git init -b main
git status
```

## 要点

新しい場所でinitし、まだ空の履歴から始める。

## 付箋

### practice-no-nested [講義]

研究コードの中や別のリポジトリ内で始めないよう、最初に場所を確認します。
