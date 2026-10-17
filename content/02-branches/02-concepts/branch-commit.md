---
id: "branch-commit"
title: "作業branchでcommitすると、その目印だけが進む"
state: "branches-concepts-branch-commit"
diagram: "assets/curriculum-guide.svg"
---

mainとfeature/nameが同じcommitを指しているときにfeature/nameへ切り替えてcommitすると、feature/nameだけが新しいcommitを指します。mainは元のcommitに残ります。

HEADはfeature/nameを指したままです。新しいcommitの親は、直前にfeature/nameが指していたcommitになります。別のbranchへ反映するには、mergeなどの明示的な統合が必要です。編集やaddだけではbranchの先端は動きません。

## 要点

commitで動くのはHEADが指すbranch。ほかのbranchはその場に残る。
