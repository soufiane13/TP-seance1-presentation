import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TodoViewModel } from './TodoViewModel.js';

test('ajouter une tâche met à jour visibles et restantes', () => {
  const vm = new TodoViewModel();
  vm.ajouter('Lire le cours');
  assert.equal(vm.visibles.get().length, 1);
  assert.equal(vm.restantes.get(), 1);
});

test('un titre vide remplit erreur (et n\'ajoute rien)', () => {
  const vm = new TodoViewModel();
  vm.ajouter('   '); 
  assert.match(vm.erreur.get(), /obligatoire/);
  assert.equal(vm.visibles.get().length, 0);
});

test('le filtre "faites" ne garde que les tâches cochées', () => {
  const vm = new TodoViewModel();
  vm.ajouter('Tâche 1');
  vm.ajouter('Tâche 2');
  
  const premiereTache = vm.visibles.get()[0];
  vm.basculer(premiereTache.id);
  
  vm.changerFiltre('faites');
  
  assert.equal(vm.visibles.get().length, 1);
  assert.equal(vm.visibles.get()[0].title, 'Tâche 1');
});

test('basculer une tâche fait baisser restantes', () => {
  const vm = new TodoViewModel();
  vm.ajouter('Une tâche');
  assert.equal(vm.restantes.get(), 1);
  
  const tacheId = vm.visibles.get()[0].id;
  vm.basculer(tacheId);
  
  assert.equal(vm.restantes.get(), 0);
});

test('un filtre inconnu provoque une erreur', () => {
  const vm = new TodoViewModel();
  assert.throws(() => {
    vm.changerFiltre('inconnu');
  }, /inconnu/);
});