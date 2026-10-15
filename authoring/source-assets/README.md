# 元資料から抽出した素材の管理

公開ページで参照する原画像は `docs/assets/illustrations/` に集約しています。本文用・本番用に画像を複製せず、SVG内のimage要素から同じファイルを参照します。図そのものは `docs/assets/` の編集可能なSVGです。

`docs/assets/illustrations/manifest.json` に、元PPTのメディア名、実際に参照されるPPTスライド番号、SHA-256、出典確認状況を記載しています。元の画像は改変せず、画像名だけ用途のわかる名前へ変更しました。PPTでの利用ページとPDFのページが必ず同一とは限らないため、台帳の配列はpptSlidesとしています。

画像68点をPowerPointから抽出してコンタクトシートで確認し、教材で使うロゴ・イラスト・汎用アイコン20点を共通フォルダーへ整理しました。未採用の背景・スクリーンショットは公開用フォルダーへ入れていません。抽出作業の一時ファイルはワークスペースのtmp/source-reviewにあります。

## 利用条件の情報

- Gitロゴ：Jason Long、CC BY 3.0。公式の配布ページを確認し、credits.htmlで帰属とライセンスを表示。
- GitHubロゴ：GitHubの商標・ロゴ使用指針を確認。対象サービスへのリンクとセットで、形状と色を変えずに使用。教材自身のブランドには使用しない。
- その他：提供者からフリー素材として利用可能との説明を受けた。元の画像内に作者・配布元を識別できるメタデータがなく、SVGからも配布元URLは確認できなかった。非営利という理由だけで特定のライセンスを推定せず、rightsにuser-provided-free-material-source-unidentifiedと記録。

配布元が分かれば素材を別途アップロードする必要はなく、manifestへ作者・元URL・ライセンスURLを追記します。新しい素材を追加する場合も、共通フォルダーと台帳を更新してください。

確認した公式資料（2026-10-15）：

- https://git-scm.com/community/logos
- https://git-scm.com/about/trademark
- https://docs.github.com/en/site-policy/other-site-policies/github-logo-policy
- https://brand.github.com/foundations/logo

「いらすとや」等の配布元は絵柄だけでは断定していません。同サイトの一般規約を、このPPTの全素材の利用条件として適用していません。
