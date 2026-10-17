---
id: "checkout-switch"
title: "checkoutとswitch：切り替える対象を確認する"
state: "branch-commands-switch-checkout-switch"
diagram: "assets/curriculum-guide.svg"
---

branchの切り替えにはgit switch branch-name、新しいbranchを作って切り替えるにはgit switch -c branch-nameを使います。過去のcommitを直接見る操作はgit switch --detach commit-idです。

古い資料では同じ目的にcheckoutを使います。checkout branch-nameはbranchへの切り替え、checkout commit-idはdetached HEADへの移動です。さらにcheckout -- fileはファイルの未ステージ変更を破棄する別の用途なので、文字の似たコマンドを取り違えないようにします。ファイルの復元は次のrestore Sectionで扱います。

切り替え前にstatusを確認します。未commitの変更は切り替えに伴って持ち越される場合もあり、上書きの恐れがある場合は拒否されます。切り替えれば必ず作業が保存されるわけではありません。

## コマンド

```sh
git status
git switch main
# 古い書き方では git checkout main
# 作成と切り替えを同時に行う場合
git switch -c feature/new-work
```

## 要点

branchへの切り替えはswitch。checkoutにはファイル復元の用途もある。
