import { render } from '@testing-library/react';
import { TodoProvider } from 'context/todoContext';
import TodoList from './TodoList';
import 'themes/mockTheme';

describe('<TodoList />', () => {
  it('should render message', () => {
    window.localStorage.clear();
    const { getByTestId } = render(
      <TodoProvider>
        <TodoList />
      </TodoProvider>,
    );

    expect(getByTestId('messageEmptyFilter'));
  });

  it('should render todo list', () => {
    const items = [
      { id: 1, label: 'one todo', done: false },
      { id: 2, label: 'two todo', done: true },
    ];
    window.localStorage.setItem('items', JSON.stringify(items));

    const { container, getByText } = render(
      <TodoProvider>
        <TodoList />
      </TodoProvider>,
    );

    expect(
      container.querySelector("[data-testid='messageEmptyFilter']"),
    ).toBeNull();

    expect(getByText('one todo'));
    expect(getByText('two todo'));
  });
});
