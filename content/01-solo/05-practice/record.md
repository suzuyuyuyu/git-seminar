---
id: "record"
title: "hello.pyをaddして、commitする"
state: "solo-practice-record"
diagram: "assets/curriculum-guide.svg"
---

作成したhello.pyをaddし、diff --stagedで記録する内容を確認してからcommitします。READMEはGitHubで作成した最初のcommitにあり、ここでその次のcommitを作ります。

logにInitial greetingが表示され、statusがcleanになることを確認します。作者情報のエラーが出た場合は「学習の準備」の設定を確認してください。ファイル保存・add・commitが別々の操作であることを、自分の状態の変化で確かめましょう。

## コマンド

```sh
git add hello.py
git diff --staged
git commit -m "Initial greeting"
git log --oneline
git status
```

## 要点

indexを確認してhello.pyを記録する。この時点では、まだ手元の履歴だけ。
