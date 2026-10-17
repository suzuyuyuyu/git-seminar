---
id: "branch-growth"
title: "branchはcommitに付けた名前付きの目印"
state: "branch-growth"
diagram: "assets/branch-model.svg"
---

mainとadd/new-algorithmが、それぞれ一つのcommitを指しています。左はm2から分岐し、mainがm3、作業側がb1の状態です。その後それぞれでcommitを重ねると、右のmainがm5、作業側がb3へ進んだ状態になります。作業したブランチの目印だけが進みます。HEADは原資料56に合わせて省略しています。

branchはフォルダ一式のコピーでも、履歴の線全体でもありません。名前にはfeature/improve-uiやfix/typo-in-outputのように、目的のわかる短い名前を付けます。prefixと内容を/で区切る流儀はよくありますが、命名や分け方はチームの方針に合わせます。

## 要点

commitを作ったbranchだけが進み、他のbranchはそのまま。

## 付箋

### branch-growth-note [講義]

原資料56は作業側にb2が重複表示されています。順序を明確にするため、図では下からb1・b2・b3と表記しています。
