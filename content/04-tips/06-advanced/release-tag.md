---
id: "release-tag"
title: "tagで公開した版に名前を付ける"
state: "advanced-tags-release-tag"
diagram: "assets/curriculum-guide.svg"
---

branchはcommitに伴って先へ進みます。tagは、公開版などの特定のcommitを指す名前として使います。注釈付きtagには説明や作成者、日時も記録できます。

作業内容とテスト結果を確認したcommitで `git tag -a v1.0.0 -m "First release"` を作り、`git show v1.0.0` で対象を確かめます。tagはローカルで作成されるので、共有するときは `git push origin v1.0.0` と対象を明示します。

## コマンド

```sh
git tag -a v1.0.0 -m "First release"
git show v1.0.0
# 共有するときだけ実行する例
# git push origin v1.0.0
```

## 要点

branchは作業の先端、tagは版の目印。
