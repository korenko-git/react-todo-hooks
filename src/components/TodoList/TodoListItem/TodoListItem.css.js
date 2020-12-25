import styled from 'styled-components';
import { darken, lighten } from 'polished';

import Button from 'components/shared/Button.css.js';

export const StyledTodoListItem = styled.li`
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.background};
  background: ${({ theme }) => theme.card};

  &:last-child {
    border-bottom: none;
  }

  div {
    position: absolute;
    top: 6px;
    right: 6px;
    bottom: 0;

    ${Button} {
      display: inline-flex;
      align-items: center;
      width: 40px;
      height: 40px;
      font-size: 30px;
      margin-bottom: 11px;
      float: left;
      padding-left: 7px;
    }
  }

  span {
    word-break: break-word;
    padding: 15px 7px;
    padding-right: 95px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;

    ${({ completed, theme }) => {
      if (completed)
        return `
          color: ${
            theme.textColorTransform === 'dark'
              ? darken(0.5, theme.textColor)
              : lighten(0.5, theme.textColor)
          };
          text-decoration: line-through;
        `;
      return ``;
    }}
  }
`;
