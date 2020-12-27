import { render } from '@testing-library/react';
import { TodoProvider } from 'context/todoContext';
import TodoList from './TodoList';
import 'themes/mockTheme';

describe('<TodoList />', () => {
  it('should render message', () => {
    window.localStorage.clear();
    const { queryByTestId } = render(
      <TodoProvider>
        <TodoList />
      </TodoProvider>,
    );

    expect(queryByTestId('messageEmptyFilter')).toBeTruthy();
  });

  it('should render todo list', () => {
    const items = [
      { id: 1, label: 'one todo', done: false },
      { id: 2, label: 'two todo', done: true },
    ];
    window.localStorage.setItem('items', JSON.stringify(items));

    const { container, queryByText } = render(
      <TodoProvider>
        <TodoList />
      </TodoProvider>,
    );

    expect(
      container.querySelector("[data-testid='messageEmptyFilter']"),
    ).toBeNull();

    expect(queryByText('one todo')).toBeTruthy();
    expect(queryByText('two todo')).toBeTruthy();
  });
});
