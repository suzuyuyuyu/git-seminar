# 元PDFとの対応 — 競合・rebase・restore

今回の段階は、原資料の比較構造・順序・例を優先してHTMLへ移すこと。元PDF/PPTは変更していない。描画したコード図と履歴図は教材用SVGであり、PDF画像の貼り付けではない。

## 確認した画像

`tmp/source-review/pages/page-73.png`、74、75、76、85を1600pxの画像として実見した。85はrestoreではなくrebaseだったため、PDF86を追加でPNG化し、画像を確認した。ページ番号は画像右下と一致する。

| 元PDF | 実見した構造・内容 | 対応する節／SVG状態 |
| --- | --- | --- |
| 73 | 左はmainの先端から作業枝が分岐、右はその間にmainも更新。共通の縦の履歴3commitを残した前後比較。 | `review-and-resolve/conflict-history`。左右の前後図を追加し、同じ作業枝に対してmainだけが進む点を維持。 |
| 74 | 上の共通コードは`def greet():`と`print("Hello, world!")`。下左mainは`Hello, everyone!`、下右feat/jaは`こんにちは!`。中央に分岐履歴と各枝の目印。 | `review-and-resolve/diverge`。共通コード→下左右の変更を保持し、履歴は下へ移す。狭い幅でコードを読めるよう、左右のprint式を改行表示する。 |
| 75 | 左右の変更を残したまま、mainで`git merge feat/ja`をしたい場面。黄色の合流点を示し、「どちらを採用すべきか容易に判断できない」から競合へ進む。 | `review-and-resolve/conflict-choice`。同じ2つのコード比較と、予定の合流点、どちらを採用するかという問いを残す。予定の合流点は点線と「未作成」で明示。 |
| 76 | ターミナルに`Auto-merging hello.py`、`CONFLICT (content): Merge conflict in hello.py`、`Automatic merge failed; fix conflicts and then commit the result.`。その下のファイル内マーカーはHEAD側に英語、取り込む側に日本語。HEADはmainとの注記。 | 失敗出力を`conflict-merge`、ファイル内比較を`markers`へ分ける。`markers`のHEAD/main側とfeat/ja側の順序・挨拶を維持。編集・実行確認・add/commitは既存の`resolve`、`record`へ続ける。 |
| 85 | **rebase**。共通の出発点の図、mainで`git rebase feat/popup`をした結果、同じ出発点からmainで`git merge feat/popup`をした結果。rebaseとmergeの前後を比較する。 | `recover-and-extend/rebase`。上が分岐前、中央がrebase後、下がmerge後。mainとfeat/popupの名前と操作方向を原図へ合わせた。両結果は代替案であり連続操作ではない。 |
| 86 | **restore**。Git管理されている削除ファイルの復旧、先に`git status`で削除したファイルのパスや名前を確認する、という説明。原ページには復元の履歴図はない。 | `recover-and-extend/restore-worktree`。具体例をhello.pyの削除→status→復元へ変更。原文の理解を補うため、indexに残るfileと復元後のfileを比較する図を追加。`restore-index`はステージ済み削除の場合の補足。 |

## 維持・補正した事項

- PR演習と競合演習は別フォルダーで独立開始する。PRをmergeした履歴をそのまま競合例へ持ち込まない。
- 競合練習は最初にhello.py、README、READMEへの実行手順追記をそれぞれcommitし、原図にある共通の3commitと対応させた。そこから作業枝の日本語化、mainの英語更新へ進む。
- PDF73の枝名は`@feat/name`、PDF74〜76は`feat/ja`という原本内の表記ゆれがある。実行できる一貫した例にするため、この競合練習では`feat/ja`へ統一した。
- 挨拶は原図の`Hello, world!`、`Hello, everyone!`、`こんにちは!`を維持。既存の全角感嘆符はこの原図に合わせて半角へ統一した。解消後の「みなさんこんにちは！」は既存教材の完成例で、原PDF73〜76に完成形の指定はない。
- 原PDF75の黄色い合流点は、競合が解決しcommitする前にmerge commitが存在すると誤読される可能性がある。そのため予定を表す点線にし、未作成と説明した。mainの目印は既存の先端を指したままにする。
- 原PDF76の長い出力行は、SVGでは可読性のために改行した。出力内容の意味を変えていない。ファイル表示はcat依存を避けてエディタで確認する手順にした。
- PDF85の「最新の履歴に乗せ直す」は、指定先が常に最新という意味ではない。指定したfeat/popupを土台にmain側の変更を適用し直す、と正確化した。元の図どおりmainを作り直す例は**未共有の練習用履歴だけ**に限定。共有済みmainで実行することを勧めない。
- rebase図のfeat/popup側のcommitは維持し、main側のcommitは作り直す。merge図は両方の元commitを維持し、最後に2つの親を持つcommitを追加する。灰色の線は親子関係、四角い目印は枝の先端。
- restoreの既定の復元元はindex。削除をステージする前と後ではindexの内容が違うので、原PDF86の簡潔な説明に前提を加えた。
- ステージ済みの削除は`--staged`でHEAD→index、続けて通常のrestoreでindex→作業ツリーと分ける。未追跡ファイルの救済はできないことと、編集の復元は未コミット変更を上書きし得ることを付箋に残す。

## 検証と素材

コード・履歴・ターミナルはSVGで作成し、人物画像・ファイルアイコンの追加素材は不要。本文・要点・補足は既存のlesson moduleをSSOTとして維持し、SVGは図の中のラベルのみを持つ。各sectionのdiagramStateとSVGのdata-stateを一致させ、ネストCSSで現在の状態だけを表示する。

教材中のコマンドは実行していない。JS構文、moduleのsection/state一致、SVG XML構文を確認する。全状態のブラウザ表示検証は親担当へ引き継ぐ。

仕様確認先は各lessonのsourcesから参照できる。[git-merge](https://git-scm.com/docs/git-merge)、[git-rebase](https://git-scm.com/docs/git-rebase)、[git-restore](https://git-scm.com/docs/git-restore)に基づいて、元図の曖昧な部分を補足した。
