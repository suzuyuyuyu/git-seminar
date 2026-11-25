# Gitコマンド資料と原資料の対応

前回の独自の矢印図を廃止し、元PPT・PDFの書式、説明、オプション表をSVGのテキスト・表として再構成した。PPTのXMLを今回あらためて抽出し、PDFの25–38・83–86頁を画像にして目視確認した。原資料の装飾は再現の対象とせず、内容と対応関係を維持する。

| コマンド | PPT / PDF頁 | 引き継いだ内容 |
| --- | --- | --- |
| clone | 25 | repository link・SSH URL、--recursive・--depth・-b |
| add | 26 | パス・カレントディレクトリ・Pythonファイルの例、working treeからindexへの図、-A・-u・-p |
| commit | 27 | スナップショット、-m・エディター・prefixの説明、--amend・--verbose |
| push | 28 | repositoryとlocal ref:remote ref、origin main:main、-u・-f・--force-with-lease |
| pull | 30 | fetchとmergeの2段階、リモート・追跡ブランチ・ローカルの領域図 |
| status | 31 | ブランチの表示例、up to date・behind・ahead、未ステージ・ステージ済み、ファイルの状態 |
| init | 33 | .gitの作成、ls -Aの前後、初期化の出力例 |
| reset | 34 | commit指定とパス指定、--hard・--mixed・--soft |
| clean | 35 | 未追跡ファイル、reset --hardとの区別、-fとPPTにある-n |
| stash | 36 | save・list・apply・pop・show・drop/clear、-u・-a。操作一覧のStepにも同じ内容を収録 |
| merge | 37 | 統合・競合・merge commit、-m・--squash・--ff・--no-ff・--ff-only |
| cherry-pick | 38 | 特定commit・複数commitの適用、--continue・--abort |
| branch | 83 | 一覧・名前付き作成・commitへの目印、-a・-r・-d・-u |
| checkout / switch | 84 | 比較表、-b/-c、直前へ戻る操作、commitへの移動、ファイル復元 |
| rebase | 85 | 共通の出発点、mainでgit rebase feat/popupとgit merge feat/popupを比較する図 |
| restore | 86 | 誤削除した追跡ファイルの復元、statusでのパス確認 |

restore --stagedは86頁を補うStep。相対参照はPPT93–100、reflogとcommit救出はPPT101–103を補うStepで、PDF88頁の範囲には含まれない。その他の応用コマンドは既存HTML教材の補足であり、元PPTに同じスライドがあるとは扱わない。対応ページと補足の区別は編集用のsourceメタデータに保持し、教材の画面には制作過程の注記を表示しない。

## 正確さのための補足

- cloneのdepthは履歴の深さ。commit数を厳密に保証するという表現を避ける。
- commitのprefixは運用例であり、Gitの必須条件ではない。amendは内容もメッセージも変更できる。
- pushの省略時の送信先と参照は設定に依存する。force-with-leaseは期待した参照値との一致を確認する仕組みであり、常に安全という意味ではない。
- resetのパス形式が更新するのはindex。working treeの復元やHEADの移動とは区別する。
- stashのapply/popは作業ツリーへ変更を適用する。HEADを動かすという説明にしない。saveは従来の記法として残し、使用例はpush -mとする。
- merge --squashは変更を準備する操作で、commitは別に実行する。merge commitを自動で作るという説明にしない。
- rebaseの図では原資料どおりmainが変わる。共有済みmainで実行する演習とせず、未共有の練習用履歴と明示する。

補足の根拠：[clone](https://git-scm.com/docs/git-clone)、[commit](https://git-scm.com/docs/git-commit)、[push](https://git-scm.com/docs/git-push)、[reset](https://git-scm.com/docs/git-reset)、[stash](https://git-scm.com/docs/git-stash)、[merge](https://git-scm.com/docs/git-merge)。
