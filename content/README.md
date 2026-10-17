# 教材を追加・編集する

このフォルダーが教材の編集元です。階層は **Chapter → Section → Slide（Step）** で、Sectionごとに1ページ、Markdown 1ファイルが1Stepです。本文・講義の要点・付箋・図の指定を同じファイルに書きます。

## 既存のStepを編集する

例：`01-solo/03-essential/stage.md` の本文や「## 要点」を変更します。リポジトリのルートで `node tools/serve.cjs` を実行し、[ローカルプレビュー](http://127.0.0.1:4173/git-seminar/)を開きます。保存後にブラウザーを再読み込みすると反映されます。自動リロードはありません。

## 3階層と順序

```text
content/
  course.json
  01-solo/
    chapter.json
    03-essential/
      section.json
      stage.md
  graphs/
    branches.json
  diagram-models.json
```

Chapterは番号付きフォルダーの数値順です。`chapter.json` の `sections` には、Chapter直下のSectionフォルダー名を表示順に並べます。

```json
{
  "id": "solo",
  "title": "個人開発を管理しよう",
  "sections": ["01-motivation", "02-flow", "03-essential", "04-basic", "05-practice", "06-summary"]
}
```

Sectionの `section.json` は見出し・既定図・出典・Step順を持ちます。`steps` には同じSection直下のMarkdownファイル名を並べます。ファイル名に順序番号は不要です。

```json
{
  "id": "essential",
  "title": "Gitコマンド（超基本）絶対に覚える",
  "diagram": { "type": "svg", "src": "assets/record-flow.svg" },
  "sources": [{ "label": "Git add", "url": "https://git-scm.com/docs/git-add" }],
  "steps": ["clone.md", "stage.md", "commit.md", "push.md", "pull.md", "status.md"]
}
```

Chapter IDは教材全体、Section IDはそのChapter内、Step IDはそのSection内で一意にします。別Chapterに同名のSectionを置けます。付箋IDは同じSection内で重複させません。

## Stepを追加・並べ替えする

1. 既存のStep、または `_templates/step.md` をSectionへコピーします。
2. `id` をSection内で重複しない名前にし、`title`、本文、「## 要点」を書きます。
3. `diagram` と `state` で図と表示状態を指定します。
4. 同じSectionの `section.json` の `steps` にファイル名を追加します。
5. 保存してブラウザーを再読み込みします。

順序を変えるには `steps` の行を移動します。未登録のMarkdownは下書きとして除外し、ターミナルに `steps未登録` と通知します。README.mdは執筆メモとして扱い、通知しません。`_templates/` はChapterとして公開されません。

登録済みファイルの欠落、一覧の重複、フォルダー外へのパスはエラーになります。非公開にする場合は一覧から外し、旧URLの転送先も確認してください。

## Markdownの書式

先頭の `---` で囲む設定は、以下のキーだけを扱う簡単な書式です。YAML全体の機能には対応していません。titleは通常の文字列かJSON形式のダブルクォート付き文字列で書けます。

| 設定 | 意味 |
| --- | --- |
| id | StepのURLに使うID。半角英数字とハイフン |
| title | 見出し |
| state | 図の状態。省略時はStep ID |
| diagram | docs基準のSVGパス、または `commit-graph`。省略時はSectionの既定図 |
| presentation-lines | 講義のコマンド抜粋。0始まりの行番号、例 `0, 2, 3`。省略時は全行 |
| wide | true / falseの互換設定。文章幅を変える設定には使わない |

本文では段落、太字、インラインコード、リンク、見出し、箇条書き、番号付きリスト、引用、コードブロックを使えます。入れ子リスト・表・HTML・画像記法には対応していません。図は `diagram` で指定します。

- **## 要点**：必須。図の下の説明と講義の大きな要点に共用する、書式なしの短い文章です。
- **## コマンド**：任意。1つのコードブロックで囲みます。
- **## 付箋**：任意。`### note-id` で区切り、`### note-id [講義]` とすると講義にも表示します。

これらと完全に一致する見出しは特別な領域の区切りになります。コードブロック内の見出しは区切りになりません。

## 文章と図をつなぐ

```text
---
id: stage
title: 次の記録に含める内容を選ぶ
state: stage
diagram: assets/record-flow.svg
---
```

`diagram` は公開SVGを選び、`state` はSVGの `data-state="stage"` に対応します。表示側が `data-current-state` を設定し、SVG内のCSSで強調を切り替えます。状態を持たないSVGは全体をそのまま表示します。自学習のスクロールと講義の前後移動は、どちらもStep単位で図を切り替えます。段落の途中で切り替えたい場合はStepを分けます。

動的commitグラフでは、Stepに `diagram: commit-graph` と `state: objects` のように記入します。Sectionの `section.json` に次を追加します。

```json
"graph": "graphs/branches.json"
```

このパスは **contentルート基準** です。Sectionフォルダー基準ではありません。`state` は指定JSONの `states` のキーです。共通のノード・親子関係・参照を使い、Stepごとに画像を複製しません。

追加図 `curriculum-guide.svg` の文言や構造は `content/diagram-models.json` を編集し、`node tools/build-curriculum-diagrams.cjs` で生成します。`branch-model.svg` と `collaboration-integration.svg` は `tools/build-diagrams.cjs` を編集して `node tools/build-diagrams.cjs` で生成します。生成対象以外のSVGは `docs/assets/` 内で直接編集します。

## Section・Chapterを追加する

SectionはChapter直下にフォルダーを作り、`section.json` とStepを置いて、Chapterの `chapter.json` の `sections` に登録します。Chapterは番号付きフォルダーと `chapter.json` を作ります。HTMLやJavaScriptへの目次追記は不要です。指定された章・Section順を変更する場合は教材構成のテストも確認します。

## URLと旧リンク

正規URLは `#study/chapter-id/section-id`、特定Stepは `#study/chapter-id/section-id/step-id` です。講義は `#present/chapter-id/section-id/step-id` を使います。ファイル名や表示順を変えてもIDが同じならURLは変わりません。

IDの変更やStepの移動では、`content/course.json` の `redirects` を更新します。キーは旧URLのモードに続く部分、値は存在する `chapter/section/step` です。たとえば `"review-and-resolve/markers": "collaboration/hands-on/markers"` と登録します。

## 公開前の確認

```sh
node --test tools/build-content.test.cjs
node tools/check-content.cjs
```

`docs/course.json` は生成物なので直接編集しません。図モデルを変えた場合はSVGも再生成します。変更したSectionを自学習・講義・縦画面で目視してください。公開手順は [DEVELOPMENT.md](../DEVELOPMENT.md)、原資料との対応は [chapter-structure.md](../authoring/chapter-structure.md) を参照してください。
