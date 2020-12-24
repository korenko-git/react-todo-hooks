import useLocalStorage from './useLocalStorage';

export const useDarkMode = () => {
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = prefersDarkMode ? 'dark' : 'light';
  const [theme, setTheme] = useLocalStorage('theme', initialTheme);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return { theme, toggleTheme };
};
