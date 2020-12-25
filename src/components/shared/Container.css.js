import styled from 'styled-components';

export const AppContainer = styled.main`
  margin: 0px auto 40px;
  max-width: 550px;
`;

export const TodoContainer = styled.section`
  background: ${({ theme }) => theme.card};
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;
