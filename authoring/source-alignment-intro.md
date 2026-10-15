# 導入：元PDF7〜11ページとの対応（70%段階）

## 実際に確認した資料

`tmp/source-review/pages/page-07.png`、`page-08.png`、`page-09.png`、`page-10.png`、`page-11.png` を `view_image` で全て画像として確認した。1600×900の原ページ画像に見える内容と配置を基準に編集した。元PDF・PPTは変更していない。

元PPTの各スライドのrelationshipsも確認し、page7のGitロゴ＝image10.svg、人物＝image13.svg、page9の3役割＝image20.svg・image21.svg・image22.svgという対応を確認。親が整理した `assets/illustrations/` の同一素材をSVGのimage参照に使う。base64の複製は残さない。

## ページ別の観察と反映

| PDF | 画像で確認した内容 | HTML・SVGへの対応 |
| --- | --- | --- |
| 7 | Gitロゴ、「コードの履歴を管理するツール」。左に緑枠、青い丸角のセーブデータ1・2・3が縦につながる。3つから右上のcommitの語へ線。右下にPCで作業する人物。 | 先頭 `save-data`。3段のセーブデータ、接続線、3本のcommitへの引出線、人物の左右関係を維持。元のGitロゴと人物イラストを再利用。 |
| 8 | 上にGitHub・GitLab・Bitbucket。中央上にクラウドとリポジトリ、下の3つのPCへ双方向の線。各ローカルにも小さなリポジトリ。右に競合・merge・branchの説明。 | `sharing`。中央リモート→3ローカルのhub構造、双方向の線、各PCの小さな履歴記号を保持。GitHubロゴは原素材を使いリンクを付与。競合と統合・独立した編集は本文と図下段へ置いた。人物は現在のSVGではPC 1/2/3のラベルとPC記号に置換しており、人物3種の完全再現は未対応。 |
| 9 | DVCSの説明の下に、左からバージョン管理・状態の復元・共同開発の3列。列ごとの説明と下段に3枚のイラスト。 | `dvcs`。3列の順序と役割、緑の下線、原イラスト3枚の対応を保持。DVCSの語は表示、正式な英語の展開は省略。詳しい説明は共通本文へ配置。 |
| 10 | 上段「作成する」：おはようございます／こんにちわ、ファイル名は挨拶.txt。下段「編集する」：おはようございます／こんにちは／こんばんは、ファイル名は挨拶_修正版.txt。修正行が青、追加行が緑。両方のファイルが右のPCへ向かう。 | `copies`。初版の2行、修正版の3行、誤字修正と行追加、2つのファイル名、変更色を省略せず表示。内容→ファイルの矢印と、両ファイル→同じPCという関係を維持。原図の操作人物は「作成する」「編集する」のラベルに置き換えた。 |
| 11 | 左に4列×2行の8フォルダー。Code_origin、Code_v01、Code_v02、Code_v02_edit、Code_v02_sato、Code_v03、Code_v03_02、Code_v3_latest。右はrepositoryと5commitの縦列、下にCodeフォルダー。「履歴がひとつにまとまる」「いつ何を変更したか残せる」。 | `repository`。導入前を左、導入後を右とする対比、8つ全ての元フォルダー名、5つ全ての元メッセージ、一本の履歴、下のCodeを維持。650px幅に合わせて左の格子だけ2列×4行に折り返す。メッセージは省略せず複数行へ折り返した。 |

PDF11の履歴は上から `fix: handle with exception in the new algorithm; close #1`、`remove: delete iranai.py`、`feat: add new algorithm`、`feat: make do loop sentence`、`init: add original code`。元図の上が新しい縦配置を保持した。原資料の英語表現をこの段階では言い換えていない。

## 説明の補正

- セーブデータは比喩であり、エディターの保存だけではcommitにならないことを付箋と本文で補足。
- GitHubを単なるバックアップツールと断定せず、履歴を置き共同開発を支えるサービスと説明。手元の未送信の履歴や未commitの編集まですべて自動保存されるわけではない。
- 復元できる範囲は記録に依存する。未commitの編集を必ず取り戻せると読める説明は避けた。
- 原図のcommitメッセージのprefixは必須のGit仕様ではなく、説明例であると付箋に記載。

## SSOTとファイル構成

本文・要点・付箋は `docs/content.js` の `why-version-control` に1回だけ定義。元資料順の5節と、`version-history.svg` の5状態を一致させた。SVGはrootの `data-current-state` と内部の `g[data-state]` で切り替え、アニメーションは使わない。CSSはCDATA内の標準nesting、図中の文字は22px以上。

旧 `commit-branches` レッスンオブジェクトはcontent.jsから削除し、別担当の `docs/lessons/branches.js` へ移行する前提。Chapter 06の目次項目は保持。既存 `record-changes` 本文は今回の担当では変更していない。

## 残る70%段階の差

原図の意味と内容の対応を優先した。余白や装飾、人物の配置、ページ9の英文DVCS展開、ページ11の4列格子は完全な紙面再現ではない。図の長い英文は22pxを保つため改行している。ブラウザー側のSVG画像URL解決とアクティブ状態への表示領域調整は親側の統合処理を使用する。
