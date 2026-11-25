---
id: "reflog"
title: "reflog"
state: "reflog"
diagram: "assets/commands/advanced-reflog.svg"
---

reflogは、このローカルリポジトリでHEADやブランチなどの参照が動いた記録です。resetやdetached HEADで見失ったコミットが残っていれば、IDを確認して救済用ブランチを付けられます。

git reflogで候補を見て、git showで内容を確認し、実際のIDに置き換えてgit branch rescue COMMIT_HASHで救済用の名前を付けます。先にreset --hardで上書きする必要はありません。

## スライド説明

このリポジトリでHEADやブランチなどの参照が動いた記録を表示します。

reset後などに見失ったcommitのIDを探すときに使います。

`show main` はmainの記録を表示します。記録には保存期限があり、未commitの編集の復元は保証しません。

## コマンド

```sh
git reflog
git show COMMIT_HASH
```

## 要点

見つかったコミットに、まずブランチの名前を付ける。

## 付箋

### reflog-lecture [講義]

reflogは未コミットの編集やcleanしたデータの保険ではありません。

### reflog-study

記録には期限があり、既定のexpireは通常90日、現在の先端から到達できない記録は通常30日ですが、設定次第です。期限切れやGCでオブジェクトが消えれば救済できません。共有先のreflogが手元へ複製されるわけでもありません。
