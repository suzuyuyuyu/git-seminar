# Chapter 08 — 復元・退避と発展事項

教材の本文・要点・付箋は `docs/lessons/recovery.js` に集約し、図は `docs/assets/recovery.svg` の14状態を共有する。教材に掲載したコマンドの実行は行っていない。表示統合とブラウザ検証は共通処理担当が行う。

## PPTの参照範囲

`ppt-src.pptx` のスライドXMLから、32〜38、82〜86、89〜103のテキストを確認した。PDF版は付録を含まないため、付録はPPT XMLを一次資料とした。この担当では元図の画像・描画座標は視覚確認していない。**SVGは元図の再現ではなく、テキストとGit公式仕様に基づく新規模式図**。reset、rebase、相対参照を含め、PPT図の未確認部分を推測して転写したものではない。

| スライド | 対応と編集 |
| --- | --- |
| 32〜33 | コマンド一覧とinit。initは前章に委ね、この章は復元・発展事項へ絞る。 |
| 34、95〜97 | resetのsoft/mixed/hard比較。対象commitを指定したresetと、path指定のindex更新を区別。 |
| 35 | clean。-fだけを覚える構成から、-n/-ndによる候補確認を先にする構成へ変更。 |
| 36、89 | stashのpush/list/apply/pop、未追跡を含める-u、競合時の保持を説明。旧saveよりpush -mを採用。 |
| 37、82〜84 | merge、branch、switchの基本は前章を参照。checkoutによるファイル復元と枝移動はrestore/switchに分ける。 |
| 38 | cherry-pickで選んだ変更を別のブランチへ適用。 |
| 85 | rebaseの土台変更とID変更、共有前条件を追加。 |
| 86 | restoreで追跡ファイルの内容を復元する。既定の復元元はindexと明記。 |
| 89 | amend、stash、detached HEAD、消失ケースを補完。Submoduleは見出ししかないため公式仕様から補完。 |
| 90〜91 | worktree。同じbranchの重複checkoutは通常拒否されるが、絶対の仕様と断言しない。 |
| 92 | 制作者情報。この節の技術本文には転記しない。 |
| 93〜94、98〜100 | HEAD~n、HEAD^2の違い、第二親がない場合のエラー。図は簡単なマージグラフに描き直す。 |
| 101〜103 | reflogによるコミット救済。hard resetによる上書きより救済ブランチを先に作る手順へ変更。 |

## 構成

1. restore-worktree：index→作業ツリーの片方向復元。
2. restore-index：HEADのスナップショット→index、作業ツリーは保持。
3. stash：作業ツリーと退避箱、pushとapply/pop。
4. revert：既存コミットを残して逆変更のコミットを追加。
5. amend：直近Bを新しいB′へ作り直す前後比較。
6. reset：C→Bへの先端移動と、soft/mixed/hardの対象領域比較。
7. clean：追跡対象と未追跡を分け、削除候補と実行を区別。
8. reflog：既存のCを探してrescueの目印を付ける。
9. cherry-pick：Xの変更から別の親を持つX′を作る。
10. rebase：Aから分岐したXをBの上へ適用し直してX′にする。
11. worktree：共通リポジトリから2つの作業場所を用意。
12. submodule：親が独立した子のC2を参照。
13. revisions：第一親の~と第二親の^2、タグの固定名。
14. detached：HEADがコミットを直接指し、mainは別の先端を維持。

すべての節に本番用付箋1件、自学習用補足1件を用意した。本文は目的と対象を先に、要点は投影用の短文とする。図の文字は22px以上、丸＝コミット、灰色の線＝親子関係、緑の札＝ブランチ、緑の線や矢印＝操作・参照。履歴上の左右配置は模式的であり、時間間隔を表さない。非表示gを含むSVGだが、現在の状態だけを表示する。初期状態はrestore-worktree。

## 補完・修正した重要事項

- restoreの既定の復元元はindex、--stagedの既定はHEAD。--stagedは作業ツリーを破棄しない。
- 通常の取り消しはrestore/revertを先に説明し、reset --hardやcleanは用途を理解した場合に限る。掲載コマンドの連続実行を促さない。
- soft/mixed/hardの違いを「残るファイル」ではなく、先端・index・作業ツリーのどこを更新するかで説明。hardにはdry-runがなく、邪魔になる未追跡ファイル等も消す場合がある。
- clean -nはファイル、-ndは未追跡ディレクトリも含む候補確認。-fdの前に同じ場所・条件で確認し、確認後の変更にも注意。-xは実行例から外す。
- stash popは適用が競合するとstashを保持する。applyの直後にpopする連続例にはしない。-uは無視対象を含めない。
- amend、rebaseはコミットを書き換える。共有済み履歴では原則避ける。force-with-leaseを万能な安全策とせず、期待値省略とバックグラウンドfetchの注意を補足。
- reflogはローカルの参照移動の記録。未コミットの編集やcleanした未追跡データの復元を保証しない。保持期限・到達可能性・GCに制約がある。
- HEAD^2は第二親、HEAD~2は第一親を2回。クォートはPowerShell/Git Bash等で特殊文字をシェルに解釈させないため。
- worktreeは同一履歴・別作業ツリー、submoduleは独立した別リポジトリ。submoduleは親と子それぞれのcommit/pushが必要。

## 公式仕様の確認先（2026-10-15）

本文のsourcesにも同じ参照先を保存した。書き下ろしの要約であり、仕様文の転載ではない。

- [git-restore](https://git-scm.com/docs/git-restore)：復元元と対象領域。
- [git-stash](https://git-scm.com/docs/git-stash)：push、-u、apply、pop失敗時の保持。
- [git-revert](https://git-scm.com/docs/git-revert)：逆変更の追加、競合とマージの扱い。
- [git-commit](https://git-scm.com/docs/git-commit)：amend、no-edit。
- [git-reset](https://git-scm.com/docs/git-reset)：soft/mixed/hard、path指定、未追跡への影響。
- [git-clean](https://git-scm.com/docs/git-clean)：-n/-d/-fと無視対象。
- [git-reflog](https://git-scm.com/docs/git-reflog)：ローカル参照、通常90日／到達不能30日の既定expire。
- [git-cherry-pick](https://git-scm.com/docs/git-cherry-pick)：既存の変更の適用、continue/abort。
- [git-rebase](https://git-scm.com/docs/git-rebase)：コミットの再適用、共有された上流の書き換えに伴う影響。
- [git-push](https://git-scm.com/docs/git-push)：force-with-leaseの期待値とバックグラウンドfetchの制約。
- [git-worktree](https://git-scm.com/docs/git-worktree)：履歴の共有、branch重複checkoutの既定拒否、remove。
- [git-submodule](https://git-scm.com/docs/git-submodule)：親のコミット参照、recursive、checkout時のdetached HEAD。
- [gitrevisions](https://git-scm.com/docs/gitrevisions)：~と^、reflogの参照記法。
- [git-tag](https://git-scm.com/docs/git-tag)：注釈付きタグと固定参照。
- [git-switch](https://git-scm.com/docs/git-switch)：detachとブランチ作成。
