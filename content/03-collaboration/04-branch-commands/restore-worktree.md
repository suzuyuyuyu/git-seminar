---
id: "restore-worktree"
title: "restore"
state: "restore-worktree"
diagram: "assets/commands/branch-commands-restore-worktree.svg"
---

Gitで管理していたファイルを誤って削除した場合を考えます。hello.pyを作業フォルダーで削除しても、まだ削除をステージしていなければ、インデックスには記録した内容が残っています。git statusでdeleted: hello.pyと表示されることを確認します。

git restore -- hello.pyで、インデックスの内容を使って作業ツリーへファイルを戻せます。ここでは削除コマンドを実行する練習にはせず、誤って削除した状況からの復元手順を示します。HEADやブランチの位置は変わりません。

削除をすでにステージした場合は、通常のrestoreだけでは同じ復元元がありません。次の節の--stagedでインデックスをHEADへ戻し、その後に作業ツリーを復元する、という対象の違いを確かめます。

## スライド説明

指定した追跡ファイルを復元します。既定の復元元はindex、変更する場所は作業ツリーです。

まだステージしていない編集を取り消すときや、誤って削除した追跡ファイルを戻すときに使います。

`--source=版` は復元元を指定します。未commitの編集を上書きするため、先にdiffで内容を確認します。

## コマンド

```sh
git diff -- hello.py
git restore -- hello.py
```

## 要点

statusで削除したパスを確かめ、追跡ファイルを復元する。

## 付箋

### restore-worktree-lecture [講義]

復元元は通常インデックスです。未追跡ファイルは戻せません。

### restore-worktree-study

restoreは編集の取り消しにも使えますが、未コミットの編集を上書きします。過去版を明示する例は git restore --source=v1.0 -- hello.py。残したい変更は先に保存・退避します。
