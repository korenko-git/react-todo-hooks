import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
        <CSSTransition key={id} classNames="todo" timeout={800}>
          <TodoListItem
            {...itemProps}
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
        </CSSTransition>
      )),
    [items, activeFilter],
  ); // eslint-disable-line

  const empty = (
    <CSSTransition key="empty" classNames="todo" timeout={800}>
      <StyledTodoListItem data-testid="messageEmptyFilter">
        <span>There are no tasks available for this filter!</span>
      </StyledTodoListItem>
    </CSSTransition>
  );

  return (
    <StyledTodoList direction="column">
      <TransitionGroup>{elements.length ? elements : empty}</TransitionGroup>
    </StyledTodoList>
  );
};

TodoList.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default withModal(TodoList);
