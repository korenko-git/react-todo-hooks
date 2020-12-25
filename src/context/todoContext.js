import moment from 'moment';
import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

import useLocalStorage from 'hooks/useLocalStorage';
import useListControl from 'hooks/useListControl';
import { filters } from 'helpers/filterHelper';

const todoContext = createContext();

export function TodoProvider({ children, ...rest }) {
  const todo = useListControl([]);
  const [activeFilter, setFilter] = useState(filters.all.name);
  const [date, setDate] = useLocalStorage(
    'todoDate',
    moment().format('MM/DD/YYYY'),
  );

  const createTodoItem = (label) => ({
    label,
    done: false,
    id: `toDo_${new Date().getTime()}`,
  });

  return (
    <todoContext.Provider
      value={{
        ...todo,
        createTodoItem,
        activeFilter,
        setFilter,
        date,
        setDate,
        ...rest,
      }}
    >
      {children}
    </todoContext.Provider>
  );
}

TodoProvider.propTypes = {
  children: PropTypes.element,
};

export const useTodoContext = () => useContext(todoContext);
