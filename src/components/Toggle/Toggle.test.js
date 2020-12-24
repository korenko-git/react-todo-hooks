import { render, fireEvent, act } from '@testing-library/react';
import Toggle from './Toggle';

describe('<Toggle />', () => {
  it('should call toggle function after click', () => {
    const toggleTheme = jest.fn();
    const { container } = render(
      <Toggle theme="light" toggleTheme={toggleTheme} />,
    );

    fireEvent.click(container.firstChild);

    expect(toggleTheme).toBeCalled();
  });

  it('should add class animate after click and remove after 300ms', () => {
    jest.useFakeTimers();
    const { container } = render(
      <Toggle theme="light" toggleTheme={() => {}} />,
    );

    fireEvent.click(container.firstChild);
    expect(container.firstChild.classList.contains('animate')).toBe(true);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(container.firstChild.classList.contains('animate')).toBe(false);

    jest.runAllTimers();
  });
});
