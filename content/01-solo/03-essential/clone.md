---
id: "clone"
title: "clone"
state: "clone"
diagram: "assets/commands/essential-clone.svg"
---

既存のリポジトリから始めるときはcloneを使います。GitHubのCodeからSSH URLをコピーし、使用例の<URL>をそのURLに置き換えます。コピーを置きたい親フォルダーで実行します。

cloneは新しい作業フォルダーとローカルの履歴を作ります。ここでは取得先のフォルダー名をmy-projectと指定しています。同名の作業フォルダーがない場所で行い、完了したらその中へ移動します。

## スライド説明

既存リポジトリの履歴を複製し、作業フォルダーを作ります。接続先は通常originとして登録されます。

プロジェクトへ初めて参加するときや、別のPCで作業を始めるときに使います。

`--recursive` はサブモジュールも取得します。`--depth <n>` は履歴の深さを制限し、`-b <branch name>` は最初に開くブランチを指定します。

## コマンド

```sh
git clone <URL> my-project
cd my-project
```

## 要点

cloneは、既存の履歴と作業用フォルダーを手元に用意する。

## 付箋

### inspect-clone-init [講義]

clone済みのフォルダーでinitを実行する必要はありません。
