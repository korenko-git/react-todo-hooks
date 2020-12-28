import { useTodoContext } from 'context/todoContext';
import PropTypes from 'prop-types';

import Button from 'components/shared/Button.css.js';

const FormRemoveTodo = ({ id, closeModal }) => {
  const { removeItem } = useTodoContext();

  const removeTodo = () => {
    removeItem(id);
    closeModal();
  };

  return (
    <>
      <div className="box-content">
        <div className="box-body">
          <p> Are you sure you want to delete the selected task? </p>
        </div>
      </div>

      <div className="box-footer">
        <Button onClick={removeTodo}>Delete task</Button>
        <Button variant="default" onClick={closeModal}>
          Close
        </Button>
      </div>
    </>
  );
};

FormRemoveTodo.propTypes = {
  id: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default FormRemoveTodo;
