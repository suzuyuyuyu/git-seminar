---
id: "markers"
title: "競合マーカーで双方の内容を読む"
state: "markers"
diagram: "assets/collaboration-integration.svg"
presentation-lines: "0"
---

git statusで競合しているファイルを確認し、hello.pyをエディタで開きます。通常の競合表示では、<<<<<<< HEADと=======の間が現在のmain側、=======と>>>>>>> feat/jaの間が取り込む側です。この例ではHEADはmainを指しています。

これらのマーカーは、未解決の箇所を示すためにGitが挿入した文字です。Pythonのコードとしては実行できません。表示形式の設定によっては共通祖先の内容も表示されます。ファイルが複数ある場合や一つのファイルに複数の競合がある場合は、すべての箇所を確認します。

## コマンド

```sh
git status

# hello.py をエディタで確認する
def greet():
<<<<<<< HEAD
    print("Hello, everyone!")
=======
    print("こんにちは!")
>>>>>>> feat/ja
```

## 要点

HEAD側と取り込み側を読み、未解決の範囲を確かめる。

## 付箋

### markers-head

ここでのHEADは、GitHubのPRで使うhead branchという呼び方と混同しないようにします。
