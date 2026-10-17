---
id: "remote-and-tracking"
title: "接続先と追跡先を確認する"
state: "advanced-remote-remote-and-tracking"
diagram: "assets/curriculum-guide.svg"
---

`origin` は接続先に付けた名前です。`git remote -v` で取得先・送信先のURLを、`git branch -vv` で各ローカルbranchのupstreamを確認できます。`origin/main` はfetchした時点のリモート追跡branchです。

新しいbranchを共有するときは、送信先を確認してから `git push -u origin feature/readme` のようにupstreamを設定します。以後の引数なしのpullやpushの動作にも設定が関係するため、意図した相手か確認しましょう。

## コマンド

```sh
git remote -v
git branch -vv
```

## 要点

originのURLとbranchの追跡先は別々に確認する。
