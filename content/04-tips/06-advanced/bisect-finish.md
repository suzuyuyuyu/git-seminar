---
id: "bisect-finish"
title: "bisect（判定・終了）"
state: "advanced-bisect-bisect-finish"
diagram: "assets/commands/advanced-bisect-finish.svg"
---

選ばれたcommitをビルド・実行して、結果に応じて `git bisect good` または `git bisect bad` を一方だけ実行します。依存関係などの理由で判定できない版には `git bisect skip` が使えますが、候補が一つに絞れない場合もあります。

原因候補が表示されたらハッシュを控え、`git bisect reset` で調査前の位置に戻ります。その後に差分を読み、原因の仮説を検証します。ここでのresetはbisectを終えるサブコマンドです。

## スライド説明

選ばれた版を同じ条件で確認し、正常か不具合かをGitへ伝えます。

原因候補が絞れるまで判定を繰り返し、終了時に元の作業位置へ戻ります。

`good` / `bad` は判定結果、`skip` は判定不能、`reset` は調査終了です。skipで候補が一つに絞れない場合もあります。

## コマンド

```sh
git bisect good
# 原因候補のIDを控えてから終了
git bisect reset
```

## 要点

判定条件を揃え、終わったら bisect reset。
