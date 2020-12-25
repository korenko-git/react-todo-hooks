import styled from 'styled-components';
import List from 'components/shared/List.css.js';

const StyledTodoList = styled(List)`
  .todo-exit-active {
    animation: todo 800ms ease-out forwards;
  }

  .todo-enter-active {
    animation: todo 800ms ease-in alternate-reverse;
  }

  @keyframes todo {
    0% {
      transform: translateX(0);
    }

    30% {
      opacity: 0.7;
      transform: translateX(30px);
    }

    100% {
      opacity: 0;
      transform: translateX(-200px);
    }
  }
`;

export default StyledTodoList;
