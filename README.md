<h1 align='center'> Git seminar </h1>

研究室のGitゼミ教材です。編集元は `content/` のMarkdown、公開ページは `docs/` に置き、自学習用とゼミ本番用で図・要点を共有します。

Chapter 00〜08を収録しています。Gitの準備、履歴管理、個人演習、共同開発、競合解消、復元・発展事項を、自学習用と講義用の2つの表示で学べます。

## HTML教材

リポジトリのルートで `node tools/serve.cjs` を実行し、[ローカルプレビュー](http://127.0.0.1:4173/git-seminar/)を開きます。

教材の追加・修正は [content/README.md](./content/README.md) を参照してください。Markdownを追加し、章のlesson.jsonのsectionsに登録すると、配列の順で章内目次と講義表示へ加わります。ローカルでは保存後にブラウザーを再読み込みしてください。

GitHub Pagesでは、Settings → Pages → Sourceを **GitHub Actions** にすると、mainへのpush時にMarkdownを生成・検証して公開できます。従来のmain / docs配信を使う場合は、push前に `node tools/check-content.cjs` を実行して生成JSONもcommitします。公開後の標準URLは `https://suzuyuyuyu.github.io/git-seminar/` です。

編集方法と公開手順は [DEVELOPMENT.md](./DEVELOPMENT.md)、原資料との対応は [教材作成メモ](./authoring/CONTENT-NOTES.md)に記載しています。

# List
- [Git ゼミ（東北大学）で使ったもの](./presentation/git-seminar.pdf)
- [リンクをまとめたもの](./links/README.md)
- [キーワードをまとめたもの](./keywords/README.md)
- [設定まとめ](./settings/README.md)

# Contributors
- [suzuki](https://github.com/suzuyuyuyu/)
