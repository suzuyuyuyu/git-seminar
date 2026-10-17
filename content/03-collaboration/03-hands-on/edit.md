---
id: "edit"
title: "READMEを編集してstatusを読む"
state: "edit"
diagram: "commit-graph"
---

README.mdの指定された場所へ、自分の名前と研究テーマを追加して保存します。既存のプロフィールや説明を消さず、Markdownのプレビューでも見ておきます。保存後にgit statusでmodified: README.mdを確認します。

Changes not staged for commitは、編集した内容がまだ次のcommitの準備に入っていない状態です。この時点では変わったのはworking treeだけです。図のcommitは増えず、main、feature/name、HEADの関係も変わりません。

## コマンド

```sh
git status
git diff -- README.md
```

## 要点

編集だけではcommitもbranchの位置も変わらない。

## 付箋

### edit-note [講義]

元資料69のターミナルと同じく、statusの文言と、変わっていない履歴図を見比べます。
