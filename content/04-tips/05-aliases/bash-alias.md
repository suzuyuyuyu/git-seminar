---
id: "bash-alias"
title: "Bashではaliasと関数を使い分ける"
state: "tips-aliases-bash-alias"
diagram: "assets/curriculum-guide.svg"
---

Git BashなどのBashでは `alias gs="git status"` とすると、`gs` で呼び出せます。この例は現在のシェルで有効です。毎回使う設定は、利用しているシェルの起動設定へ保存します。

引数を受けて処理する場合は関数が使えます。例の `gshow` は受け取った引数をそのまま `git show` に渡します。Bashの構文なので、PowerShellへそのまま貼り付けず、自分のターミナルのシェルを確認します。

## コマンド

```sh
# Git Bash / Bashでの例
alias gs="git status"
gshow() { git show "$@"; }
gs
gshow HEAD
```

## 要点

Bashのaliasはシェル全体の省略。引数処理には関数。

## 付箋

### bash-scope

Bashの例です。受講者がPowerShellを利用している場合は次のStepを使います。設定ファイルへ追記する前に、その場で動作確認してください。
