# Gitゼミ教材の編集メモ

## 今回の範囲

元資料はワークスペース直下の `ppt-src.pptx`（108スライド）。PowerPoint内のXMLテキストと同梱PDFの図を参照し、原本は変更していない。HTML教材はChapter 00〜08の全9章を収録する。スライドごとの複製ではなく、主題を説明・要点・付箋・SVG図に再構成した。参考PDF `presentation/git-seminar.pdf` も変更していない。

編集元は2026-10-15に `content/` へ移行した。本文・要点・付箋はMarkdown、章の設定と節の並び順（sections）はlesson.json、Chapter 06のノード・親子関係・branchとHEADはgraph.jsonに一度だけ定義する。2026-10-16にMarkdownファイル名の番号を外し、lesson.jsonのsections配列による順序指定へ移行した。tools/build-content.cjsがdocs/course.jsonを生成し、自学習と本番は同じtakeawayとnotesを参照する。本番の付箋はMarkdownの `[講義]`、図とその状態は先頭設定のdiagramとstateで選ぶ。手順はcontent/README.mdを参照。下記の個別作成メモに旧JSファイル名がある場合は移行前の実装名である。

## 元スライドとの対応

| 試作・Chapter | 主な元スライド | 編集内容 |
| --- | --- | --- |
| 00 学習の準備 | 2、15–20 | インストール・アカウント・SSH・Git設定を事前準備にまとめる |
| 01 履歴管理をはじめる | 6–14 | 動機、バージョン管理、Gitとホスティングサービスの役割 |
| 02 変更を記録して共有する | 6、21–23、26–28、31、41–42 | 4領域の全体図とadd→commit→pushを、ひとつの変更の流れに再編集 |
| 03 状態を確認し、履歴を取得する | 24–25、30–31 | status・clone・fetch・pullを確認と取得の観点で整理 |
| 04 自分のコードで試す | 33、39–43 | リポジトリ作成から記録・共有までの演習 |
| 05 共同開発の準備とIssue | 45–51 | README・.gitignore・ライセンス・Issue・Markdown |
| 06 commit・branch・HEAD | 52–71、83–84 | 履歴の構造とブランチ操作 |
| 07 Pull Requestと競合の解消 | 72–81 | 提案・統合・競合解消の例 |
| 08 復元・退避と発展事項 | 32、34–38、82、85–86、89–103 | 日常操作と発展事項を必要に応じて参照 |

4節の対応は、working tree＝スライド21・31（編集例は69も参考）、stage＝21・26・31、commit＝21・27、push＝21・28。付箋の「commitは手元」「pushは記録済みの履歴」はスライド6・21・41の説明を短くした。

## 元資料から補った説明

- 口頭説明の録音や完全な台本は提供されていない。本文は元スライドの情報を文章に編集した草案であり、発表者の発言を文字起こししたものではない。
- 試作全体で同じ `hello.py` を使い、挨拶を `Hello, world!` から `Hello, everyone!` に変更する例を導入した。元資料の競合解説（74–81）にもhello.pyと挨拶の変更が登場するが、今回のadd→commit→pushの連続例は新しく構成した。
- Chapter 02の図はclone済み・mainで作業・origin設定済み・push可能という前提を置く。初回の認証はChapter 00、作成から共有までの実習はChapter 04に記載した。
- 「add時点の内容をindexへ反映」「add後の追加編集は再度addが必要」「commitにindexの状態が含まれる」を補足した。indexを単なるファイル置き場や、addをファイルの移動と誤解させないため。
- commitのメタデータとメッセージの目的を短く補った。実装上の圧縮・差分保存の説明には踏み込んでいない。
- push例を `git push origin main` に限定した。設定依存の既定値やforce系オプションを基本手順に含めていない。
- pushが拒否される可能性を補足したが、解決手順は後続章に回した。

## 追加した章と今後の確認

Chapter 00・03・04の追加内容は[foundations.md](./foundations.md)、Chapter 05・07は[collaboration.md](./collaboration.md)、Chapter 08は[recovery.md](./recovery.md)に対応元と補完事項を記載する。原本の空白や図素材だけの末尾スライドは独立した章として扱っていない。付録・コマンドオプションは主な用途へ絞って再構成し、全オプションの辞書は目指さない。

SSH認証、reset/restore、force-with-lease、HEADとswitchなどは公式資料を確認して原本の単純化を修正した。図・本文は発表者の口頭説明の録音ではなく教材用の草案である。ゼミの時間配分や研究室の運用方針は発表者に合わせて調整する。

## Chapter 01・06の追加編集

Chapter 01はスライド7–13を中心に、ファイル複製の悩み（10–11）、commitで履歴を残すこと（7・9・11–12）、Gitとリモートサービスの違い（8・13）の3節へ再構成した。ファイル名の例、説明の順序、付箋の文言は教材用に編集した。原本の「GitHub＝バックアップ」の単純化は、リポジトリのホスティングと共同開発を支えるサービスという説明にした。`diagramState` は `copies`・`history`・`sharing`。

Chapter 06はスライド52–71、83–84を中心に、履歴→branch作成→switch→feature側commit→main側commit→mergeの6節へ整理した。親が確認済みの参考PDF画像は54・58・59・64・70で、PPTの同番号テキストと対応している。mergeの説明はスライド37・72も参照した。c1・c2・c3・f1・m1・mergeというノードと具体的な6段階は、原本の概念図をもとに新しく構成した説明例であり、実リポジトリのログではない。

原本の「HEAD＝commitのポインター」という簡略化は、通常の作業で `HEAD → branch → commit` になる説明に改めた。HEADがcommitを直接指すdetached HEADもあることは付箋で補足する。作成だけでは切り替わらないこと、switch自体はcommitを作らないこと、commit時に現在のbranchだけが動くことを明示した。切り替え前は `git status` で未記録の変更がない状態を確認する前提とした。初学者が未記録の変更を持ち越す挙動に混乱しないための教材上の前提であり、未記録の変更があると常にswitch不可という意味ではない。

`main-commit` はmainに戻って別の変更をcommitした後の状態を示し、単一操作のコマンドは表示しない。最後は両branchが共通のc3から別々に進んだ例なので、non-fast-forwardのmergeとして2つの親を持つcommitを示す。常にmerge commitができると誤解させないよう、fast-forwardの場合を付箋で補足した。競合せず統合できる例に限定する。

確認に用いたGit公式サイトのPro Git（2026-10-14閲覧）：

- [Branches in a Nutshell](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)：branchの目印、HEADが現在のbranchを指すこと、作成と切り替えの区別、commitで現在のbranchが進むこと、switchの用途を確認。
- [Basic Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)：切り替え前のclean状態、分岐した履歴のmerge commit、fast-forwardとの違いを確認。

図・本文・付箋は説明用の草案であり、口頭説明の文字起こしではない。本文の長さやゼミでの問いかけは、発表者による確認後に調整できる。
