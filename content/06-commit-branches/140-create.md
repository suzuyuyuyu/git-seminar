---
id: create
title: "feature/nameを作成する"
state: create
diagram: assets/branch-model.svg
---

git branch feature/nameで、現在のcommitに新しい目印を付けます。mainとfeature/nameは同じcommitを指します。新しいcommitは増えず、HEADはmainを指したままです。図ではclone後の先端を便宜上c3と呼んでいます。

git branchの一覧では、現在のブランチに*が付きます。作業内容のわかる名前を付けましょう。feature/やfix/などのprefix、Issue番号を含める流儀もあります。/はよく使う区切りですが、必須ではありません。元資料67の.git/refs/headsの例は、名前を管理する内部の仕組みの一例です。

## コマンド

```sh
git branch feature/name
git branch
```

## 要点

branchの作成だけではHEADはmainのまま。

## 付箋

### create-note [講義]

右側のrefs階層は、loose refsで名前を管理する概念図です。packed-refsなどでは、そのままのファイル配置にならない場合もあります。
