<h1 align='center'> Git seminar </h1>

研究室のGitゼミ教材です。編集元は `content/` のMarkdownとJSON、公開ページは `docs/` に置き、自学習用とゼミ本番用で本文・図・要点を共有します。

**Chapter → Section → Slide（Step）** の3階層で構成し、Sectionごとにページを分けます。「はじめに」「個人開発を管理しよう」「Gitの難関 “branch” を理解する」「共同開発を管理しよう」「その他Tipsから少しむずかしいところまで」の5章を収録しています。標準・ブランチ周辺のコマンドは共同開発のSection、応用コマンドはTipsのgh直前のSectionです。

Chapter 03の最後に「00〜03の全まとめ」を置き、準備・記録と共有・ブランチ・共同開発を5枚で振り返ります。

## HTML教材

リポジトリのルートで `node tools/serve.cjs` を実行し、[ローカルプレビュー](http://127.0.0.1:4173/git-seminar/)を開きます。保存後はブラウザーを再読み込みしてください。

教材の追加・修正は [content/README.md](./content/README.md) を参照してください。Chapterの `chapter.json` がSectionの順序を、各Sectionの `section.json` がStepの順序を決めます。1つのMarkdownが1つのStepです。

GitHub Pagesの公開設定と検証手順は [DEVELOPMENT.md](./DEVELOPMENT.md)、章構成とPPTの対応は [authoring/chapter-structure.md](./authoring/chapter-structure.md)、制作の記録は [authoring/CONTENT-NOTES.md](./authoring/CONTENT-NOTES.md) にまとめています。

## 資料

- [Gitゼミで使ったPDF](./presentation/git-seminar.pdf)
- [関連リンク](./links/README.md)
- [キーワード](./keywords/README.md)
- [設定まとめ](./settings/README.md)

## Contributors

- [suzuki](https://github.com/suzuyuyuyu/)
