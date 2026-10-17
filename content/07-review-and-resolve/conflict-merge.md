---
id: conflict-merge
title: "mergeは停止し、競合箇所が示される"
state: conflict-merge
diagram: assets/collaboration-integration.svg
---

練習用フォルダーでmainにいることと、作業ツリーがきれいなことを確認してgit merge feat/jaを実行します。この例ではAuto-mergingに続いてCONFLICT (content)が出て、自動統合に失敗したと表示されます。これは意図した競合練習の結果です。

mainの先端はそのままで、Gitは解消作業を待っています。git statusでhello.pyが未解決であることを確認し、エディタで開きます。次の図では、ファイル内に並んだ2つの変更を読みます。

## コマンド

```sh
git switch main
git status
git merge feat/ja
# 競合によって停止した後
git status
```

## 要点

CONFLICTで止まったら、statusとファイルを確認する。

## 付箋

### conflict-merge-lecture [講義]

失敗表示の後に、むやみにmergeを繰り返しません。

### conflict-merge-study

PDF76のターミナル出力とマーカーを2節に分けています。catに依存せず、ファイル確認はエディタで行います。
