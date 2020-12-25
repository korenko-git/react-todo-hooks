import { render } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('should render with light theme', () => {
    window.localStorage.setItem('theme', 'light');
    const { container } = render(<App />);
    expect(container.firstChild);
    expect(container.querySelector("[data-testid='errorText']")).toBeNull();
  });

  it('should render with dark theme', () => {
    window.localStorage.setItem('theme', 'dark');
    const { container } = render(<App />);
    expect(container.firstChild);
    expect(container.querySelector("[data-testid='errorText']")).toBeNull();
  });
});
