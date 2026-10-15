---
id: second-parent
title: "^2はmerge commitの第二親を選ぶ"
state: second-parent
---

m5には二つの親があります。main側のm4が第一親、取り込んだ作業側のb2が第二親です。m5^1はm4、m5^2はb2を指します。線の傾きではなく、merge commitに記録された親の順番が基準です。

この図のHEADはm6なので、HEAD~1でm5へ進み、さらに^2でb2を選びます。つまりHEAD~1^2です。^2を使えるのは、その基準commitが第二親を持つときです。図のm5などは説明用の名前で、実際に実行するときは実在するIDや相対位置に読み替えます。

## コマンド

```sh
git show HEAD~1^1
git show HEAD~1^2
```

## 要点

第一親は取り込み先側、第二親は取り込んだ側。

## 付箋

### second-parent-note [講義]

原資料62の緑m4と青b2を、同じmerge commitの第一親・第二親として比較します。
