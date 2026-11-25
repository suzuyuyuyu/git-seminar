---
id: "branch"
title: "branch"
state: "branch-commands-branch-branch"
diagram: "assets/commands/branch-commands-branch.svg"
---

git branchはローカルbranchの一覧を表示し、現在のbranchに*を付けます。-rはリモート追跡branch、-aはその両方を表示します。branch名を渡すと現在のcommitに新しい目印を作りますが、切り替えません。切り替えはswitchです。

削除は別のbranchへ移ってからgit branch -d branch-nameを使います。これは通常、upstream（なければHEAD）へ統合済みか確認します。削除対象の未共有commitを必要に応じて保護し、確認を飛ばす-Dを安易に使わないでください。ローカルbranchの削除は、GitHubのbranch削除とは別です。

## スライド説明

ブランチの一覧表示・作成・削除を行います。作成だけでは作業先は切り替わりません。

作業に名前を付けるときや、手元・リモートのブランチを確認するときに使います。

`-a` はリモート追跡も表示し、`-vv` は追跡先を表示します。`-d` は統合済みか確認して削除します。

## コマンド

```sh
git branch -a
git branch feature/readme
```

## 要点

branchは目印の管理。作成と切り替え、手元と共有先の削除を区別する。
