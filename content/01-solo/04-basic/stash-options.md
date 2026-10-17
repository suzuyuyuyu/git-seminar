---
id: "stash-options"
title: "stashの既定・apply・pop・-u・saveを区別する"
state: "solo-basic-stash-options"
diagram: "assets/curriculum-guide.svg"
---

git stashだけでも退避できますが、何を退避するかが分かるよう、この教材ではgit stash push -mを使います。既定で追跡ファイルの変更を退避し、-uを付けると未追跡ファイルも含みます。無視対象のファイルは-uに含まれません。

applyは退避を残したまま適用します。popは適用に成功すると退避を削除しますが、競合した場合は残ります。両方を続けて実行するのではなく、目的に応じて片方を選びます。古い資料のstash saveは従来の書き方で、新しく覚える操作はpushです。

listで対象を選び、show -pで中身を確認します。stashは手元だけの一時退避で、pushでGitHubへ送られるcommitの代わりにはなりません。

## コマンド

```sh
git stash list
git stash show -p 'stash@{0}'
# apply または pop のどちらかを選ぶ
git stash apply 'stash@{0}'
```

## 要点

pushで退避し、listで選び、applyかpopで戻す。-uは未追跡も含む。
