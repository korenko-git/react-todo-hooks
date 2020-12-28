import styled from 'styled-components';

import { FormGroup } from 'components/shared/Form.css.js';
import { ReactComponent as CalendarIcon } from './calendar.svg';

export const FormGroupWithCalendar = styled(FormGroup)`
  .rdtPicker {
    color: #000;
  }

  ${({ variant = 'primary', theme }) => `
    .rdtPicker td.rdtActive, .rdtPicker td.rdtActive:hover {
      background-color: ${theme.variant[variant].background};
      color: ${theme.variant[variant].textColor};
    }`}
`;

export const StyledCalendarIcon = styled(CalendarIcon)`
  float: right;
  fill: ${({ theme, variant = 'primary' }) =>
    theme.variant[variant].background};
  margin-right: 6px;
  margin-top: -30px;
  position: relative;
  z-index: 2;
  height: 25px;
  cursor: pointer;
`;
