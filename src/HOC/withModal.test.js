import { act, render, screen } from '@testing-library/react';
import withModal from './withModal';
import 'themes/mockTheme';

describe('withModal HOC', () => {
  function getProps() {
    let modalProps = null;
    const mockComponent = jest.fn((props) => {
      modalProps = props;
      return <div />;
    });
    const Component = withModal(mockComponent);

    render(<Component />);
    return modalProps;
  }

  it('should pass correct params to inner component', () => {
    const mockComponent = jest.fn(() => null);
    const Component = withModal(mockComponent);

    render(<Component normalProp="propValue" />);
    expect(mockComponent).toBeCalled();
    expect(mockComponent).toBeCalledWith(
      expect.objectContaining({
        normalProp: 'propValue',
        isModalOpen: expect.any(Boolean),
        openModal: expect.any(Function),
        closeModal: expect.any(Function),
      }),
      expect.anything(),
    );
  });

  it('should open and close a modal window', () => {
    const modal = getProps();

    act(() => {
      modal.openModal('Modal window');
    });
    expect(screen.queryByText(/Modal window/i)).toBeTruthy();

    act(() => {
      modal.closeModal();
    });
    expect(screen.queryByText(/Modal window/i)).toBeNull();
  });

  it('default action should not be taken on close', () => {
    const modal = getProps();
    const preventDefault = jest.fn();
    const event = { preventDefault };

    act(() => {
      modal.closeModal(event);
    });
    expect(preventDefault).toBeCalled();
  });
});
