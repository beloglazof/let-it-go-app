import { counterStore } from './counter-store';

const counterEl = document.getElementById('counter');

export function incCounter() {
  if (!counterEl) return;

  counterStore.inc();
  counterEl.innerText = counterStore.counter;
}
