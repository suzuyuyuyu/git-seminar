---
id: "conclusion"
title: "まずは結論：記録して、共有する"
state: "intro-conclusion-conclusion"
diagram: "assets/curriculum-guide.svg"
---

Gitは手元で変更の履歴を記録し、GitHubなどの共有先へ送ることでバックアップや共同作業につなげられます。エディターで保存しただけではcommitにならず、commitしただけではGitHubへ届きません。

普段の基本は、statusで状態を読み、addで次に記録する内容を選び、commitで記録し、pushで送る流れです。初回はcloneで手元に作業場所を用意します。ほかの変更を取り込むときは、作業を記録・退避してからpullします。詳しい図と使い分けは後のSectionで確かめます。

## コマンド

```sh
git status
git add hello.py
git commit -m "Describe the change"
git push
```

## 要点

保存の次にadd・commitで履歴を残し、pushで共有先へ送る。
