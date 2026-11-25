---
id: "revert"
title: "revert"
state: "revert"
diagram: "assets/commands/advanced-revert.svg"
---

共有した履歴を取り消すときは、まずrevertを考えます。対象コミットの変更を逆向きに適用した新しいコミットを作り、既存の履歴を残します。

作業ツリーをきれいにして対象の差分を確認します。例のCOMMIT_HASHは、実際の通常コミットのIDに置き換えてください。競合する場合は解消後に --continue、取りやめるなら --abort を使います。

## スライド説明

指定commitの変更を逆向きに適用し、打ち消すための新しいcommitを追加します。

共有済みの変更を取り消し、既存の履歴を残したいときに使います。

`--no-commit` はcommitせず適用します。競合解消後は`--continue`、中止する場合は`--abort`です。

## コマンド

```sh
git show COMMIT_HASH
git revert COMMIT_HASH
```

## 要点

履歴を消さずに、変更を打ち消す記録を追加する。

## 付箋

### revert-lecture [講義]

revertにも競合があります。対象の変更を読んで選びます。

### revert-study

マージコミットのrevertは、どちらの親を基準にするかを-mで指定する別の判断が必要です。後の再マージにも影響するため、通常コミットの例と区別します。
