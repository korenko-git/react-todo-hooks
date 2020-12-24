import { renderHook, act } from '@testing-library/react-hooks';
import { useDarkMode } from './useDarkMode';

describe('useDarkMode hook', () => {
  function setup(...args) {
    return renderHook(() => useDarkMode(...args));
  }

  it('should set the theme based on the value of media queries', () => {
    window.localStorage.clear();
    window.matchMedia = jest.fn((media) => {
      if (media === '(prefers-color-scheme: dark)') return { matches: true };
      return { matches: false };
    });

    const { result } = setup();

    expect(result.current.theme).toBe('dark');
  });

  it('should set the theme based on data from local storage', () => {
    window.localStorage.setItem('theme', 'light');
    const { result } = setup();

    expect(result.current.theme).toBe('light');
  });

  it('should toggle theme by toggleTheme', () => {
    window.localStorage.setItem('theme', 'light');
    const { result } = setup();

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('light');
  });
});
