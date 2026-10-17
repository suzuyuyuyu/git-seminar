---
id: repository
title: "05 履歴をrepositoryにまとめる"
state: repository
diagram: assets/version-history.svg
---

Git導入前の図にはCode_origin、Code_v01、Code_v02_editなど、8つのフォルダーが並んでいます。履歴をフォルダー名で管理すると、どの版を使うか、何を変えたかを読み取るのが難しくなります。

Gitではrepository（リポジトリ）単位で履歴を管理します。図の右側は、コード作成・繰り返し処理・新しいアルゴリズム・不要ファイル削除・例外処理をcommitとして記録したものです。ひとつの作業フォルダーで、いつ何を変えたかと、その説明をたどれます。

## 要点

履歴をひとつにまとめ、commit messageで変更を説明する。

## 付箋

### intro-messages [講義]

原図のinit:・feat:・remove:・fix:はメッセージの例です。接頭辞そのものがGitの必須条件ではありません。

### intro-folder-repository

通常の作業用リポジトリでは、履歴などの管理情報は.gitに置かれます。図の円筒はその管理されたまとまりの記号です。
