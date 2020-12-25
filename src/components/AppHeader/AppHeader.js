import { useState } from 'react';

import { useTodoContext } from 'context/todoContext';

import { NewTodoInput } from './AppHeader.css.js';

const AppHeader = () => {
  const [todo, setTodo] = useState('');
  const { addItem, createTodoItem } = useTodoContext();

  const onChange = (event) => {
    setTodo(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addItem(createTodoItem(todo));
    setTodo('');
  };

  return (
    <header>
      <form onSubmit={onSubmit}>
        <NewTodoInput
          type="text"
          placeholder="What needs to be done?"
          value={todo}
          onChange={onChange}
          data-testid="inputNewTodo"
        />
      </form>
    </header>
  );
};

export default AppHeader;
