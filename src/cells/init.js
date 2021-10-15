export function initCards() {
  const cards = [];
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 4; j++) {
      cards.push({value: i, color: j})
    }
  }
  return cards;
}

export function initColumns() {
  const columns = [];
  for (let i = 0; i < 8; i++) {
    columns.push([]);
  }
  return columns;
}

export function initSlots() {
  const slots = [];
  for (let i = 0; i < 4; i++) {
    slots.push(null);
  }
  return slots;
}

export function initCollections() {
  const collections = [];
  for (let i = 0; i < 4; i++) {
    collections.push([]);
  }
  return collections;
}
