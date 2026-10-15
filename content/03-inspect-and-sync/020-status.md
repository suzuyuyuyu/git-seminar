---
id: status
title: "02 statusで作業の状態を読む"
state: status
---

statusは、現在のbranch、indexに準備した変更、まだ準備していない変更、未追跡のファイルなどを表示します。何か操作する前後に確認する習慣を付けましょう。

Changes not staged for commitは未ステージ、Changes to be committedは記録の準備済みです。Untracked filesはまだGitが追跡していないファイルです。cleanは未記録の変更がないことを示し、push済みという意味ではありません。

## コマンド

```sh
git status
```

## 要点

状態を確認してから、次の操作を選ぶ。

## 付箋

### inspect-status-offline [講義]

statusはネットワークに問い合わせません。ahead/behindは手元の追跡情報との比較です。
