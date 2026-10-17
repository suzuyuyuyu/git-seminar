---
id: switch
title: "feature/nameへ切り替える"
state: switch
diagram: commit-graph
---

git switch feature/nameで、HEADがfeature/nameを指すようになります。元資料68のgit checkout feature/nameも、同じブランチ切り替えに使えます。ここでは用途が明確なswitchで進めます。

git statusにOn branch feature/nameと表示されることを確認します。二つのbranchはまだ同じcommitを指すので、この切り替えでREADMEの内容は変わりません。working tree cleanは、追跡対象に未記録の変更がない状態を示します。

## コマンド

```sh
git switch feature/name
git status
```

## 要点

HEADがfeature/nameを指したことを確認する。

## 付箋

### switch-note [講義]

切り替え前に未記録の変更があれば、まずその扱いを整理します。
