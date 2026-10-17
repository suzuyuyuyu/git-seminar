---
id: operation-map
title: "05 全体図で操作の位置を確認する"
state: overview
diagram: assets/operation-map.svg
wide: true
---

原資料の全体図では、共有先のrepo Aとそのfork、手元のリモート追跡branch、作業するbranch、index、working tree、stashを分けています。ローカルリポジトリという言葉を、作業ファイルだけの場所と取り違えないようにしましょう。

まずはadd・commit・pushがどこからどこへ反映するかを確認します。cloneは共有先から手元への複製、fetchは手元の追跡情報の更新、pullは取得に続く統合です。forkやstashは後の章で扱い、この同じ図へ戻って位置を確かめます。

## 要点

領域と矢印を分けて、コマンドが更新する場所を読む。

## 付箋

### operation-map-scope [講義]

今はadd・commit・pushを中心に確認します。すべての矢印を一度に覚える必要はありません。

### operation-map-pull

原資料のpullはfetchとmergeのまとまりです。実際のpullは指定・設定で統合方法が変わります。この教材の基本手順では--ff-onlyを明示します。
