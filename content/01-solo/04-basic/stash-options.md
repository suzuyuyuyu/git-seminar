---
id: "stash-options"
title: "stash（操作一覧）"
state: "solo-basic-stash-options"
diagram: "assets/commands/basic-stash-options.svg"
---

git stashだけでも退避できますが、何を退避するかが分かるよう、この教材ではgit stash push -mを使います。既定で追跡ファイルの変更を退避し、-uを付けると未追跡ファイルも含みます。無視対象のファイルは-uに含まれません。

applyは退避を残したまま適用します。popは適用に成功すると退避を削除しますが、競合した場合は残ります。両方を続けて実行するのではなく、目的に応じて片方を選びます。古い資料のstash saveは従来の書き方で、新しく覚える操作はpushです。

listで対象を選び、show -pで中身を確認します。stashは手元だけの一時退避で、pushでGitHubへ送られるcommitの代わりにはなりません。

## スライド説明

退避する対象と、戻した後に退避を残すかを指定できます。

複数の退避から対象を選び、中身を確認して戻すときに使います。

`list` は一覧、`show -p` は差分、`apply` は退避を残し、`pop` は適用成功時に退避を削除します。

## コマンド

```sh
git stash show -p 'stash@{0}'
# 内容を確認してから適用
git stash apply 'stash@{0}'
```

## 要点

pushで退避し、listで選び、applyかpopで戻す。-uは未追跡も含む。
