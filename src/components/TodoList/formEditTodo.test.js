import { render, screen, fireEvent } from '@testing-library/react';
import { TodoProvider } from 'context/todoContext';
import FormEditTodo from './FormEditTodo';
import 'themes/mockTheme';

describe('<FormEditTodo />', () => {
  function renderForm(props) {
    const items = [
      { id: '1', label: 'one', done: false },
      { id: '2', label: 'two', done: true },
    ];
    window.localStorage.setItem('items', JSON.stringify(items));

    const closeModal = jest.fn();
    render(
      <TodoProvider>
        <FormEditTodo {...props} closeModal={closeModal} />
      </TodoProvider>,
    );

    return {
      closeModal,
      inputTodoTitle: screen.getByRole('textbox'),
      inputTodoStatus: screen.getByRole('checkbox'),
      buttonSubmit: screen.getByRole('button', { name: /Update task/i }),
      buttonClose: screen.getByRole('button', { name: /Close/i }),
    };
  }

  it('should load task data', () => {
    const { inputTodoTitle, inputTodoStatus } = renderForm({ id: '1' });
    expect(inputTodoTitle.value).toEqual('one');
    expect(inputTodoStatus.checked).toEqual(false);
  });

  it('should update task data', () => {
    const { inputTodoTitle, inputTodoStatus, buttonSubmit } = renderForm({
      id: '2',
    });

    fireEvent.change(inputTodoTitle, {
      target: { value: 'newTodo' },
    });
    fireEvent.click(inputTodoStatus);
    fireEvent.click(buttonSubmit);

    const updatedItems = JSON.parse(window.localStorage.getItem('items'));
    expect(updatedItems).toEqual([
      { id: '1', label: 'one', done: false },
      { id: '2', label: 'newTodo', done: false },
    ]);
  });

  it('should close without updating task data', () => {
    const {
      inputTodoTitle,
      inputTodoStatus,
      buttonClose,
      closeModal,
    } = renderForm({
      id: '2',
    });

    fireEvent.change(inputTodoTitle, {
      target: { value: 'newTodo' },
    });
    fireEvent.click(inputTodoStatus);
    fireEvent.click(buttonClose);

    expect(closeModal).toBeCalled();

    const updatedItems = JSON.parse(window.localStorage.getItem('items'));
    expect(updatedItems).toEqual([
      { id: '1', label: 'one', done: false },
      { id: '2', label: 'two', done: true },
    ]);
  });
});
