---
id: "record"
title: "解消した内容を記録する"
state: "record"
diagram: "assets/collaboration-integration.svg"
---

すべての競合を編集して動作を確認したら、git add hello.pyで解消した内容をステージします。続いてgit commitを実行し、mergeの記録を残します。メッセージ用のエディタが開いた場合は、内容を確認して保存し、終了します。

この分岐した履歴の例では、main側とfeat/ja側の二つの親を持つmerge commitができます。コミット後にgit statusで未解決の状態がないことを確認し、関数やテストをもう一度実行します。ローカルのmainで行った練習は、そのままGitHubへpushする必要はありません。

## コマンド

```sh
git add hello.py
git status
git commit
git status
python -c "from hello import greet; greet()"
git log --graph --oneline --decorate -8
```

## 要点

編集→確認→add→commitで、競合解消を履歴に残す。

## 付箋

### record-add [講義]

git addは、内容が正しいかを自動判定しません。マーカーが残ったファイルもステージできてしまうため、先に確認します。
