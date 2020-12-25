import PropTypes from 'prop-types';

import Button from 'components/shared/Button.css.js';
import { StyledTodoListItem } from './TodoListItem.css.js';

import { ReactComponent as DeleteIcon } from './delete.svg';
import { ReactComponent as EditIcon } from './pencil.svg';

const TodoListItem = ({ label, done }) => (
  <StyledTodoListItem completed={done}>
    <span>{label}</span>

    <div>
      <Button outlined>
        <EditIcon height="40px" width="40px" />
      </Button>

      <Button outlined>
        <DeleteIcon height="40px" width="40px" />
      </Button>
    </div>
  </StyledTodoListItem>
);

TodoListItem.propTypes = {
  label: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
};

export default TodoListItem;
