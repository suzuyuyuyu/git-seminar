---
id: "commit-change"
title: "commitの前後で何が増え、何が動くか"
state: "commit-change"
diagram: "assets/branch-model.svg"
---

左はc3で作業している状態、右は変更をadd・commitしてc4ができた状態です。新しいcommitはc3を親として記録されます。commitが増えることと、現在地が移ることを分けて見てください。

HEADがmainを指す通常の作業では、mainの目印がc4へ進みます。HEADはmainを指したままなので、結果として作業の基準もc4になります。元資料55のcommit追加・現在地移動に、58の「branchも移動する」を重ねた比較図です。

## コマンド

```sh
git add README.md
git commit -m "Update README"
```

## 要点

新しいcommitができ、作業中のbranchがそのcommitへ進む。

## 付箋

### commit-change-note [講義]

比較図の左右を同じ履歴の前後として見ます。二つのリポジトリができるわけではありません。
