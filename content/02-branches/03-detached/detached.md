---
id: "detached"
title: "commitを直接見るとdetached HEADになる"
state: "detached"
diagram: "commit-graph"
---

過去のcommitを直接指定すると、HEADはブランチを介さずcommitを指します。この状態がdetached HEADです。図ではmainはc4を指したまま、HEADだけがc2を直接指しています。元資料の小さな比較図が示すように、現在地は必ずしも最新のcommitとは限りません。

過去の状態を調べるためには使えますが、ここで作った新しいcommitは既存のmainを進めません。変更を続けるなら新しいブランチで保持する必要があります。下のHEAD~2はこの図のc2に相当します。状態を見るだけなら、確認後にgit switch mainで戻れます。

## コマンド

```sh
git switch --detach HEAD~2
git status
git switch main
```

## 要点

HEADがbranchを介さずcommitを指す状態を区別する。

## 付箋

### detached-note [講義]

原資料の「どのcommitへもswitchできる」は、直接指定する場合には--detachが必要です。図はコマンド途中の状態を示します。
