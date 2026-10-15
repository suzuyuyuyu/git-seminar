# 共同開発：教材の根拠と講師向けメモ

## 編集する場所

本文・コマンド・付箋・本番用の短い要点の正本は `docs/lessons/collaboration.js`。この文書に本文を複製しない。図の正本は `docs/assets/collaboration-planning.svg` と `docs/assets/collaboration-integration.svg`。各節の `diagramState` と同名の `g[data-state]` を表示する。自学習用と本番用で図や説明を別々に更新しない。

SVGは520×500。各状態を単独表示し、標準CSS nestingをSVG固有クラスで囲む。文字は22px以上、切り替え時の移動やアニメーションは付けない。履歴図は古いコミットが下、新しいコミットが上。丸がコミット、灰色線が親子関係、四角が一つのコミットを指すブランチ、赤いHEADが現在のmainを示す。

長い準備手順は `command` に全文を一度だけ持ち、`presentationCommandLines` で本番表示に使う行を参照する。0始まりで、publishは[1,2,4,8]、conflict-setupは[2,6,10,14]。全文の行を増減した場合は参照番号も確認する。本番用の抜粋だけでは実習を再現できないため、自学習の全文を使う。

## 第05章：共同開発の準備とIssue

| 節／図の状態 | 学習者が確認すること | 講師が補う例 |
| --- | --- | --- |
| readme | 環境と実行手順がわかる | 初めて開いた人は何から困るかを聞く |
| ignore | 未追跡の除外と既存の履歴を区別する | 生成物と研究データで保存方針が違う理由 |
| license | 権限と研究室の方針を確認する | 外部由来コードと自作コードの区別 |
| markdown | 見出し、箇条書き、コードを分ける | ソースとプレビューを並べて見る |
| issue | 目的、現状、完了条件を共有する | READMEへのプロフィール追加を題材にする |
| workflow | Issue・ブランチ・PRのつながりを説明する | 次章のブランチ作成へつなぐ |

演習案：Issue本文の草案をまず手元で書く。目的と完了条件を隣の人に読んでもらい、実装せずとも必要な説明が揃っているか確かめる。実際のIssue投稿は講師の指示と練習用リポジトリの権限を確認してから行う。

## 第07章：Pull Requestと競合解消

| 節／図の状態 | 学習者が確認すること | 講師が補う例 |
| --- | --- | --- |
| publish | 別clone・同期済みmainからfeature/pr-demoを作り、pushとPR作成を分ける | base／compare、GitLabのtarget／source |
| review | 目的と差分を照合する | 同じブランチへの追加pushでPRも更新される |
| sync | サービス上の統合後、ローカルmainを更新する | --ff-onlyが停止する場合は状態確認へ戻る |
| conflict-setup | 別フォルダで初期commitと双方の挨拶変更を作る | PR統合済みの履歴とは分ける |
| diverge | 同じ挨拶を双方で変更した履歴を読む | Gitには表示したい挨拶の意図がわからない |
| markers | HEAD側と取り込み側を識別する | この例の現在ブランチはmain |
| resolve | 完成形を人が編集する | 片方採用、両方採用、新しい表現の比較 |
| record | add、commit、状態と動作の確認 | 2つの親を持つmerge commit |
| alternatives | 中止とGitHub上の解消を使い分ける | GitHub上の競合解消はbase→headの方向 |

前提：第06章のブランチを理解してから読む。第06章の図例ではローカルmainが進んでいるため、その履歴をPR例へ続けて使わない。PR作成は書き込み権限がある練習用リポジトリを別の場所へcloneし、mainをorigin/mainへ同期した状態から始める。作業ブランチはfeature/pr-demo。競合解消の後半は、別の新規フォルダgit-seminar-conflict-demoへinit -b mainし、初期hello.pyをcommit、feature/nameで日本語へ変更commit、mainへ戻り英語の別挨拶へ変更commitという具体的な準備を本文に用意した。すでにPRを統合した履歴で続けてmergeしても、この競合例は再現しない。実際の共有mainを直接更新する手順として使わない。

競合の例は共通祖先が `Hello, world!`、mainが `Hello, everyone!`、作業ブランチが `こんにちは！`。完成形の例は `みなさんこんにちは！`。greet関数の定義だけでは表示されないため、確認コマンドは関数を明示的に呼ぶ。教材作成時に利用者のGit履歴を操作する必要はない。

## 元資料との対応

- `ppt-src.pptx` のスライドXMLを読み、`presentation/git-seminar.pdf` の同番号ページ45〜51・72〜86をpdftoppmでPNG化して確認した。
- 45〜51：共同開発の入口、README／.gitignore／LICENCE、Issueの問題提起・議論・担当、GitHub/GitLabの画面、プロフィール追加演習、Markdownのソースと表示の意味を再構成した。画面のスクリーンショットを写す代わりに、役割と順序をSVGにした。
- 72〜81：PR/MRの役割、分岐後に双方で挨拶を変更する図、競合表示、複数の解消案、add→commit、merge後の履歴図の意味を再現した。元資料の色分けそのものは引き継がず、共通の静かな配色と緑コミット／灰色親子線を使う。
- 82〜86：branch・switch・rebase・restoreの補足。第07章では競合解消の流れに絞り、各コマンドの全オプションを重複掲載しない。rebase等は発展章へ任せる。
- PPTとPDFで、ここで扱う主題・手順・挨拶例に意味上の食い違いは見当たらなかった。挨拶中の半角 `!` と全角 `！`、分割テキストの空白は元資料内で表記揺れがある。教材では日本語挨拶を全角 `！` に統一した。
- 元資料の作業ブランチ名 `feat/ja`・`feat/name` を、競合例では `feature/name` に統一した。PR例は別履歴だとわかるよう `feature/pr-demo` を使う。原資料の `git graph` は独自aliasなので、教材では標準コマンド `git log --graph --oneline --decorate -8` を使う。
- 第05章にREADMEの再実行手順、既追跡ファイルの注意、研究データの保存方針、権限確認、Issueの完了条件を補った。第07章にpush・base/compare・レビュー・統合後のpull、--abortとブラウザでの解消の取り込み方向を補った。

## 公式資料の確認

各章の `sources` に公式URLを記録。Gitのgitignore／push／pull／merge、GitHubのREADME／ライセンス／Markdown／Issue／PR／ブラウザの競合解消、GitLabのMR資料を確認した。特に、.gitignoreは既追跡ファイルに効かないこと、--ff-onlyが履歴の分岐時に停止すること、merge --abortが未コミット変更を常に復元できるわけではないこと、GitHub上の解消がbaseをhead側へ取り込むことを本文へ反映した。
