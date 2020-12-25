import { render, fireEvent, act } from '@testing-library/react';
import { TodoProvider } from 'context/todoContext';
import AppHeader from './AppHeader';
import 'themes/mockTheme';

describe('<AppHeader />', () => {
  it('should add new item on submit', () => {
    const items = [
      { id: 1, label: 'one', done: false },
      { id: 2, label: 'two', done: true },
    ];
    window.localStorage.setItem('items', JSON.stringify(items));

    const { getByTestId } = render(
      <TodoProvider>
        <AppHeader />
      </TodoProvider>,
    );
    const inputNewTodo = getByTestId('inputNewTodo');

    act(() => {
      fireEvent.change(inputNewTodo, {
        target: { value: 'newTodo' },
      });
    });

    fireEvent.submit(inputNewTodo);

    const updatedItems = JSON.parse(window.localStorage.getItem('items'));
    expect(updatedItems).toEqual([
      { id: 1, label: 'one', done: false },
      { id: 2, label: 'two', done: true },
      { id: `toDo_${new Date().getTime()}`, label: 'newTodo', done: false },
    ]);
  });
});
