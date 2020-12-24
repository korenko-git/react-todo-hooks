import useLocalStorage from './useLocalStorage';

const useListControl = (initialValue) => {
  const [items, setItems] = useLocalStorage('items', initialValue);

  return {
    items,
    addItem: (newItem) => {
      setItems([...items, newItem]);
    },
    removeItem: (id) => {
      setItems(items.filter((item) => item.id !== id));
    },
    toggleItemProperty: (id, propertyName) => {
      setItems(
        items.map((item) =>
          item.id === id
            ? { ...item, [propertyName]: !item[propertyName] }
            : item,
        ),
      );
    },
    updateItem: (id, updatedItem) => {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item,
        ),
      );
    },
    findItemById(id) {
      const index = items.findIndex((item) => item.id === id);
      return items[index];
    },
  };
};

export default useListControl;
