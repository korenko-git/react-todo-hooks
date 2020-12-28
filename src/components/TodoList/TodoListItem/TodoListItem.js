import PropTypes from 'prop-types';

import Button from 'components/shared/Button.css.js';
import { StyledTodoListItem } from './TodoListItem.css.js';

import { ReactComponent as DeleteIcon } from './delete.svg';
import { ReactComponent as EditIcon } from './pencil.svg';

const TodoListItem = ({ label, done, openModalEdit, openModalRemove }) => (
  <StyledTodoListItem completed={done}>
    <span>{label}</span>

    <div>
      <Button outlined onClick={openModalEdit}>
        <EditIcon height="40px" width="40px" />
      </Button>

      <Button outlined onClick={openModalRemove}>
        <DeleteIcon height="40px" width="40px" />
      </Button>
    </div>
  </StyledTodoListItem>
);

TodoListItem.propTypes = {
  label: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  openModalEdit: PropTypes.func.isRequired,
  openModalRemove: PropTypes.func.isRequired,
};

export default TodoListItem;
