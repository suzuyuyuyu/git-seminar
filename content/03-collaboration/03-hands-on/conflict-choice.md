---
id: "conflict-choice"
title: "mergeしたいとき、どちらを残す？"
state: "conflict-choice"
diagram: "assets/collaboration-integration.svg"
---

mainでgit merge feat/jaを実行しようとしています。main側のHello, everyone!と、取り込む側のこんにちは!のどちらを完成形にするか、Gitは変更の意図から判断できません。

どちらかを選ぶ、両方を組み合わせる、新しく書き直すという判断が必要です。図の点線で描いた合流点は「これから作りたいmerge commit」で、競合中にはまだ作成されていません。mainも取り込む側も元のcommitを指したままです。

## 要点

どちらの挨拶を残すか、Gitには判断できない。

## 付箋

### conflict-choice-lecture [講義]

競合した段階では、merge commitはまだありません。

### conflict-choice-study

PDF75の黄色い合流点は完成済みcommitと誤読しないよう、予定の合流点として点線で表示します。
