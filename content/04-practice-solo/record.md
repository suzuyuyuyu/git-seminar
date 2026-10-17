---
id: record
title: "03 最初のcommitを作る"
state: record
diagram: assets/foundations-practice.svg
---

hello.pyをaddし、diff --stagedで記録する内容を確認してからcommitします。Chapter 02で見た「準備してから記録する」を実際に行います。

logにInitial greetingが表示され、statusがcleanになることを確認します。作者情報のエラーが出た場合はChapter 00の設定を済ませてから再実行します。

## コマンド

```sh
git add hello.py
git diff --staged
git commit -m "Initial greeting"
git log --oneline
git status
```

## 要点

内容を確認してから、最初の記録を残す。

## 付箋

### practice-first-parent [講義]

最初のcommitには親commitがありません。ここから履歴が始まります。
