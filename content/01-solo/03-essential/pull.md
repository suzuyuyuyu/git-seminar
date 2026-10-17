---
id: "pull"
title: "分岐していなければmainを進める"
state: "pull"
diagram: "assets/operation-map.svg"
---

ここではmainにいて、git statusで未記録の変更がないことを確認します。git pull --ff-only origin mainは取得に続けて、手元のmainを単純に進められる場合だけ更新します。更新されると作業ファイルにも反映されます。

手元と共有先で履歴が分岐していると、この方法では拒否されます。forceで押し通さず状態を確認し、「共同開発を管理しよう」のハンズオンで統合の流れを確認しましょう。pullの統合方法は指定や設定で異なるため、この教材では--ff-onlyを明示します。

## コマンド

```sh
git status
git pull --ff-only origin main
```

## 要点

pullは取得と統合。今回は単純に進められる場合だけ。

## 付箋

### inspect-pull-reject [講義]

拒否されたときは、履歴を消す操作をせずに止まって確認します。
