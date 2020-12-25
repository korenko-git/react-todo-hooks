import styled from 'styled-components';
import { darken } from 'polished';

const getBackColor = ({ variant, theme }) => theme.variant[variant].background;

const Ribbon = styled.span`
  color: ${({ variant, theme }) => theme.variant[variant].textColor};
  z-index: 100;
  position: absolute;
  top: -6.1px;
  right: 10px;
  cursor: pointer;

  &:after {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    border-left: 53px solid transparent;
    border-right: 53px solid transparent;
    border-top: 10px solid ${getBackColor};
    transition: all 0.25s linear;
  }

  span {
    position: relative;
    display: block;
    text-align: center;
    background: ${getBackColor};
    font-size: 14px;
    line-height: 1;
    padding: 12px 8px 10px;
    border-top-right-radius: 8px;
    width: 106px;
    transition: all 0.25s linear;
  }

  span:before,
  span:after {
    position: absolute;
    content: '';
  }

  span:before {
    height: 6px;
    width: 6px;
    left: -6px;
    top: 0;
    background: ${getBackColor};
    transition: all 0.25s linear;
  }

  span:after {
    height: 6px;
    width: 8px;
    left: -8px;
    top: 0;
    border-radius: 8px 8px 0 0;
    background: ${({ variant, theme }) =>
      darken(0.2, theme.variant[variant].background)};
    transition: all 0.25s linear;
  }
`;

Ribbon.defaultProps = {
  variant: 'default',
};

export default Ribbon;
