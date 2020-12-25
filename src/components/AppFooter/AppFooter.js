import { useTodoContext } from 'context/todoContext';
import { filters } from 'helpers/filterHelper';

import { Footer, FilterList, FooterInfo } from './AppFooter.css.js';
import Button from '../shared/Button.css.js';

const AppFooter = () => {
  const { items, activeFilter, setFilter } = useTodoContext();
  const done = items.reduce((completed, todo) => completed + todo.done, 0);
  const toDo = items.length - done;

  const filterButtons = Object.values(filters).map(({ name, label }) => {
    const variant = activeFilter === name ? 'primary' : 'default';
    return (
      <li key={name}>
        <Button onClick={() => setFilter(name)} variant={variant}>
          {label}
        </Button>
      </li>
    );
  });

  return (
    <Footer>
      <FooterInfo>{toDo} items left</FooterInfo>
      <FilterList>{filterButtons}</FilterList>
    </Footer>
  );
};

export default AppFooter;
