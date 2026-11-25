---
id: "record"
title: "変更を記録し、共有する"
state: "push"
diagram: "assets/record-flow.svg"
---

working treeは編集するファイル、indexは次のcommitに入れる内容を準備する場所です。ローカルリポジトリには記録済みの履歴があり、リモートリポジトリを通じてその履歴を共有します。

addは実行した時点の内容をindexへ反映し、commitはそのindexの状態を記録します。pushは記録済みのcommitを送ります。エディターで保存するだけでは、commitにも共有先の更新にもなりません。

## スライド説明

編集する場所はworking treeです。`git diff`で変更を読み、`git add`で今回の記録に入れる内容をindexへ反映します。

`git diff --staged`で準備した差分を確かめ、`git commit`で手元の履歴に記録します。add後にさらに編集した内容は、もう一度addするまで今回の記録に入りません。

`git push`で記録済みの履歴を共有します。ほかの人の更新を取り込むときは、手元の作業を整理したうえでpullします。

## 要点

保存・add・commit・pushは、反映する場所がそれぞれ違う。
