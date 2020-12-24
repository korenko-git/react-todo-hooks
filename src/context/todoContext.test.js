import { render } from '@testing-library/react';
import { TodoProvider, useTodoContext } from './todoContext';

describe('todoContext', () => {
  it('should create new todo by createTodoItem', () => {
    const mockDate = new Date('2020-08-17T11:01:58.135Z');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    let newItem = [];
    const TestComponent = () => {
      const { createTodoItem } = useTodoContext();
      newItem = createTodoItem('new todo');
      return <div />;
    };

    render(
      <TodoProvider>
        <TestComponent></TestComponent>
      </TodoProvider>,
    );

    expect(newItem).toEqual({
      label: 'new todo',
      done: false,
      id: `toDo_${mockDate.getTime()}`,
    });
  });
});
