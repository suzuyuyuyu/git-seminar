---
id: amend
title: "共有前の直近コミットを整える"
state: amend
---

コミット直後に追加漏れを見つけたら、対象をステージして git commit --amend を使えます。直近コミットを元に、インデックスの内容を持つ新しいコミットへ置き換えます。

--no-edit はメッセージを引き継ぎます。内容を変えなくてもコミットのIDは変わり得るため、すでに他の人が利用している履歴には原則使いません。

## コマンド

```sh
git add -- report.txt
git diff --cached
git commit --amend --no-edit
```

## 要点

amendは追記ではなく、直近コミットの作り直し。

## 付箋

### amend-lecture [講義]

ステージ済みの別の変更も入るので、差分を確認します。

### amend-study

メッセージだけなら git commit --amend -m "新しい説明"。共有済みの修正は通常、新しいコミットを追加します。amendで置き換えた元コミットも直ちに物理削除されるとは限りません。
