# 指定されたPDF重要ページとHTML教材の対応

2026-10-15。元資料は presentation/git-seminar.pdf（88ページ）。以下の指定33ページを画像として目視し、図中の領域、矢印、比較、ラベル、演習の関係を教材へ反映した。PPTのスライド番号とは区別する。元と異なる技術的説明は個別メモに理由を残している。

編集元は同日にcontent/のMarkdown・lesson.json・graph.jsonへ移行した。下記や個別メモのcontent.js・foundations.js等は移行前の対応名。現在は番号付きの章フォルダー名で対応が分かり、書き方はcontent/README.mdを参照する。79節の本文・要点・コマンド・付箋・図の指定・graphの移行前後の一致を検証済み。

| PDFページ | 反映先 | 共通の図・データ |
| --- | --- | --- |
| 7–11 | 履歴管理をはじめる：保存、共有、3つの機能、差分、履歴 | version-history.svg / content.js |
| 15 | 学習の準備：SSH公開鍵認証のしくみ | ssh-authentication.svg / foundations.js |
| 21 | 変更を記録して共有する：作業ツリー、index、commit、push | record-flow.svg / content.js |
| 22・42 | 全体操作図、clone・fetch・pullの領域の違い、演習の振り返り | operation-map.svg / content.js・foundations.js |
| 52–59 | .git、objects、HEAD、commit前後、branchの成長と誤解 | branch-model.svg / branches.js / commit-graph.js |
| 61–65 | 第一親・第二親、複雑な分岐のクイズ、branch・HEADのまとめ | branches.js / commit-graph.js / branch-model.svg |
| 67–72 | branch作成、切り替え、編集、commit、push、PRの前後比較 | branches.js / branch-model.svg / commit-graph.js |
| 73–76 | 同じ行を変更した履歴、共通祖先、統合候補、merge時の競合 | collaboration.js / collaboration-integration.svg |
| 85 | rebaseとmergeの前後比較 | recovery.js / recovery.svg |

85ページはrebase。restoreの削除ファイル復元図は86ページを追加で確認して反映した。

## 個別の確認記録

- [導入7–11ページ](source-alignment-intro.md)
- [SSH認証15ページ](source-alignment-ssh.md)
- [Git内部とbranch52–72ページ](source-alignment-branches.md)
- [競合73–76ページ・rebase85ページ](source-alignment-conflict.md)
- [抽出した素材と出典](source-assets/README.md)

21ページは元の4領域を保ち、add・commit・pushが各領域へどう反映されるかを共通図の状態で切り替える。22・42ページはリモートのrepo A/B、fork、ローカルのリモート追跡ブランチ・branch・index・working tree・stash、clone・fetch・merge・pull・push・commit・add・stash/applyを同じ図へまとめた。原資料のinitの配置や装飾は完全な複写ではなく、initの説明と演習は個人演習章に置く。

公開用の図は編集可能なSVG。確認用のPDFページPNGを教材の図として貼り付けていない。原イラスト・ロゴ20点も元PPT内のSVGを使い、本文・本番・拡大表示で同じファイルを参照する。SVGの中にPNG等を埋め込んでベクターとして扱うことも避ける。

## 統合確認

- node tools/check-content.cjs：9章・9レッスン・79節のデータ、SVG参照、状態、commit参照を検証。
- 1366×768の講義表示で79節を巡回。図の表示状態、SVG内の文字の欠け、ページ横溢れを確認。
- 390×844の自学習表示で79節を巡回。表示図と本文の位置、目次の現在節、ページ横溢れを確認。
- 全体図・複雑な親参照クイズ・SSHの縦画面を目視し、全体図の拡大表示も確認。

今後は本メモに対応を追記しながら元資料との一致を詰め、その後に追加内容とデザインを磨く。章数や節数は達成率の代わりにしない。
