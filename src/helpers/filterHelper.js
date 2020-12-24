export const filters = {
  all: { name: 'all', label: 'All' },
  done: { name: 'done', label: 'Done' },
  active: { name: 'active', label: 'Active' },
};

export function filterItems(items, filter) {
  if (filter === filters.all.name) return items;
  if (filter === filters.done.name) return items.filter((item) => item.done);
  if (filter === filters.active.name) return items.filter((item) => !item.done);
  return items;
}
