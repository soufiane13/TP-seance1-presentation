# TP 1 - Architecture Logicielle : Patterns de présentation

Ce dépôt contient le travail réalisé lors du TP 1, axé sur la compréhension et la manipulation des patterns de présentation MVC (Model-View-Controller) et MVVM (Model-View-ViewModel).

## Travail réalisé (Parcours Dev)

1. **Étape 1 : Ajout d'un filtre en MVC**

   * Ajout d'une fonctionnalité de filtrage (Toutes / Faites / À faire) sur une Todo-list existante.

   * Respect strict du pattern MVC : la vue ne fait aucun calcul, le modèle gère la logique de filtrage, et le contrôleur orchestre les mises à jour.

   * Code tagué : `v-mvc`

2. **Étape 2 : Refactoring en MVVM**

   * Remplacement du Contrôleur et de la classe Vue par un `TodoViewModel`.

   * Intégration d'un mini-système réactif (`observable.js`).

   * La page HTML (Vue) se lie directement aux états observables du ViewModel.

   * Code tagué : `v-mvvm`

3. **Étape 3 : Tests Unitaires**

   * Création de tests pour le ViewModel (`TodoViewModel.test.js`) exécutables avec Node.js sans nécessiter de navigateur.

## Étape 4 : Comparaison MVC et MVVM

* **Où se trouve la logique du filtre dans la version MVC ? Dans la version MVVM ?**
  Dans la version MVC, le `TodoController` mémorise le filtre actif et orchestre la mise à jour entre la vue et le modèle. Dans la version MVVM, l'état du filtre et la logique de recalcul sont encapsulés directement au sein du `TodoViewModel` via des observables.

* **Qu'avez-vous pu tester sans navigateur dans chaque version ?**
  Dans la version MVC, je n'ai pu tester que le `TodoModel` (la logique métier). Dans la version MVVM, j'ai pu tester le `TodoModel` ET le `TodoViewModel`, couvrant ainsi toute la logique de présentation et d'interface sans jamais toucher au DOM.

* **Combien de fichiers avez-vous modifiés pour ajouter le filtre en MVC, et lesquels ?**
  Quatre fichiers ont été modifiés : `index.html` (boutons HTML), `TodoModel.js` (méthodes `filtrer` et `restantes`), `TodoView.js` (liaisons d'événements et affichage visuel), et `TodoController.js` (coordination de l'état).

* **Pour un tableau de bord QueenBee qui affiche des mesures en temps réel, quelle version choisiriez-vous, et pourquoi ?**
  Je choisirais MVVM sans hésiter. Grâce au système d'observables, les nouvelles données arrivant en temps réel mettraient à jour la vue automatiquement. En MVC, il faudrait écrire un contrôleur beaucoup plus lourd pour manipuler manuellement le DOM à chaque nouvelle mesure reçue.