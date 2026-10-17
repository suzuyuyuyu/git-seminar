---
id: "conflict-map"
title: "Conflictは「どの操作の途中か」から読む"
state: "tips-conflicts-conflict-map"
diagram: "assets/curriculum-guide.svg"
---

merge、rebase、stash applyはいずれも変更を合わせるため、同じ箇所を両側で変えた場合などにConflictが起こります。テキストの競合記号だけでなく、削除と編集の組合せやバイナリでも判断が必要です。

最初に `git status` で操作の種類と未解決ファイルを確認します。完成形へ編集し、動作を確かめてaddした後の終了方法は操作ごとに違います。mergeはcommit、rebaseはcontinue、stash applyは通常の作業として保存します。

## コマンド

```sh
git status
git diff --name-only --diff-filter=U
git diff
```

## 要点

確認 → 完成形へ編集 → add → 操作ごとの終了。
