import { renderHook, act } from '@testing-library/react-hooks';
import useListControl from './useListControl';

describe('useListControl hook', () => {
  let startItems;

  beforeAll(() => {
    startItems = [
      { id: 1, name: 'one', isComplete: false },
      { id: 2, name: 'two', isComplete: false },
      { id: 3, name: 'three', isComplete: false },
    ];
  });

  function setup(...args) {
    window.localStorage.clear();
    return renderHook(() => useListControl(...args)).result;
  }

  describe('addItem', () => {
    it('should not mutate the existing item array', () => {
      const expected = [
        { id: 1, name: 'one', isComplete: false },
        { id: 2, name: 'two', isComplete: false },
        { id: 3, name: 'three', isComplete: false },
      ];
      const newItem = { id: 4, name: 'four', isComplete: false };
      const listControl = setup(startItems);

      act(() => {
        listControl.current.addItem(newItem);
      });

      expect(listControl.current.items).not.toBe(startItems);
      expect(startItems).toEqual(expected);
    });

    it('should add todo to the list', () => {
      const newItem = { id: 4, name: 'four', isComplete: false };
      const expected = [
        { id: 1, name: 'one', isComplete: false },
        { id: 2, name: 'two', isComplete: false },
        { id: 3, name: 'three', isComplete: false },
        { id: 4, name: 'four', isComplete: false },
      ];
      const listControl = setup(startItems);

      act(() => {
        listControl.current.addItem(newItem);
      });

      expect(listControl.current.items).toEqual(expected);
    });
  });

  describe('removeItem', () => {
    it('should not mutate the existing item array', () => {
      const expected = [
        { id: 1, name: 'one', isComplete: false },
        { id: 2, name: 'two', isComplete: false },
        { id: 3, name: 'three', isComplete: false },
      ];
      const idToRemove = 2;
      const listControl = setup(startItems);

      act(() => {
        listControl.current.removeItem(idToRemove);
      });

      expect(listControl.current.items).not.toBe(startItems);
      expect(startItems).toEqual(expected);
    });

    it('should remove todo from list', () => {
      const expected = [
        { id: 1, name: 'one', isComplete: false },
        { id: 3, name: 'three', isComplete: false },
      ];
      const idToRemove = 2;
      const listControl = setup(startItems);
      act(() => {
        listControl.current.removeItem(idToRemove);
      });

      expect(listControl.current.items).toEqual(expected);
    });
  });

  describe('toggleItemProperty', () => {
    it('should not mutate the existing item array', () => {
      const expected = [
        { id: 1, name: 'one', isComplete: false },
        { id: 2, name: 'two', isComplete: false },
        { id: 3, name: 'three', isComplete: false },
      ];
      const id = 2;
      const propertyName = 'isComplete';
      const listControl = setup(startItems);

      act(() => {
        listControl.current.toggleItemProperty(id, propertyName);
      });

      expect(listControl.current.items).not.toBe(startItems);
      expect(startItems).toEqual(expected);
    });

    it('should update todo in the list', () => {
      const expected = [
        { id: 1, name: 'one', isComplete: false },
        { id: 2, name: 'two', isComplete: true },
        { id: 3, name: 'three', isComplete: false },
      ];

      const id = 2;
      const propertyName = 'isComplete';
      const listControl = setup(startItems);

      act(() => {
        listControl.current.toggleItemProperty(id, propertyName);
      });

      expect(listControl.current.items).toEqual(expected);
    });
  });

  describe('updateItem', () => {
    it('should not mutate the existing item array', () => {
      const expected = [
        { id: 1, name: 'one', isComplete: false },
        { id: 2, name: 'two', isComplete: false },
        { id: 3, name: 'three', isComplete: false },
      ];
      const listControl = setup(startItems);

      act(() => {
        listControl.current.updateItem(2, {
          name: 'two-two',
          isComplete: true,
        });
      });

      expect(listControl.current.items).not.toBe(startItems);
      expect(startItems).toEqual(expected);
    });

    it('should update todo in the list', () => {
      const expected = [
        { id: 1, name: 'one', isComplete: false },
        { id: 2, name: 'two-two', isComplete: true },
        { id: 3, name: 'three', isComplete: false },
      ];
      const listControl = setup(startItems);

      act(() => {
        listControl.current.updateItem(2, {
          name: 'two-two',
          isComplete: true,
        });
      });

      expect(listControl.current.items).toEqual(expected);
    });
  });

  describe('findItemById', () => {
    it('should find item by id', () => {
      const item = { id: 2, name: 'two', isComplete: false };
      const listControl = setup(startItems);
      let findItem = {};

      act(() => {
        findItem = listControl.current.findItemById(2);
      });

      expect(findItem).toEqual(item);
    });
  });
});
