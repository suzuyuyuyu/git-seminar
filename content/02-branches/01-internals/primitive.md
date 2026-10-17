---
id: "primitive"
title: "Gitは意外と原始的：記録と目印を組み合わせる"
state: "branches-internals-primitive"
diagram: "assets/curriculum-guide.svg"
---

Gitの基本は、内容を保存したオブジェクトと、それを指す名前の組み合わせです。commitはその時点のファイル構成を表すtreeと、親commit・作者・メッセージなどを持ちます。ファイルの内容はblobとして保存され、同じ内容は再利用されます。

新しいcommitを作ると、既存のcommitを編集する代わりに新しいオブジェクトができ、作業中のbranchの参照先が動きます。HEADは通常そのbranch名を指します。この組み合わせが分かると、branchの作成や切り替えを「履歴のコピー」と考えずに読めるようになります。

.gitの中身は保存形式の都合で圧縮やまとめ直しが行われます。図は概念を説明するものです。手作業で.git内のファイルを書き換えず、Gitのコマンドで確認します。

## コマンド

```sh
git cat-file -p HEAD
git ls-tree HEAD
```

## 要点

保存したcommitを名前で指す。commitが増えると、現在のbranchの目印が動く。
