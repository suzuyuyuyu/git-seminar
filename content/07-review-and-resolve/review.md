---
id: review
title: "差分と目的を確認してからmergeする"
state: review
diagram: assets/collaboration-integration.svg
---

レビューでは、PRに含まれるファイルと差分を読み、Issueで決めた目的に合っているかを確認します。不要なファイルの追加や説明との食い違いがないかを見て、必要な実行確認も行います。変更を小さくすると、作成者も確認する人も判断しやすくなります。

指摘を受けたら、同じ作業ブランチで修正をコミットし、再びpushします。その変更は既存のPRに反映されます。レビューと必要なチェックを終え、チームの手順に沿ってmergeします。merge commit・squash・rebaseなど統合方式によって履歴の形は変わります。この教材の履歴図はmerge commitを残す例です。

## 要点

目的・差分・動作を確認し、合意した変更を統合する。

## 付箋

### review-no-pull

Pull Requestという名前ですが、PRを作る操作はgit pullコマンドの実行ではありません。

### review-policy [講義]

mainが保護されている場合、レビューやチェックが揃うまで統合できません。
