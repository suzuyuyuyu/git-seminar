---
id: restore-worktree
title: "削除した追跡ファイルを復元する"
state: restore-worktree
diagram: assets/recovery.svg
---

原資料の例は、Gitで管理していたファイルを誤って削除した場合です。hello.pyを作業フォルダーで削除しても、まだ削除をステージしていなければ、インデックスには記録した内容が残っています。git statusでdeleted: hello.pyと表示されることを確認します。

git restore -- hello.pyで、インデックスの内容を使って作業ツリーへファイルを戻せます。ここでは削除コマンドを実行する練習にはせず、誤って削除した状況からの復元手順を示します。HEADやブランチの位置は変わりません。

削除をすでにステージした場合は、通常のrestoreだけでは同じ復元元がありません。次の節の--stagedでインデックスをHEADへ戻し、その後に作業ツリーを復元する、という対象の違いを確かめます。

## コマンド

```sh
git status
git diff -- hello.py
git restore -- hello.py
git status
```

## 要点

statusで削除したパスを確かめ、追跡ファイルを復元する。

## 付箋

### restore-worktree-lecture [講義]

復元元は通常インデックスです。未追跡ファイルは戻せません。

### restore-worktree-study

PDF86は削除したGit管理ファイルの復旧を説明しています。restoreは編集の取り消しにも使えますが、未コミットの編集を上書きします。過去版を明示する例は git restore --source=v1.0 -- hello.py。残したい変更は先に保存・退避します。
