---
id: "alternatives"
title: "中止する場合と、GitHub上で解消する場合"
state: "alternatives"
diagram: "assets/collaboration-integration.svg"
---

方針を決められないときは、merge途中の状態でgit merge --abortを実行して開始前の状態へ戻す方法があります。merge後に行った解消用の編集を残したいなら、先に別途控えておきます。開始前から未コミットの変更があると元の状態を復元できない場合もあるため、作業ツリーを整理してから始めます。

GitHubのPR画面にも、同じ行の変更など単純な競合を編集できる機能があります。対応できない競合やResolve conflictsが使えない場合はローカルで解消します。GitHub上での解消はbaseをhead側へ取り込む操作で、先ほどの「ローカルmainへmerge」と方向が違います。解消後もPRの確認とmainへの統合は必要です。

## コマンド

```sh
# mergeが進行中で、中止したい場合
git merge --abort
git status
```

## 要点

進められなければ中止して相談する。解消方法で取り込み方向も変わる。

## 付箋

### alternatives-protected [講義]

実際の共同開発では、保護されたmainを手元から直接更新せず、チーム指定のブランチとPRの手順を使います。
