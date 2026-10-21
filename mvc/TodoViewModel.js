import { observable } from './observable.js';
import { TodoModel } from './TodoModel.js';

export class TodoViewModel {
  visibles = observable([]);
  restantes = observable(0);
  filtre = observable('toutes');
  erreur = observable('');

  constructor(model = new TodoModel()) {
    this.model = model;
    // Whenever the model changes, the ViewModel updates its observables
    this.model.subscribe(() => this.#recalculer());
  }

  ajouter(titre) {
    try {
      this.model.add(titre);
      this.erreur.set(''); // Clear error on success
    } catch (e) {
      this.erreur.set(e.message);
    }
  }

  basculer(id) {
    this.model.toggle(id);
  }

  supprimer(id) {
    this.model.remove(id);
  }

  changerFiltre(nom) {
    if (!['toutes', 'faites', 'a-faire'].includes(nom)) {
      throw new Error('Filtre inconnu');
    }
    this.filtre.set(nom);
    this.#recalculer();
  }

  #recalculer() {
    this.visibles.set(this.model.filtrer(this.filtre.get()));
    this.restantes.set(this.model.restantes());
  }
}