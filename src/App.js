import { ThemeProvider } from 'styled-components';

import ErrorBoundary from './components/ErrorBoundary';
import Toggle from './components/Toggle';

import { TodoProvider } from './context/todoContext';
import { useDarkMode } from './hooks/useDarkMode';

import { GlobalStyles } from './global-styles';
import darkTheme from './themes/darkTheme';
import lightTheme from './themes/lightTheme';

import {
  AppContainer,
  TodoContainer,
} from './components/shared/Container.css.js';
import { AppTitle } from './components/AppHeader/AppHeader.css.js';

function App() {
  const { theme, toggleTheme } = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ErrorBoundary>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Toggle theme={theme} toggleTheme={toggleTheme} />
        <TodoProvider>
          <AppContainer>
            <AppTitle>Todo</AppTitle>
            <TodoContainer></TodoContainer>
          </AppContainer>
        </TodoProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
