---
id: conflict-history
title: "枝を分けた後、mainも更新された"
state: conflict-history
---

前章ではmainの先端から作業用の枝を分けました。左の図はその時点で、mainは共通のcommit、feat/jaはそこから作った別のcommitを指しています。

その間にmainでも作業が進むと、右の図のようにmainの先端も新しくなります。feat/jaのcommitは変わらず、2つの枝が共通のcommitから分かれた状態です。この時点だけでは競合すると決まったわけではありません。次にファイルの中身を比べます。

## 要点

枝を分けている間に、main側も更新される。

## 付箋

### conflict-history-lecture [講義]

図は左が分岐直後、右がmain更新後です。

### conflict-history-study

PDF73では枝名が@feat/nameですが、続くPDF74〜76のfeat/jaに統一しています。練習のフォルダーはPR演習とは独立しています。
