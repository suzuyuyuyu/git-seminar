---
id: "rescue-branch"
title: "見つけたcommitに救出用branchを付ける"
state: "advanced-recover-rescue-branch"
diagram: "assets/curriculum-guide.svg"
---

resetやamendの後で元のcommitを探す場合は、`git reflog` で過去のHEADの移動を確認します。候補のハッシュを `git show` で読み、必要な内容か確かめます。

候補が見つかったら `git branch rescue/work ハッシュ` で名前を付けます。現在の作業ファイルを切り替えずにcommitを参照できるため、そこから比較やcherry-pickを検討できます。reflogは各端末の記録で、未記録のファイル内容や永久保存を保証するものではありません。

## コマンド

```sh
git reflog
# 候補を確認し、実際のハッシュに置き換える
git show COMMIT_HASH
git branch rescue/work COMMIT_HASH
```

## 要点

戻す前に内容を確かめ、救出用の名前を付ける。
