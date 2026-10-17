---
id: "loss-clean"
title: "cleanは未追跡ファイルを削除する"
state: "tips-data-loss-loss-clean"
diagram: "assets/curriculum-guide.svg"
---

`git clean -f` は未追跡ファイルを削除します。Gitに記録されていないファイルなので、削除後にreflogを見ても内容は得られません。まず `git clean -n` で削除予定を表示し、本当に不要かを確認します。

`-d` は未追跡ディレクトリ、`-x` はignore対象も削除範囲に含めます。ビルド生成物と一緒に手元の設定やデータがある場合もあるため、名前だけで判断しないでください。必要なものは別の場所へ保存してから対象を絞ります。

## コマンド

```sh
git status --short
git clean -n
# ディレクトリも対象にする場合の事前確認
git clean -nd
```

## 要点

cleanの前にdry-run。未追跡ファイルはGitから戻せない。
