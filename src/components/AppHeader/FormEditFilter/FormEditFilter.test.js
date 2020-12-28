import moment from 'moment';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoProvider } from 'context/todoContext';
import { filters } from 'helpers/filterHelper';
import FormEditFilter from './FormEditFilter';
import 'themes/mockTheme';

import 'regenerator-runtime/runtime';

describe('<FormEditFilter />', () => {
  function renderForm(props) {
    const closeModal = jest.fn();
    const { container } = render(
      <TodoProvider {...props}>
        <FormEditFilter closeModal={closeModal} />
      </TodoProvider>,
    );

    return {
      closeModal,
      container,
      selectFilter: screen.getByRole('combobox'),
      buttonSubmit: screen.getByRole('button', { name: /Accept/i }),
      buttonClose: screen.getByRole('button', { name: /Close/i }),
    };
  }

  it('should change the filter', () => {
    const setFilter = jest.fn();
    const { selectFilter, buttonSubmit } = renderForm({ setFilter });

    fireEvent.change(selectFilter, { target: { value: filters.done.name } });
    fireEvent.click(buttonSubmit);

    expect(setFilter).toBeCalled();
    expect(setFilter).toBeCalledWith(filters.done.name);
  });

  it('should change todo date', async () => {
    const setDate = jest.fn();
    const { container, buttonSubmit } = renderForm({ setDate });
    const selectDate = await screen.findByDisplayValue(
      moment(new Date().getTime()).format('MM/DD/YYYY'),
    );

    expect(selectDate).toBeTruthy();

    const newDay = '[data-value="16"]';
    const newMonth = '[data-month="7"]';
    const newYear = '[data-year="2020"]';
    const newDate = container.querySelector(`${newDay}${newMonth}${newYear}`);

    fireEvent.click(newDate);
    fireEvent.click(buttonSubmit);

    expect(setDate).toBeCalled();
    expect(setDate).toBeCalledWith('08/16/2020');
  });
});
