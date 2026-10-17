---
id: markdown
title: "Markdownで読める説明を書く"
state: markdown
diagram: assets/collaboration-planning.svg
---

Markdownは、プレーンテキストに見出しや箇条書き、コードブロックの印を付ける記法です。READMEだけでなく、IssueやPull Requestの説明にも使えます。文章を書くために専用のソフトを入れる必要はありません。

見出しには#、箇条書きには-、コードの前後にはバッククォートを3つ使います。コマンドとその出力、説明文を分けると読みやすくなります。GitHubやエディタのプレビューで、改行やコードの範囲が意図どおりか確認しましょう。

## コマンド

````sh
# 実行方法

- Pythonを用意する

```sh
python hello.py
```
````

## 要点

説明と実行例を分け、プレビューで確認する。

## 付箋

### markdown-copy

プロンプトの記号までコードに含めると、コピーした人が実行しにくくなります。
