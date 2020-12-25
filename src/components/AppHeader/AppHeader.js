import { useState } from 'react';

import { useTodoContext } from 'context/todoContext';

import { NewTodoInput } from './AppHeader.css.js';
import Ribbon from './Ribbon.css.js';

const AppHeader = () => {
  const [todo, setTodo] = useState('');
  const { addItem, createTodoItem, date } = useTodoContext();

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
      <Ribbon variant="primary">
        <span>{date}</span>
      </Ribbon>

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
