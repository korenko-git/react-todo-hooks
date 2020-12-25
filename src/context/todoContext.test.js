import { render } from '@testing-library/react';
import { TodoProvider, useTodoContext } from './todoContext';

describe('todoContext', () => {
  it('should create new todo by createTodoItem', () => {
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
      id: `toDo_${new Date().getTime()}`,
    });
  });
});
