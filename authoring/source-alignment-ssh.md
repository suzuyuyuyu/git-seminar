# SSH認証図：原資料15ページとの対応

## 画像で確認したこと

`tmp/source-review/pages/page-15.png` を `view_image` で実見した。左の薄灰パネルがPC/ローカル、右がサーバー/リモート。上段は①秘密鍵（赤）・公開鍵（緑）の作成と②公開鍵のコピー。横の区切り線より下は③接続要求から認証に至る手順で、PC→サーバーとサーバー→PCの情報交換を番号付きで描いていた。

元図の後半はサーバーで乱数生成→公開鍵で暗号化してPCへ送信→秘密鍵で復号→ハッシュを返して照合、という説明だった。今回のEd25519によるSSH公開鍵認証にはこの説明を引き継がず、署名・検証に修正した。原PDF・PPTは変更していない。

## 反映した構図と変更

新規 `docs/assets/ssh-authentication.svg` は900×680。PC/サーバーの2列、赤い秘密鍵と緑の公開鍵、事前準備と接続時処理を分ける線、手順番号を維持した。原本由来の `illustrations/computer.svg`・`server.svg`・`private-key.svg`・`public-key.svg` を参照する。

手順は①PCで鍵ペア生成、②公開鍵だけをサーバーへ登録、③接続要求、④PCで今回の接続に結び付く認証情報へ秘密鍵で署名、⑤署名送信、⑥サーバーで登録公開鍵を用いて検証、へ改めた。秘密鍵のネットワークへの送信は描かず、送らないことを明示する。

これは利用者認証の概念図であり、サーバーのホスト鍵を確認する処理、暗号化された通信路の確立、セッション識別子やプロトコルメッセージの厳密なフィールド・交換回数は省略している。暗号化そのものが不要という意味ではない。実際の接続手順ではホスト鍵の指紋を確認する従来の節を残した。

## 教材データへの追加

`docs/lessons/foundations.js` のprepare章に `authentication` 節をkeysの直前へ追加。既存6節の内容・コマンドを保持し、後続の表示番号のみ04〜07へ繰り下げた。新節は `diagram: {type:'svg', src:'assets/ssh-authentication.svg', wide:true}` を持ち、図中の `data-state="authentication"` と対応する。本文・投影要点・補足は同じデータから表示する。

原資料の暗号化・復号説明から署名・検証へ修正したことを投影用付箋にも記載。本文では、秘密鍵を送らず所有を証明することと、概念図の抽象化範囲を説明する。鍵設定手順そのものは変更していない。

## 公式資料での確認

2026-10-15閲覧。

- [RFC 4252 §7 Public Key Authentication Method](https://www.rfc-editor.org/rfc/rfc4252#section-7)：利用者の秘密鍵で作った署名を送り、サーバーが鍵の利用可否と署名の正しさを確認する。署名対象にはセッション識別子などの認証情報を含む。§11では、利用者認証より下の通信層でサーバー認証と暗号化通信路が確立されている前提を示す。
- [RFC 8709 Ed25519 and Ed448 Public Key Algorithms for SSH](https://www.rfc-editor.org/rfc/rfc8709.html)：SSHで用いるEd25519/Ed448の公開鍵と署名の形式を定める。Ed25519を暗号化・復号の鍵として説明しない根拠とした。
- [GitHub Docs: About SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh)：GitHubとのGit通信にSSHを利用し、ローカルの秘密鍵で認証する位置付けを確認。
