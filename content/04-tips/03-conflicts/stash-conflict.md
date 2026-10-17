---
id: "stash-conflict"
title: "stashを戻したときのConflictを解消する"
state: "tips-conflicts-stash-conflict"
diagram: "assets/curriculum-guide.svg"
---

退避後に作業先が変わると、`git stash apply` や `pop` でもConflictが起こり得ます。applyは退避を残します。popも競合した場合は退避を消さないため、`git stash list` で確認できます。

ファイルを編集してaddし、テスト後に通常のcommitとして保存します。`stash --continue` はありません。同じ退避を再適用せず、反映できたことを確かめてから不要なstashをdropします。戻しにくい場合は、きれいな作業状態で `git stash branch` を検討できます。

## コマンド

```sh
git status
git stash list
# 競合ファイルを編集してから
git add README.md
git diff --cached
```

## 要点

退避は残る。解消後は通常のcommitで保存する。
