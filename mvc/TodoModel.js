// MODEL : données + règles métier. Ne connaît ni la vue ni le contrôleur.
export class TodoModel {
  #todos = [];
  #listeners = [];

  add(title) {
    const clean = title.trim();
    if (!clean) throw new Error('Le titre est obligatoire');
    this.#todos.push({ id: crypto.randomUUID(), title: clean, done: false });
    this.#notify();
  }
  toggle(id) {
    const todo = this.#todos.find(t => t.id === id);
    if (todo) {
      todo.done = !todo.done;
      this.#notify();
    }
  }
  remove(id) {
    this.#todos = this.#todos.filter(t => t.id !== id);
    this.#notify();
  }
  all() {
    return this.#todos.map(t => ({ ...t }));
  } // copie défensive

  subscribe(fn) {
    this.#listeners.push(fn);
    fn(this.all());
  }
  #notify() {
    this.#listeners.forEach(fn => fn(this.all()));
  }


  // Add :

filtrer(nom) {
  if (nom === 'toutes') return this.all();
  if (nom === 'faites') return this.#todos.filter(t => t.done).map(t => ({ ...t }));
  if (nom === 'a-faire') return this.#todos.filter(t => !t.done).map(t => ({ ...t }));
  throw new Error('Filtre inconnu');
}

restantes() {
  return this.#todos.filter(t => !t.done).length;
}
}
