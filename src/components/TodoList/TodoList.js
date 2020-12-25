import { useMemo } from 'react';

import { useTodoContext } from 'context/todoContext';
import { filterItems } from 'helpers/filterHelper';

import TodoListItem from './TodoListItem';

import { StyledTodoListItem } from './TodoListItem/TodoListItem.css.js';
import StyledTodoList from './TodoList.css.js';

const TodoList = () => {
  const { items, activeFilter } = useTodoContext();
  const todoVisible = filterItems(items, activeFilter);

  const elements = useMemo(
    () =>
      todoVisible.map(({ id, ...itemProps }) => (
        <TodoListItem {...itemProps} key={id} />
      )),
    [items, activeFilter],
  ); // eslint-disable-line

  const empty = (
    <StyledTodoListItem key="empty" data-testid="messageEmptyFilter">
      <span>There are no tasks available for this filter!</span>
    </StyledTodoListItem>
  );

  return (
    <StyledTodoList direction="column">
      {elements.length ? elements : empty}
    </StyledTodoList>
  );
};

export default TodoList;
