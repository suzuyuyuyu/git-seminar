---
id: "loss-reset-checkout"
title: "reset・checkoutは未commit変更を上書きし得る"
state: "tips-data-loss-loss-reset-checkout"
diagram: "assets/curriculum-guide.svg"
---

`git reset --hard` はHEADやindexに加えて作業ファイルも対象commitへ揃えるため、追跡中ファイルの未commit変更を失い得ます。`git checkout -- README.md` や `git restore README.md` も、指定ファイルの作業中の変更を上書きします。

実行前に `git status` とdiffを読み、残す内容をcommitや別ファイルへ保存します。commit済みの履歴はreflogから探せる場合がありますが、commitもstashもしていない編集は同じ方法では戻せません。

## コマンド

```sh
git status
git diff
git diff --cached
# 内容を確認し、必要な変更を先に保存する
```

## 要点

Gitで管理中でも、未記録の編集は守られていない。
