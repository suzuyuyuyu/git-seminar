---
id: "push"
title: "記録した履歴を共有する"
state: "push"
diagram: "assets/record-flow.svg"
---

git push origin mainは、手元のmainにあるcommitをoriginという名前のリモートへ送り、リモートのmainを更新します。ここで初めて、挨拶の変更を含む履歴が共有先に届きます。

GitHubやGitLabはリモートリポジトリを置くサービスです。共有先の履歴を確認すると、送ったcommitと変更したファイルを見ることができます。

## コマンド

```sh
git push origin main
```

## 要点

pushは、記録済みの履歴をリモートに送る。

## 付箋

### push-only-commits [講義]

commitしていない編集はpushされません。

### push-precondition

この例は、originが設定済みで、mainへ送信できる場合です。リモート側に別の更新があるとpushが拒否されることがあります。その扱いは後の章で学びます。
