---
id: "bisect-start"
title: "bisect"
state: "advanced-bisect-bisect-start"
diagram: "assets/commands/advanced-bisect-start.svg"
---

「この版では正常」「この版では不具合が出る」という2点と、同じ条件で再現できる確認手順を用意します。作業中の変更は先に保存し、調査中に何度も作業ファイルが切り替わることを理解して始めます。

下の `BAD_COMMIT` と `GOOD_COMMIT` は実際に確認したハッシュへ置き換えます。bisectが選ぶ途中のcommitで同じ確認を繰り返し、正常ならgood、不具合が出ればbadと伝えます。

## スライド説明

正常だった版と不具合のある版の間を二分探索し、原因候補のcommitを絞ります。

同じ確認手順で、不具合を再現できる版を調べるときに使います。

`start` で開始し、`good` と`bad`で既知の版を指定します。途中の版に作業ファイルが切り替わります。

## コマンド

```sh
git bisect start
git bisect bad BAD_COMMIT
git bisect good GOOD_COMMIT
```

## 要点

正常な版と不具合のある版の間を、半分ずつ調べる。
