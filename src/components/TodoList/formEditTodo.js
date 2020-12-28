import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { useTodoContext } from 'context/todoContext';

import { FormGroup, FormBox } from 'components/shared/Form.css.js';
import Button from 'components/shared/Button.css.js';

const FormEditTodo = ({ id, closeModal }) => {
  const { updateItem, findItemById } = useTodoContext();
  const item = findItemById(id);

  const labelTodo = useRef(null);
  const statusTodo = useRef(null);

  useEffect(() => {
    labelTodo.current.value = item.label;
    statusTodo.current.checked = item.done;
  }, []); // eslint-disable-line

  const updateTodo = (event) => {
    event.preventDefault();

    updateItem(id, {
      label: labelTodo.current.value,
      done: statusTodo.current.checked,
    });

    closeModal();
  };

  return (
    <>
      <div className="box-content">
        <div className="box-body">
          <FormGroup>
            <label htmlFor="labelTodo">Title:</label>
            <input
              ref={labelTodo}
              id="labelTodo"
              className="form-control"
              type="text"
              placeholder="Enter task title"
            />
          </FormGroup>

          <FormBox>
            <label>
              <input
                ref={statusTodo}
                className="form-control"
                type="checkbox"
              />
              Completed
            </label>
          </FormBox>
        </div>
      </div>

      <div className="box-footer">
        <Button onClick={updateTodo}>Update task</Button>
        <Button variant="default" onClick={closeModal}>
          Close
        </Button>
      </div>
    </>
  );
};

FormEditTodo.propTypes = {
  id: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default FormEditTodo;
