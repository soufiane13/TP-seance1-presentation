// CONTROLLER : traduit les actions de la vue en opérations sur le modèle.
export class TodoController {
  #filtreCourant = 'toutes';

  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindAdd(title => {
      try {
        this.model.add(title);
        this.view.showError('');
      } catch (err) {
        this.view.showError(err.message);
      }
    });

    this.view.bindToggle(id => this.model.toggle(id));
    this.view.bindRemove(id => this.model.remove(id));
    
    this.view.bindFilter(nom => {
      this.#filtreCourant = nom;
      this.#refresh();
    });

    // Instead of directly passing all(), we intercept the notification 
    // to apply the current filter and the remaining task count.
    this.model.subscribe(() => this.#refresh());
  }

  #refresh() {
    const visibles = this.model.filtrer(this.#filtreCourant);
    const restantes = this.model.restantes();
    this.view.render(visibles, restantes);
    this.view.showFiltre(this.#filtreCourant);
  }
}
