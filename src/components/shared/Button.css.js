import styled from 'styled-components';
import { darken } from 'polished';

const Button = styled.button`
  display: block;
  outline: none;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.25s linear;

  ${({ outlined, variant, theme }) => {
    const { background, textColor } = theme.variant[variant];
    if (outlined)
      return `
        background-color: transparent;
        border: 1px solid ${background};
        color: ${background};

        svg {
          fill: ${background};
        }

        &:hover {
          background: ${background};
          color: ${textColor};

          svg {
            fill: ${textColor};
          }
        }
        `;

    return `
      background: ${background};
      color: ${textColor};

      &:hover {
        background: ${darken(0.1, background)}
      }
      `;
  }}
`;

Button.defaultProps = {
  outlined: false,
  variant: 'primary',
};

export default Button;
