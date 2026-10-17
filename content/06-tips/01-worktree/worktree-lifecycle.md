---
id: "worktree-lifecycle"
title: "worktreeを追加して、使い終わったら片付ける"
state: "tips-worktree-worktree-lifecycle"
diagram: "assets/curriculum-guide.svg"
---

別branchの確認を並行して進めたいときは `git worktree add ../seminar-check -b check main` のように別ディレクトリを作ります。この例はmainから新しいcheck branchを作るため、同名branchと同名ディレクトリがない状態で使います。

`git worktree list` で配置を確認します。各worktreeは作業ファイルとindexを個別に持ち、履歴などを共有します。使い終わったら対象の未commit変更を確認して保存し、`git worktree remove ../seminar-check` で片付けます。

## コマンド

```sh
git worktree add ../seminar-check -b check main
git worktree list
# 対象の作業を保存した後の片付け例
# git worktree remove ../seminar-check
```

## 要点

別ディレクトリでも同じリポジトリ。各作業の保存を確かめる。
