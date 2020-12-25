import { fireEvent, render, act } from '@testing-library/react';
import { TodoProvider } from 'context/todoContext';
import { filters } from 'helpers/filterHelper';
import AppFooter from './AppFooter';
import 'themes/mockTheme';

describe('<AppHeader />', () => {
  function setup(rest) {
    return render(
      <TodoProvider {...rest}>
        <AppFooter />
      </TodoProvider>,
    );
  }

  beforeEach(() => {
    const items = [
      { id: 1, label: 'one', done: false },
      { id: 2, label: 'two', done: true },
      { id: 3, label: 'three', done: false },
    ];
    window.localStorage.setItem('items', JSON.stringify(items));
  });

  it('should display the number of items remaining', () => {
    const { getByText } = setup();

    expect(getByText('2 items left')).toBeTruthy();
  });

  it('should handles button click', () => {
    const setFilter = jest.fn();
    const { getByText } = setup({ setFilter });

    act(() => {
      fireEvent.click(getByText(filters.all.label));
    });

    expect(setFilter).toHaveBeenCalled();
  });
});
