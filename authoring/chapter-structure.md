# Chapter構成と原PPTの対応

2026-10-18に、ワークスペース直下の `ppt-src.pptx` を読み、108枚すべてのスライドXMLからテキストを抽出できた。確認用テキストはワークスペースの `tmp/ppt-outline-20261018.json` にある。元PPTは変更していない。同梱の `presentation/git-seminar.pdf` は88ページであり、PPT末尾のTips案・補助図を含む全体と同一ではない。

教材は **Chapter → Section → Slide（Step）** の3階層へ再構成した。Sectionごとにページを分け、Stepは内容の重さと図の切り替えに合わせて分割する。2026-10-18の配置修正後は5 Chapter・23 Section・111 Step。ファイル数や節数を完成度の指標にはしない。

## 指定された章とSection順

| Chapter | Sectionの順序 |
| --- | --- |
| はじめに | 学習の準備 → まずは結論 |
| 個人開発を管理しよう | Git導入のモチベーション → Git管理の流れ → Gitコマンド（超基本）絶対に覚える → Gitコマンド（基本）調べながら使えるようにしておく → Gitを試してみよう → 前半のまとめ |
| Gitの難関 “branch” を理解する | Gitの仕組みを知ろう → commit/branch/HEADとはなにか？ → detached HEADについて知ろう → まとめ |
| 共同開発を管理しよう | Markdownを書こう → Issueを立てよう → ハンズオン（Pull request、merge、Conflict） → Gitコマンド（標準・ブランチ周辺） |
| その他Tipsから少しむずかしいところまで | worktree → submodule → conflict周辺のいろいろ → Git管理していてもコードが消えてしまうケース → Git configエイリアスの設定とシェルスクリプトのエイリアス → Gitコマンド（応用） → ghコマンド |

Sectionは依頼された主題・順序に対応する。標準コマンドのSection内ではbranch・checkout/switch・rebase・restoreの順にStepを並べる。応用コマンドのSection内ではlog・diff・show・blame、remote・fetch、revert・reflog、tag・相対参照、bisectを扱う。今回移動したページの旧URLも `redirects` で新しいStepへ転送する。見出しの正本は各 `chapter.json` と `section.json` に置く。

## PPTとの対応

| 現在の範囲 | 主なPPTスライド | 引き継ぐ内容と変更 |
| --- | --- | --- |
| 学習の準備・まずは結論 | 2–3、6、15–20 | ことわり、質問とハンズオン、Git設定、SSH設定・認証確認。履歴管理と共有の結論を独立Sectionへ |
| 個人開発の動機と流れ | 7–13、21–23、42 | セーブデータ、コピーの増殖、OneDriveとの違い、4領域と全体操作図 |
| 超基本コマンド | 24–31 | clone / add / commit / push / pull / status。用途と状態変化を順に説明 |
| 基本コマンド | 32–38 | init / reset / clean / stash / merge / cherry-pick。stashの各操作は追加Stepで分割 |
| 個人演習とまとめ | 39–43 | GitHub新規repo→SSH clone→ファイル作成→add/commit/pushを主経路に修正。挨拶ファイルの2回の変更を練習 |
| Gitの内部・branch概念 | 52–65、93–103 | .git、snapshotと親、HEAD、branchの成長、線ではなく1commitへの目印、第一親と第二親、相対位置のクイズ、detached HEAD |
| Markdown・Issue | 46–51 | README/.gitignore/LICENSE、問題提起・議論・担当、READMEへのプロフィール追加のIssue、Markdownの記述 |
| PRと競合ハンズオン | 67–81 | clone→branch→switch→プロフィール追記→commit/push→PR。hello.pyの挨拶の競合、共通祖先、統合候補、修正→add→commit |
| branch周辺のコマンド | 82–86 | branch / checkout・switch / rebase / restore。mergeとrebaseの前後図、復元対象の区別 |
| 応用とTips | 29、89–103と新規補筆 | alias、worktree、末尾のreset・reflog等の補助例。具体的手順や新しい主題は補足教材として追加 |

PPT 89はworktree・submodule・競合・コード消失の主題一覧、90–91は主にworktreeの導入で、多くのTipsは本文が未完成である。submoduleの更新、stash/rebaseでの競合、未commit変更の消失、Gitとシェルのalias、gh、bisectなどの説明はPPTの全文転載ではなく補筆を含む。元発表の口頭説明の文字起こしではない。

SSH認証はPPT 15の暗号化・復号図をそのまま写さず、公開鍵による署名検証の説明を使う。resetのpath形式、stash適用、fast-forward、force-with-lease、switch --detach、rebase時のcommit IDの変化も原資料の単純化を補う。

『グラフはbranchと親commitだけ』は、選んだ参照から親をたどって到達できるcommitを描く、と説明する。出発点はHEADやtagなどにもなり、未commitの編集はグラフには出ない。

## 編集元とリンク

- Chapterの `chapter.json` の `sections` はSectionフォルダー名の配列。Sectionの `section.json` の `steps` はMarkdownファイル名の配列。どちらも配列の順序が表示順。
- graphの指定 `graphs/branches.json` はcontentルート基準。本文・図・コマンドの自学習用と講義用の複製は作らない。
- 正規リンクは `#study/chapter/section[/step]`。旧リンクの転送先は `content/course.json` の `redirects` に集約する。
- `tools/build-content.cjs` が `docs/course.json` を生成する。
- `content/diagram-models.json` を `tools/build-curriculum-diagrams.cjs` が読み、`docs/assets/curriculum-guide.svg` を生成する。
- `branch-model.svg` と `collaboration-integration.svg` の編集元は `tools/build-diagrams.cjs`。他の既存SVGや動的commitグラフと併用する。

執筆手順は [content/README.md](../content/README.md)、生成・公開は [DEVELOPMENT.md](../DEVELOPMENT.md) を参照する。過去のPDF図の対応は [source-alignment.md](./source-alignment.md)、図の再調整記録は [diagram-refinement.md](./diagram-refinement.md) に残す。これらにある旧Chapter名・旧ファイル構成・検証件数は当時の記録として読む。

## 検証記録

schema v2テストと整合性検証では、5章・23 Section・111 StepのID・順序・ファイル・転送先・SVG状態・graph参照を確認する。目視確認は別途必要であり、この記録だけで全Stepの視覚的な完成を示すものではない。
