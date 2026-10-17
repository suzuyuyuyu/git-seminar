---
id: first-parent
title: "~は第一親を何回たどるかを表す"
state: first-parent
diagram: commit-graph
---

commit IDを長く入力する代わりに、HEADなどを基準にした相対位置も使えます。~、~1、^、^1はいずれも第一親を一つたどる指定です。この図のHEADはmainのm6なので、HEAD~1はm5、HEAD~2はm4を指します。~2は~~や^^とも書けます。

~2は、第一親を二回たどるという意味です。^2は「二つ前」ではなく「第二親」なので、同じではありません。m6は親が一つしかないため、HEAD^2でm4へは行けません。図で第一親の道を確認してから、読み取り用のgit showで内容を調べてみましょう。

## コマンド

```sh
git show HEAD~1
git show HEAD~2
```

## 要点

~2は第一親を二回。^2とは意味が違う。

## 付箋

### first-parent-note [講義]

原資料61はcheckoutを例にしています。ここでは現在地を動かさずに内容を読むgit showを使います。
