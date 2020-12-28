import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useTodoContext } from 'context/todoContext';
import { filterItems } from 'helpers/filterHelper';
import withModal from 'HOC/withModal';

import TodoListItem from './TodoListItem';
import FormRemoveTodo from './FormRemoveTodo';
import FormEditTodo from './formEditTodo';

import { StyledTodoListItem } from './TodoListItem/TodoListItem.css.js';
import StyledTodoList from './TodoList.css.js';

const TodoList = ({ openModal, closeModal }) => {
  const { items, activeFilter } = useTodoContext();
  const todoVisible = filterItems(items, activeFilter);

  const elements = useMemo(
    () =>
      todoVisible.map(({ id, ...itemProps }) => (
        <TodoListItem
          {...itemProps}
          key={id}
          openModalRemove={() =>
            openModal(
              'Warning',
              <FormRemoveTodo id={id} closeModal={closeModal} />,
            )
          }
          openModalEdit={() =>
            openModal(
              'Edit task',
              <FormEditTodo id={id} closeModal={closeModal} />,
            )
          }
        />
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

TodoList.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default withModal(TodoList);
