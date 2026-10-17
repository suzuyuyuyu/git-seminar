---
id: publish
title: "05 最初の履歴を送って確認する"
state: publish
diagram: assets/foundations-practice.svg
---

git push -u origin mainでmainの履歴を送ります。-uは、今後のpush・pullで使う追跡先を関連付けます。設定できれば、通常は次回からgit pushだけで同じ共有先に送れます。

GitHubのページを更新し、hello.pyとInitial greetingのcommitが見えることを確認します。pushが拒否されたら先へ進まず、空のリポジトリを選んだか、URL・認証・権限を確認します。

## コマンド

```sh
git push -u origin main
git status
```

## 要点

送った履歴を、ブラウザーでも確かめる。

## 付箋

### practice-no-force [講義]

ここでforce pushは使いません。拒否の理由を確認しましょう。
