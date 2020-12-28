import { StyledCalendarIcon } from './FormEditFilter.css.js';

const InputCalendar = (props, openCalendar) => (
  <>
    <input {...props} />
    <StyledCalendarIcon onClick={openCalendar} height="40px" width="40px" />
  </>
);

export default InputCalendar;
