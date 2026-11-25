---
id: "review"
title: "状態・差分・履歴を確かめる"
state: "collaboration-summary-review"
diagram: "assets/curriculum-guide.svg"
---

操作に迷ったら、今いるbranch、未記録の変更、記録済みの履歴を順に確認します。status・diff・logは、それぞれ違う情報を表示するコマンドです。エラーを消すためだけに、reset --hardやcleanを実行しないようにします。

自分のコードで小さな変更を一つ選び、目的を説明し、差分を確認してcommitし、PRで共有するところまで再現してみてください。コマンドの暗記よりも、何が変わる操作なのかを説明できることが大切です。

## スライド説明

次の操作を決める前に、statusで現在のbranchと変更の状態を確かめます。diffで変更内容を読み、logで記録済みの履歴をたどります。

エラーや競合が出ても、まず状態を読みます。未commitの編集や未追跡ファイルがGitから必ず戻せるとは限りません。

小さな変更を一つ選び、目的の説明からcommit、PR、統合後の更新までを自分で一巡できれば、00〜03の内容を実際の作業につなげられます。

## コマンド

```sh
git status
git diff
git diff --staged
git log --oneline --graph --decorate --all
```

## 要点

状態を読み、差分を確認し、目的が伝わる変更を記録・共有する。
