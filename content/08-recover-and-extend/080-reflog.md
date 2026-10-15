---
id: reflog
title: "見失ったコミットは、参照の履歴から探す"
state: reflog
---

reflogは、このローカルリポジトリでHEADやブランチなどの参照が動いた記録です。resetやdetached HEADで見失ったコミットが残っていれば、IDを確認して救済用ブランチを付けられます。

git reflogで候補を見て、git showで内容を確認し、実際のIDに置き換えてgit branch rescueを作ります。先にreset --hardで上書きする必要はありません。

## コマンド

```sh
git reflog
git show abc1234
git branch rescue abc1234
```

## 要点

見つかったコミットに、まずブランチの名前を付ける。

## 付箋

### reflog-lecture [講義]

reflogは未コミットの編集やcleanしたデータの保険ではありません。

### reflog-study

記録には期限があり、既定のexpireは通常90日、現在の先端から到達できない記録は通常30日ですが、設定次第です。期限切れやGCでオブジェクトが消えれば救済できません。共有先のreflogが手元へ複製されるわけでもありません。
