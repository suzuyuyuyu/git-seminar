---
id: "submodule-update"
title: "submoduleは「参照するcommit」を更新する"
state: "tips-submodule-submodule-update"
diagram: "assets/curriculum-guide.svg"
---

submoduleを含むリポジトリは `git clone --recurse-submodules URL` で取得するか、clone後に `git submodule update --init --recursive` を使って中身を揃えます。親は子の全ファイルではなく、子の特定commitを記録します。

子の更新を取り込むときは、子で必要なcommitを選び、親側でsubmoduleのパスをaddしてcommitします。共同作業者が取得できるよう、子のcommitを先に共有します。`git submodule status` と親のdiffで、参照先が意図した版か確かめましょう。

## コマンド

```sh
git submodule update --init --recursive
git submodule status
git diff --submodule
```

## 要点

子のcommitを共有してから、親の参照先を更新する。
