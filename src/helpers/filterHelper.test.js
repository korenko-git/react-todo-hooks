import { filterItems, filters } from './filterHelper';

describe('filterHelper', () => {
  let items = [];

  beforeEach(() => {
    items = [
      { id: 1, name: 'one', done: false },
      { id: 2, name: 'two', done: true },
      { id: 3, name: 'three', done: false },
      { id: 4, name: 'four', done: true },
    ];
  });

  it('should keep all todo', () => {
    const filteredItems = filterItems(items, filters.all.name);
    expect(filteredItems).toEqual([
      { id: 1, name: 'one', done: false },
      { id: 2, name: 'two', done: true },
      { id: 3, name: 'three', done: false },
      { id: 4, name: 'four', done: true },
    ]);
  });

  it('should keep todo with done status', () => {
    const filteredItems = filterItems(items, filters.done.name);
    expect(filteredItems).toEqual([
      { id: 2, name: 'two', done: true },
      { id: 4, name: 'four', done: true },
    ]);
  });

  it('should keep todo with active status', () => {
    const filteredItems = filterItems(items, filters.active.name);
    expect(filteredItems).toEqual([
      { id: 1, name: 'one', done: false },
      { id: 3, name: 'three', done: false },
    ]);
  });

  it('should keep all todo if wrong filter name', () => {
    const filteredItems = filterItems(items, 'wrong');
    expect(filteredItems).toEqual([
      { id: 1, name: 'one', done: false },
      { id: 2, name: 'two', done: true },
      { id: 3, name: 'three', done: false },
      { id: 4, name: 'four', done: true },
    ]);
  });
});
