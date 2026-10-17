---
id: "reachable"
title: "commit graphに出るのは、指定した参照からたどれる履歴"
state: "branches-summary-reachable"
diagram: "assets/curriculum-guide.svg"
---

通常のgit logはHEADから親commitをたどって表示します。branchの名前だけを表示するのではなく、そのbranchから到達できる共通の祖先や、mergeで取り込んだ側の履歴も含みます。ほかのbranchだけが指しているcommitは、現在のHEADから到達できなければ通常は表示されません。

git log --allはrefs/以下の参照とHEADを出発点にするため、ほかのローカルbranch、リモート追跡branch、tagなどから到達する履歴も対象になります。表示条件を付けた場合や浅いcloneでは、見える範囲はさらに変わります。

参照を失ったcommitは通常のlogに出なくても、一時的にreflogから見つかることがあります。「graphに出ていない」と「直ちに完全消去された」を同じ意味にしないでください。

## コマンド

```sh
git log --oneline --graph --decorate
git log --all --oneline --graph --decorate
```

## 要点

HEADやbranchなどの出発点から親をたどる。--allで表示対象の参照が広がる。
