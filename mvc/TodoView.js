// VIEW : affiche les données et capte les actions de l'utilisateur.
// Elle ne modifie jamais le modèle elle-même : elle prévient le contrôleur.
export class TodoView {
  constructor(root) {
    this.form = root.querySelector('form');
    this.input = root.querySelector('input');
    this.list = root.querySelector('ul');
    this.counter = root.querySelector('.counter');
    this.error = root.querySelector('.error');
    // Select the newly added filter buttons
    this.filters = root.querySelectorAll('[data-filtre]');
  }

  // Update render to accept the calculated "restantes"
  render(todos, restantes) {
    this.list.innerHTML = '';
    for (const t of todos) {
      const li = document.createElement('li');
      li.innerHTML = `<label><input type="checkbox" ${t.done ? 'checked' : ''}>
        <span class="${t.done ? 'done' : ''}"></span></label> <button>✕</button>`;
      li.querySelector('span').textContent = t.title; 
      li.querySelector('input').onchange = () => this.onToggle?.(t.id);
      li.querySelector('button').onclick = () => this.onRemove?.(t.id);
      this.list.append(li);
    }
    // Use the explicit counter from the model
    this.counter.textContent = `${restantes} tâche(s) à faire`;
  }

  showError(msg) {
    this.error.textContent = msg;
  }

  // Add the method to handle active button styling
  showFiltre(nom) {
    this.filters.forEach(btn => {
      if (btn.dataset.filtre === nom) btn.classList.add('actif');
      else btn.classList.remove('actif');
    });
  }

  // Add the click listener for the filter buttons
  bindFilter(handler) {
    this.filters.forEach(btn => {
      btn.onclick = () => handler(btn.dataset.filtre);
    });
  }

  bindAdd(handler) {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      handler(this.input.value);
      this.input.value = '';
    });
  }
  bindToggle(handler) { this.onToggle = handler; }
  bindRemove(handler) { this.onRemove = handler; }
}
