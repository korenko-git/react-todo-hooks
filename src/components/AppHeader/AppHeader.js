import { useState } from 'react';
import PropTypes from 'prop-types';

import { useTodoContext } from 'context/todoContext';
import withModal from 'HOC/withModal';

import FormEditFilter from './FormEditFilter';

import { NewTodoInput } from './AppHeader.css.js';
import Ribbon from './Ribbon.css.js';

const AppHeader = ({ openModal, closeModal }) => {
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
      <Ribbon
        variant="primary"
        onClick={() =>
          openModal('Filter Task', <FormEditFilter closeModal={closeModal} />)
        }
      >
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

AppHeader.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default withModal(AppHeader);
