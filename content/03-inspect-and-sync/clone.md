---
id: clone
title: "01 既存リポジトリを手元に複製する"
state: clone
diagram: assets/operation-map.svg
wide: true
---

既存のリポジトリから始めるときはcloneを使います。GitHubのCodeからSSH URLをコピーし、下のYOUR_ACCOUNTとYOUR_REPOSITORYを置き換えます。コピーを置きたい親フォルダーで実行します。

cloneは新しい作業フォルダーとローカルの履歴を作ります。ここでは取得先のフォルダー名をgit-seminar-copyと指定しています。同名の作業フォルダーがない場所で行い、完了したらその中へ移動します。

## コマンド

```sh
git clone git@github.com:YOUR_ACCOUNT/YOUR_REPOSITORY.git git-seminar-copy
cd git-seminar-copy
```

## 要点

cloneは、既存の履歴と作業用フォルダーを手元に用意する。

## 付箋

### inspect-clone-init [講義]

clone済みのフォルダーでinitを実行する必要はありません。
