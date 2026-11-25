---
id: "stash"
title: "stash"
state: "stash"
diagram: "assets/commands/basic-stash.svg"
---

別の作業へ切り替えたいとき、git stash push で作業ツリーとインデックスの変更を退避します。-u は未追跡ファイルも含めますが、無視対象は含みません。

変更がある状態でpushし、listの先頭に新しい「途中の解析」ができたことを確認してからapplyします。「No local changes to save」なら新しい退避は作られていないので、続くapplyは実行しません。applyは退避を残し、popは適用が成功したときに退避を削除します。以下の例でapplyした後、続けてpopする必要はありません。

## スライド説明

作業ツリーとindexの途中の変更を、手元のstashへ一時退避します。

commitする前に別の作業へ切り替えたいときに使います。

`push -m "説明"` で退避に名前を付けます。`-u` は未追跡も含め、`apply` は退避を残して戻します。

## コマンド

```sh
git stash push -u -m "途中の解析"
git stash list
```

## 要点

stashは一時退避。applyは残し、popは成功時に消す。

## 付箋

### stash-lecture [講義]

popで競合した場合は、退避は削除されません。

### stash-study

popの例は git stash pop 'stash@{0}'。競合したら内容を確認して手で解消し、退避の削除は復元を確認してから行います。ステージ状態も戻したい場合は--index。stashはリモートへ自動共有されません。旧saveよりpush -mを使います。
