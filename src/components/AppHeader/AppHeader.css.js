import styled from 'styled-components';
import Input from '../shared/Input.css.js';

export const AppTitle = styled.h1`
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  text-rendering: optimizeLegibility;
  margin: 0;
`;

export const NewTodoInput = styled(Input)`
  padding: 16px 7px;
  padding-top: 34px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.3);
  outline: 0;
`;
