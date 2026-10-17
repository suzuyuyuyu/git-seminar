---
id: "publish"
title: "pushし、GitHubで記録を確かめる"
state: "solo-practice-publish"
diagram: "assets/curriculum-guide.svg"
---

cloneしたmainは通常、origin/mainを追跡しています。git pushで手元のcommitを送り、GitHubのページを更新してhello.pyとInitial greetingのcommitが追加されたことを確認します。

pushが拒否されたら強制送信せず、remote -vでURL、statusでbranchや状態、共有先で新しい変更がないかを確認します。SSHの認証と、リポジトリへの書き込み権限は別の確認です。

## コマンド

```sh
git push
git status
```

## 要点

push後にGitHubでファイルとcommitを確認して、記録と共有を結び付ける。
