---
id: "loss-unreachable"
title: "amend・stash・detached HEADの保存先を確かめる"
state: "tips-data-loss-loss-unreachable"
diagram: "assets/curriculum-guide.svg"
---

amendは元のcommitを書き換えるのではなく、置き換えるcommitを作りbranchを進めます。detached HEADで作ったcommitはbranchを付けずに移動すると見失いやすくなります。必要なら移動前にbranchを作り、名前で参照できるようにします。

stashは既定では未追跡・ignore対象を含まず、dropやclearで参照も失い得ます。reflogは救出の手掛かりですが、有効期限やオブジェクト整理があり永久のバックアップではありません。長く残す内容はbranch上にcommitし、必要な共有先にも保存します。

## コマンド

```sh
git status
git branch --show-current
git stash list
git reflog
```

## 要点

保存したつもりで終わらず、どの名前から参照できるか確かめる。
