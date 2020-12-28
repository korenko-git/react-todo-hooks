import { render, screen, fireEvent } from '@testing-library/react';
import { TodoProvider } from 'context/todoContext';
import FormRemoveTodo from './FormRemoveTodo';
import 'themes/mockTheme';

describe('<FormRemoveTodo />', () => {
  function renderForm(props) {
    const items = [
      { id: '1', label: 'one', done: false },
      { id: '2', label: 'two', done: true },
    ];
    window.localStorage.setItem('items', JSON.stringify(items));

    const closeModal = jest.fn();
    render(
      <TodoProvider>
        <FormRemoveTodo {...props} closeModal={closeModal} />
      </TodoProvider>,
    );

    return {
      closeModal,
      buttonSubmit: screen.getByRole('button', { name: /Delete task/i }),
      buttonClose: screen.getByRole('button', { name: /Close/i }),
    };
  }

  it('should remove the task', () => {
    const { buttonSubmit } = renderForm({ id: '1' });

    fireEvent.click(buttonSubmit);

    const updatedItems = JSON.parse(window.localStorage.getItem('items'));
    expect(updatedItems).toEqual([{ id: '2', label: 'two', done: true }]);
  });

  it('should close without removing the task', () => {
    const { buttonClose, closeModal } = renderForm({ id: '1' });

    fireEvent.click(buttonClose);
    expect(closeModal).toBeCalled();

    const updatedItems = JSON.parse(window.localStorage.getItem('items'));
    expect(updatedItems).toEqual([
      { id: '1', label: 'one', done: false },
      { id: '2', label: 'two', done: true },
    ]);
  });
});
