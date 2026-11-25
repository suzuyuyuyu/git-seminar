---
id: "release-tag"
title: "tag"
state: "advanced-tags-release-tag"
diagram: "assets/commands/advanced-release-tag.svg"
---

branchはcommitに伴って先へ進みます。tagは、公開版などの特定のcommitを指す名前として使います。注釈付きtagには説明や作成者、日時も記録できます。

作業内容とテスト結果を確認したcommitで `git tag -a v1.0.0 -m "First release"` を作り、`git show v1.0.0` で対象を確かめます。tagはローカルで作成されるので、共有するときは `git push origin v1.0.0` と対象を明示します。

## スライド説明

公開版などの特定commitに名前を付けます。branchと違い、新しいcommitへ自動では進みません。

リリースや解析の基準として、同じ版を後から参照するときに使います。

`-a` は注釈付きtag、`-m` は説明を指定します。共有は`push origin タグ名`で対象を明示します。

## コマンド

```sh
git tag -a v1.0.0 -m "First release"
git show v1.0.0
```

## 要点

branchは作業の先端、tagは版の目印。
