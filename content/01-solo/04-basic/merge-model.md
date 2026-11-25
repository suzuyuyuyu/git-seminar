---
id: "merge-model"
title: "merge"
state: "merge-model"
diagram: "assets/commands/basic-merge-model.svg"
---

別々に進んだ作業をmainへ統合する例です。mainへ切り替えてgit merge feature/readmeを実行します。新しいmerge commitの第一親はmainの元の先端、第二親はfeature/readmeの先端です。

取り込んだfeature/readmeの目印は、元の先端に残ります。mergeしたからといって、取り込まれた側のブランチまでmainへ移動しません。ここでは競合せずmerge commitを作る例を示しています。履歴が分岐していない場合は、目印を進めるfast-forwardになり、新しいmerge commitを作らないこともあります。

## スライド説明

別のブランチの履歴を現在のブランチへ統合します。分岐している場合は通常merge commitを作ります。

別ブランチで完成した変更を、履歴を残して取り込むときに使います。

`--ff-only` は分岐があると停止します。`--no-ff` はfast-forward可能な場合もmerge commitを作ります。

## コマンド

```sh
git switch main
git merge feature/readme
```

## 要点

merge commitは、統合前の二つのcommitを親として残す。

## 付箋

### merge-model-note [講義]

この図は概念説明です。後半のREADME演習ではローカルmainへこのmergeを実行しません。
