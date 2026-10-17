---
id: "bisect-finish"
title: "判定を繰り返し、調査を終了する"
state: "advanced-bisect-bisect-finish"
diagram: "assets/curriculum-guide.svg"
---

選ばれたcommitをビルド・実行して、結果に応じて `git bisect good` または `git bisect bad` を一方だけ実行します。依存関係などの理由で判定できない版には `git bisect skip` が使えますが、候補が一つに絞れない場合もあります。

原因候補が表示されたらハッシュを控え、`git bisect reset` で調査前の位置に戻ります。その後に差分を読み、原因の仮説を検証します。ここでのresetはbisectを終えるサブコマンドです。

## コマンド

```sh
# 確認結果に応じて一方を実行する例
# git bisect good
# git bisect bad
# 結果のハッシュを控えて終了
git bisect reset
```

## 要点

判定条件を揃え、終わったら bisect reset。
