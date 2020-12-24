import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage hook', () => {
  function setup(...args) {
    return renderHook(() => useLocalStorage(...args));
  }

  describe('storedValue', () => {
    describe('local storage has data', () => {
      it('should take the value from the local storage', () => {
        window.localStorage.setItem('item', 'fromLocalStorage');
        const [storedValue] = setup('item', 'initial').result.current;

        expect(storedValue).toBe('fromLocalStorage');
      });
    });

    describe('local storage is empty', () => {
      it('should take the value from the initial value', () => {
        window.localStorage.clear();
        const [storedValue] = setup('item', 'initial').result.current;

        expect(storedValue).toBe('initial');
      });
    });

    it('should take the value from the initial value on error', () => {
      window.localStorage.getItem = jest.fn(() => {
        throw new Error();
      });
      console.error = jest.fn(() => {});

      const [storedValue] = setup('item', 'initial').result.current;

      expect(console.error).toHaveBeenCalled();
      expect(storedValue).toBe('initial');
    });
  });

  describe('setValue', () => {
    it('should set the value', () => {
      const { result } = setup('item', 'initial');

      act(() => {
        // eslint-disable-next-line
        const [_, setValue] = result.current;
        setValue('newValue');
      });

      const [storedValue] = result.current;
      expect(storedValue).toBe('newValue');
    });

    it('if the new value is a function, then it should apply it to the past value', () => {
      const { result } = setup('item', 'initial');

      act(() => {
        // eslint-disable-next-line
        const [_, setValue] = result.current;
        setValue((storedValue) => `new-${storedValue}`);
      });

      const [storedValue] = result.current;
      expect(storedValue).toBe('new-initial');
    });

    it('should log on error', () => {
      window.localStorage.setItem = jest.fn(() => {
        throw new Error();
      });
      console.error = jest.fn(() => {});

      // eslint-disable-next-line
      const [_, setValue] = setup('item', 'initial').result.current;

      act(() => {
        setValue('newValue');
      });

      expect(console.error).toHaveBeenCalled();
    });
  });
});
