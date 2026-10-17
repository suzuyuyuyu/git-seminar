---
id: "exercise"
title: "もう一度、自分で記録する"
state: "overview"
diagram: "assets/operation-map.svg"
---

小演習：hello.pyを print("Hello, everyone!") に変えて保存します。statusとdiffはどう変わるでしょうか。確認してからadd・commit・pushし、GitHubで今回の挨拶に関する2つのcommitを見つけてください。

確認の答え：保存直後は未ステージの変更です。add後はdiff --stagedに変更が出て、commit後はlogにChange greetingが加わります。READMEの初期commitに続いてInitial greetingとChange greetingが並び、合計3件になります。push後に共有先でも挨拶の2つのcommitが見えれば完了です。下の操作例は、自分で考えた後に照合してください。

## コマンド

```sh
git status
git diff
git add hello.py
git diff --staged
git commit -m "Change greeting"
git log --oneline
git push
```

## 要点

保存・準備・記録・共有を、自分で繰り返す。

## 付箋

### practice-unsent-answer [講義]

commit後にpushしなければ、2件目の記録は手元だけにあります。
