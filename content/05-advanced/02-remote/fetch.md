---
id: "fetch"
title: "共有先の履歴だけを取得する"
state: "fetch"
diagram: "assets/operation-map.svg"
---

git fetch originは、originからcommitなどを取得し、origin/mainなどのリモート追跡branchを更新します。origin/mainは、最後に取得した共有先のmainの状態を手元で表す目印です。

fetchだけでは作業中のmainやworking treeのファイルを切り替えません。取得後にstatusやlogを見て、手元と共有先の違いを確認できます。

## コマンド

```sh
git fetch origin
git status
git log --oneline --graph --decorate --all
```

## 要点

fetchは追跡情報を更新し、作業ファイルは変えない。

## 付箋

### inspect-origin-local [講義]

mainとorigin/mainは別の目印です。origin/mainも自分のPCにある追跡情報です。
