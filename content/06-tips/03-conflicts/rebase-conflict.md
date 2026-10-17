---
id: "rebase-conflict"
title: "rebaseのConflictは一つずつ解消する"
state: "tips-conflicts-rebase-conflict"
diagram: "assets/curriculum-guide.svg"
---

rebaseはcommitを順番に載せ直すため、途中の一つで停止します。`git status` を読み、競合箇所を編集してaddしたら `git rebase --continue` へ進みます。後続のcommitでも再び止まることがあります。

載せ直し自体をやめるなら `git rebase --abort` です。`--skip` は問題のcommitを載せない判断なので、単なる続行には使いません。またrebase中のours/theirsは直感と逆に感じやすいため、ラベルだけで選ばず両側の内容を読みます。

## コマンド

```sh
git status
# 編集と動作確認の後
git add README.md
git rebase --continue
# 中止する場合の選択肢: git rebase --abort
```

## 要点

一つ直してcontinue。skipはcommitを省く判断。
