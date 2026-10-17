---
id: "powershell-function"
title: "PowerShellでは引数付きの省略を関数にする"
state: "tips-aliases-powershell-function"
diagram: "assets/curriculum-guide.svg"
---

PowerShellの `Set-Alias` はコマンド名を別名にします。`git status` のように固定の引数まで一緒に登録したいときは、`function gs { git status @args }` のような関数を使います。

例の関数は現在のセッションで有効です。永続化するときは `$PROFILE` で自分のプロファイルの場所を確認し、動作を確かめた定義を保存します。Bashの `.bashrc` とPowerShellのプロファイルは別の設定です。

## コマンド

```sh
# PowerShellでの例
function gs { git status @args }
gs --short
# 永続化する場合の設定先を確認
$PROFILE
```

## 要点

PowerShellでは固定引数を含む省略に関数を使う。

## 付箋

### shell-note

このStepはPowerShell用。Bash用Stepと並べて、シェルによって構文と永続化先が異なることを説明します。
