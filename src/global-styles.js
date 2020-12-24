import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  body {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin: 0 auto;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textColor};
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }
`;
