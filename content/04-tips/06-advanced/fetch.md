---
id: "fetch"
title: "fetch"
state: "fetch"
diagram: "assets/commands/advanced-fetch.svg"
---

git fetch originは、originからcommitなどを取得し、origin/mainなどのリモート追跡branchを更新します。origin/mainは、最後に取得した共有先のmainの状態を手元で表す目印です。

fetchだけでは作業中のmainやworking treeのファイルを切り替えません。取得後にstatusやlogを見て、手元と共有先の違いを確認できます。

## スライド説明

リモートから履歴を取得し、origin/mainなどのリモート追跡ブランチを更新します。

作業ファイルを変えずに、共有先の更新を調べるときに使います。

`--prune` はリモートで削除されたブランチの追跡参照も整理します。取得後にlogやdiffで違いを確認します。

## コマンド

```sh
git fetch --prune origin
git log --oneline --all --graph
```

## 要点

fetchは追跡情報を更新し、作業ファイルは変えない。

## 付箋

### inspect-origin-local [講義]

mainとorigin/mainは別の目印です。origin/mainも自分のPCにある追跡情報です。
