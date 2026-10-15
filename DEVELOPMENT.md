# GitゼミのHTML教材

このリポジトリをHTML教材の編集元とします。Chapter 00〜08の全9章・79節を収録しています。元の108スライドの主題をWeb教材へ再構成し、指定されたPDFの重要ページの比較構造・図・演習を補っています。対応は authoring/source-alignment.md を参照してください。

## ローカルで確認する

リポジトリのルートで実行します。

```sh
node tools/serve.cjs
```

http://127.0.0.1:4173/git-seminar/ を開きます。GitHub Pagesと同じ /git-seminar/ 配下でCSS・JavaScript・SVGの相対パスを確認できます。終了は Ctrl+C です。

Markdownの保存・ファイル追加後にブラウザーを再読み込みすると、サーバーが内容を再生成します。サーバーの再起動は不要です。SVGと生成JSONはfetchで読み込むので、HTMLファイルのダブルクリックではなくHTTPサーバーから開いてください。Nodeはプレビュー・公開前の生成に使い、公開サイト自体は静的ファイルだけで動きます。

## GitHub Pagesに公開する

1. 最初の1回、リポジトリの Settings → Pages → Sourceに **GitHub Actions** を選びます。
2. content/内のMarkdown・JSONやSVGの変更をmainへcommit・pushします。
3. .github/workflows/pages.yml がMarkdownの生成・テスト・教材検証を実行し、docs/を公開します。Pull Requestでは検証だけを実行します。
4. 配信処理の完了後、Pages画面のURLから確認します。

ワークフローを用意した段階であり、GitHub側の設定変更や公開はこの変更では行っていません。従来のDeploy from a branch / main / docsを維持する場合は、push前に `node tools/check-content.cjs` を実行し、生成されたdocs/course.jsonもcommitします。その場合、GitHub側でMarkdownの自動生成は行われません。

標準の公開先は https://suzuyuyuyu.github.io/git-seminar/ です。公開の成否はGitHubのPages画面で確認してください。

docs/.nojekyll は静的ファイルをそのまま配信するためのファイルです。既存のPDF・設定資料はリポジトリに残し、今回の公開対象は docs/ のみとしています。

公式手順: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## 編集元とSSOT

| ファイル | 役割 |
| --- | --- |
| content/README.md | 執筆・ファイル追加・章追加の手順 |
| content/course.json | サイト全体のタイトル・説明 |
| content/番号-章/lesson.json | 章・レッスンの見出し、説明、既定のSVG、出典 |
| content/番号-章/番号-節.md | 1ファイル1節。本文、コマンド、要点、付箋、図の指定 |
| content/番号-章/graph.json | commitグラフのノード・参照・表示状態 |
| tools/build-content.cjs | 番号順にファイルを探索し、教材データを生成 |
| docs/course.json | 配信用の生成物。直接編集しない |
| docs/assets/record-flow.svg | 自学習と本番が共用する図 |
| docs/assets/version-history.svg | ファイルの複製・履歴管理・共有の導入図 |
| docs/commit-graph.js | 共通のcommit・branch・HEADデータからSVGを生成 |
| docs/app.js | 同じ教材から3種類の表示を生成 |
| docs/markdown.js・markdown.css | 本文・付箋のMarkdown表示 |
| docs/styles.css | 色・フォント・余白・画面幅別の配置 |
| docs/index.html | 表示の枠組み |
| authoring/CONTENT-NOTES.md | 原資料との対応と未収録項目 |
| authoring/foundations.md・collaboration.md・recovery.md | 追加した章の参照元・補完・操作前提 |

本文・要点・付箋はcontent/内のMarkdownを編集し、本番表示のために同じ文章を別ファイルへコピーしません。`### note-id [講義]` と書くと本番にも出ます。図はSVGを一度編集すれば両表示に反映されます。長い操作例を本番で抜粋する場合はfront matterのpresentation-linesで元のコマンドの行番号を参照し、コマンド文字列自体は複製しません。

番号付きのMarkdownを置くだけで節を登録します。章を増やす場合は番号付きの章フォルダーとlesson.jsonを追加します。一覧のJSやHTMLへ追記する必要はありません。HTMLは生成されたcourse.jsonを読み込みます。書式の詳細とテンプレートはcontent/README.mdを参照してください。旧content.js・lessons/*.js・curriculum.jsは編集元から外し、ワークスペースのtmp/markdown-migration/legacyに移行前の控えを保存しました。

commitグラフは章フォルダーのgraph.jsonにノード・親commit・branchの位置・HEADの参照先をまとめ、共通のSVG描画処理で表示します。状態ごとのSVG画像を別々にコピーして作りません。新しいレッスンはlesson.jsonのdiagram、またはgraphを指定し、同じ表示処理に載せます。

CSSはブラウザ標準のネスト記法を使います。Sassのコンパイルは不要です。コンポーネント内の子要素・状態・画面幅別の変更を近くにまとめて管理します。

図はSVGを編集元と公開形式にします。SVGにPNGやJPEGのスクリーンショットを埋め込んで置き換えません。原資料を確認するためのページ画像は公開せず、元PPTから抽出できたベクター素材を docs/assets/illustrations/ にまとめて参照します。素材の対応と出典状況は同フォルダーの manifest.json に記録します。自学習・本番・拡大表示は同じSVGと教材データを使います。

## 教材の整合性を確認する

```sh
node --test tools/build-content.test.cjs
node tools/check-content.cjs
```

全章の登録、重複ID、本文・要点・付箋のデータ形式、SVGへのパスと表示状態、commitグラフの参照先を検証します。教材を編集したらこの確認に加え、ブラウザーで自学習・本番の表示と縦画面を確認します。コマンドは説明用の例なので、この検証ではGit操作や認証を実行しません。

## 操作

自学習はスクロールに合わせて図の強調を切り替え、付箋を対応する説明の横に表示します。図の枠は16:9で、図の中央が画面の上下中央に来るよう追従します。図の種類によって文章の幅は変えません。縦長の図も全体を表示し、余白を残します。各節のリンクから直接参照できます。

本番は前後ボタン、左右キー、PageUp / PageDownで切り替えます。Home / Endで最初・最後へ移動できます。表示モードを変えても対応する説明を開けます。

ページに表示するコマンドは教材例です。ブラウザからGitを実行する機能はありません。
