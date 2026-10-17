---
id: merge-model
title: "二つの親を持つmerge commit"
state: merge-model
diagram: commit-graph
---

別々に進んだ作業をmainへ統合した例です。mainへ切り替えてgit merge add/new-algorithmを実行し、m5で作業側を取り込みました。m5の第一親は取り込み先だったm4、第二親は作業側のb2です。その後mainにはm6、m7も記録されています。

図のadd/new-algorithmはb2のままです。mergeしたからといって、取り込まれた側のブランチまでmainへ移動しません。ここでは競合せずmerge commitを作る例を示しています。履歴が分岐していない場合は、目印を進めるfast-forwardになり、新しいmerge commitを作らないこともあります。

## コマンド

```sh
git switch main
git merge add/new-algorithm
```

## 要点

merge commitは、統合前の二つのcommitを親として残す。

## 付箋

### merge-model-note [講義]

この図は概念説明です。後半のREADME演習ではローカルmainへこのmergeを実行しません。
