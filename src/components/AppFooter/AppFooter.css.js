import styled from 'styled-components';

import Button from 'components/shared/Button.css.js';
import List from 'components/shared/List.css.js';

export const Footer = styled.footer`
  padding: 10px 7px;
  height: 53px;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.cardBorder};

  &:before {
    content: '';
    z-index: -500;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
      0 8px 0 -3px ${({ theme }) => theme.cardFooter},
      0 9px 1px -3px rgba(0, 0, 0, 0.2),
      0 16px 0 -6px ${({ theme }) => theme.cardFooter},
      0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
`;

export const FilterList = styled(List)`
  float: right;

  ${Button} {
    display: inline-block;
  }
`;

export const FooterInfo = styled.span`
  color: #777;
  float: left;
  text-align: left;
  line-height: 32px;
`;
