# GitゼミのHTML教材

教材は **Chapter → Section → Slide（Step）** の3階層です。Sectionを1ページとし、その中のStepを自学習では順に読み、講義では1枚ずつ表示します。現在の5章構成と原資料の対応は [authoring/chapter-structure.md](./authoring/chapter-structure.md) に記載しています。

## ローカルで確認する

リポジトリのルートで実行します。

```sh
node tools/serve.cjs
```

[ローカルプレビュー](http://127.0.0.1:4173/git-seminar/)を開きます。終了はCtrl+Cです。Markdown・JSONの保存後にブラウザーを再読み込みすると教材データを再生成します。SVGもHTTP経由で読み込むため、HTMLのダブルクリックではなくサーバーから開いてください。公開サイトは静的ファイルだけで動きます。

自学習の正規URLは `#study/chapter-id/section-id`、Stepを指定する場合は `#study/chapter-id/section-id/step-id` です。講義は `#present/chapter-id/section-id/step-id` です。旧URLは `content/course.json` の `redirects` で新しいStepへ転送します。

## 編集元と生成物

| ファイル | 役割 |
| --- | --- |
| content/course.json | サイトのタイトル・説明・旧URLの転送先 |
| content/NN-chapter/chapter.json | Chapterの見出し、Sectionフォルダー名の順序 |
| content/NN-chapter/NN-section/section.json | Sectionの見出し・既定図・出典、Stepファイル名の順序 |
| content/NN-chapter/NN-section/step.md | 1ファイル1Step。本文・コマンド・要点・付箋・図と状態 |
| content/graphs/branches.json | commitグラフのノード・親子関係・表示状態 |
| content/diagram-models.json | 追加図のタイトル・カード・矢印などのモデル |
| tools/build-content.cjs | Markdown・JSONからschema v2の配信データを生成 |
| tools/build-curriculum-diagrams.cjs | diagram-models.jsonからcurriculum-guide.svgを生成 |
| tools/build-diagrams.cjs | branch-model.svgとcollaboration-integration.svgを生成 |
| docs/course.json | 配信用の生成物。直接編集しない |
| docs/assets/ | 公開SVGと共通イラスト |
| docs/commit-graph.js | commitグラフを共通データから描画 |
| docs/app.js | 教材の目次・自学習・講義表示 |
| docs/markdown.js・markdown.css | 本文・付箋のMarkdown表示 |
| docs/styles.css・index.html | 配置・見た目と表示の枠組み |

追加・並べ替え・Markdown書式は [content/README.md](./content/README.md) を参照してください。本文・コマンド・図を自学習と講義用に複製せず、同じStepを使います。講義のコマンド抜粋には `presentation-lines`、付箋には `[講義]` を指定します。

図の編集元に応じて再生成し、生成されたSVGもcommitします。

```sh
node tools/build-diagrams.cjs
node tools/build-curriculum-diagrams.cjs
node tools/build-content.cjs
```

生成対象以外のSVGはSVG自体を編集します。公開図にPNGやJPEGのスクリーンショットを埋め込みません。元PPT由来のベクター素材は `docs/assets/illustrations/` にまとめ、対応と出典を `manifest.json` に記録しています。比較図の調整記録は [authoring/diagram-refinement.md](./authoring/diagram-refinement.md) にあります。

## 整合性を確認する

```sh
node --test tools/build-content.test.cjs
node tools/check-content.cjs
```

Chapter・Section・Stepの順序、各階層のID、未登録の下書き、パス逸脱、旧URLの転送先、本文・付箋・コマンド、SVGの状態、commitグラフと出典参照を検証します。チェックは教材例のGit操作や認証を実行しません。

文章や図を変えたら、影響するSectionの自学習・講義・縦画面をブラウザーで確認してください。生成データの検証だけでは、文字の欠けや配置の読みやすさを保証できません。

## GitHub Pagesに公開する

1. リポジトリのSettings → Pages → Sourceで **GitHub Actions** を選びます。
2. 編集元・生成SVGの変更をmainへcommit・pushします。
3. `.github/workflows/pages.yml` が生成・テスト・教材検証を実行し、`docs/` を公開します。Pull Requestでは検証を行います。
4. 配信の完了と公開URLをGitHubのPages画面で確認します。

従来のDeploy from a branch / main / docsを使う場合は、push前に `node tools/check-content.cjs` を実行し、生成された `docs/course.json` もcommitします。標準の公開先は [Git seminar](https://suzuyuyuyu.github.io/git-seminar/) です。`docs/.nojekyll` は静的ファイルをそのまま配信するためのファイルです。

## 表示の操作

自学習では同じSection内のStepへスクロールすると図の状態が切り替わります。講義は前後ボタン、左右キー、PageUp / PageDownで切り替え、Home / Endで最初・最後へ移動します。表示モードを変えても対応するStepを参照します。表示されるコマンドは教材例で、ブラウザーからGitを実行する機能はありません。
