---
id: submodule
title: "別リポジトリの特定版を組み込む"
state: submodule
diagram: assets/recovery.svg
---

submoduleは、独立した別リポジトリを親プロジェクトの中で利用する仕組みです。親はその中身全体ではなく、子の特定コミットを参照し、取得先を.gitmodulesに記録します。

既存プロジェクトのsubmoduleをそろえる例です。--initで初期化し、--recursiveで入れ子も対象にします。通常は親が記録したコミットをチェックアウトし、子はdetached HEADになります。

## コマンド

```sh
git submodule update --init --recursive
git submodule status
```

## 要点

親が記録するのは、別リポジトリの特定コミット。

## 付箋

### submodule-lecture [講義]

親の更新だけで、子の変更や未pushのコミットは共有されません。

### submodule-study

子を変更する場合は子でブランチを作りcommit・pushし、親で子の参照先変更をadd・commit・pushします。worktreeは同一リポジトリの別作業場所、submoduleは別リポジトリの組み込みです。
