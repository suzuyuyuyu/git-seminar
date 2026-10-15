---
id: stash
title: "途中の変更を一時退避する"
state: stash
---

別の作業へ切り替えたいとき、git stash push で作業ツリーとインデックスの変更を退避します。-u は未追跡ファイルも含めますが、無視対象は含みません。

変更がある状態でpushし、listの先頭に新しい「途中の解析」ができたことを確認してからapplyします。「No local changes to save」なら新しい退避は作られていないので、続くapplyは実行しません。applyは退避を残し、popは適用が成功したときに退避を削除します。以下の例でapplyした後、続けてpopする必要はありません。

## コマンド

```sh
git stash push -u -m "途中の解析"
git stash list
# 先頭に新しい「途中の解析」があると確認してから
git stash apply 'stash@{0}'
```

## 要点

stashは一時退避。applyは残し、popは成功時に消す。

## 付箋

### stash-lecture [講義]

popで競合した場合は、退避は削除されません。

### stash-study

popの例は git stash pop 'stash@{0}'。競合したら内容を確認して手で解消し、退避の削除は復元を確認してから行います。ステージ状態も戻したい場合は--index。stashはリモートへ自動共有されません。旧saveよりpush -mを使います。
