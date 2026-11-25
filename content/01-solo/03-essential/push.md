---
id: "push"
title: "push"
state: "push"
diagram: "assets/commands/essential-push.svg"
---

git push origin mainは、手元のmainにあるcommitをoriginという名前のリモートへ送り、リモートのmainを更新します。ここで初めて、挨拶の変更を含む履歴が共有先に届きます。

GitHubやGitLabはリモートリポジトリを置くサービスです。共有先の履歴を確認すると、送ったcommitと変更したファイルを見ることができます。

## スライド説明

手元のcommitをリモートへ送り、指定したリモートブランチを更新します。

自分の変更を共有するときや、レビューを依頼する前に使います。

`-u` は送信と同時にupstream（追跡先）を設定します。未commitの編集は送信されません。

## コマンド

```sh
git push -u origin main
```

## 要点

pushは、記録済みの履歴をリモートに送る。

## 付箋

### push-only-commits [講義]

commitしていない編集はpushされません。

### push-precondition

この例は、originが設定済みで、mainへ送信できる場合です。リモート側に別の更新があるとpushが拒否されることがあります。その扱いは後の章で学びます。
