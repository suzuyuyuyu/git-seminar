---
id: "rescue-branch"
title: "branch（commitの救出）"
state: "advanced-recover-rescue-branch"
diagram: "assets/commands/advanced-rescue-branch.svg"
---

resetやamendの後で元のcommitを探す場合は、`git reflog` で過去のHEADの移動を確認します。候補のハッシュを `git show` で読み、必要な内容か確かめます。

候補が見つかったら `git branch rescue/work ハッシュ` で名前を付けます。現在の作業ファイルを切り替えずにcommitを参照できるため、そこから比較やcherry-pickを検討できます。reflogは各端末の記録で、未記録のファイル内容や永久保存を保証するものではありません。

## スライド説明

見つけたcommitに救出用のブランチ名を付け、そこから履歴を参照できるようにします。

reflogで見つけた変更を、作業ファイルを切り替えずに確保するときに使います。

`branch 名前 ID` は参照を作る操作です。内容をshowで確認した後に名前を付けます。

## コマンド

```sh
git show COMMIT_HASH
git branch rescue/work COMMIT_HASH
```

## 要点

戻す前に内容を確かめ、救出用の名前を付ける。
