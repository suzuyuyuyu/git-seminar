---
id: "checkout-switch"
title: "switch / checkout"
state: "branch-commands-switch-checkout-switch"
diagram: "assets/commands/branch-commands-checkout-switch.svg"
---

branchの切り替えにはgit switch branch-name、新しいbranchを作って切り替えるにはgit switch -c branch-nameを使います。過去のcommitを直接見る操作はgit switch --detach commit-idです。

古い資料では同じ目的にcheckoutを使います。checkout branch-nameはbranchへの切り替え、checkout commit-idはdetached HEADへの移動です。さらにcheckout -- fileはファイルの未ステージ変更を破棄する別の用途なので、文字の似たコマンドを取り違えないようにします。ファイルの復元は次のrestore Sectionで扱います。

切り替え前にstatusを確認します。未commitの変更は切り替えに伴って持ち越される場合もあり、上書きの恐れがある場合は拒否されます。切り替えれば必ず作業が保存されるわけではありません。

## スライド説明

switchはブランチを切り替え、作業ファイルをその版へ合わせます。古い資料ではcheckoutを使います。

別ブランチの作業へ移るときに使います。切り替える前にstatusで途中の変更を確認します。

`switch -c 名前` は作成して切り替えます。`--detach ID` はcommitを直接開きます。`checkout -- ファイル` は編集を破棄する別操作です。

## コマンド

```sh
git switch main
git switch -c feature/readme
```

## 要点

branchへの切り替えはswitch。checkoutにはファイル復元の用途もある。
