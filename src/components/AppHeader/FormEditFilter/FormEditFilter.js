import { useState, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

import { useTodoContext } from 'context/todoContext';
import { filters } from 'helpers/filterHelper';

import { FormGroup } from 'components/shared/Form.css.js';
import Button from 'components/shared/Button.css.js';
import InputCalendar from './InputCalendar';

import { FormGroupWithCalendar } from './FormEditFilter.css.js';
import 'react-datetime/css/react-datetime.css';

const DateTime = lazy(() => import('react-datetime'));

const FormEditFilter = ({ closeModal }) => {
  const { activeFilter, setFilter, date, setDate } = useTodoContext();

  const [selectedFilter, selectFilter] = useState(activeFilter);
  const [selectedDate, selectDate] = useState(date);

  const filterOptions = Object.values(filters).map(({ name, label }) => (
    <option key={name} value={name}>
      {label}
    </option>
  ));

  const acceptFilter = () => {
    setFilter(selectedFilter);
    setDate(selectedDate);
    closeModal();
  };

  return (
    <>
      <div className="box-content">
        <div className="box-body">
          <FormGroupWithCalendar>
            <Suspense fallback={<div>Loading...</div>}>
              <label htmlFor="dateTodo">Date:</label>
              <DateTime
                id="dateTodo"
                className="input-control"
                renderInput={InputCalendar}
                dateFormat="MM/DD/YYYY"
                timeFormat={false}
                inputProps={{ readOnly: true }}
                value={selectedDate}
                onChange={(moment) =>
                  typeof moment !== 'string' &&
                  selectDate(moment.format('MM/DD/YYYY'))
                }
                closeOnSelect
              />
            </Suspense>
          </FormGroupWithCalendar>

          <FormGroup>
            <label htmlFor="filterTodo">Filter:</label>
            <select
              id="filterTodo"
              className="form-control"
              value={selectedFilter}
              onChange={(event) => selectFilter(event.target.value)}
            >
              {filterOptions}
            </select>
          </FormGroup>
        </div>
      </div>

      <div className="box-footer">
        <Button onClick={acceptFilter}>Accept</Button>
        <Button variant="default" onClick={closeModal}>
          Close
        </Button>
      </div>
    </>
  );
};

FormEditFilter.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default FormEditFilter;
