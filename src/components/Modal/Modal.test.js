import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import 'themes/mockTheme';

describe('<Modal />', () => {
  function renderModal() {
    const modalProps = {
      modalConfig: {
        title: 'Modal window',
        body: <p>modal body</p>,
      },
      closeModal: jest.fn(),
    };

    return [render(<Modal {...modalProps} />), modalProps];
  }

  it('should close when key down escape', () => {
    const [{ queryByText }, modalProps] = renderModal();
    const titleNode = queryByText('Modal window');

    fireEvent.keyDown(titleNode, { key: 'Enter', code: 'Enter' });
    expect(modalProps.closeModal).not.toBeCalled();

    fireEvent.keyDown(titleNode, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });
    expect(modalProps.closeModal).toBeCalled();
  });

  it('should close when clicked outside the modal', () => {
    const [{ getByTestId }, modalProps] = renderModal();

    fireEvent.mouseDown(getByTestId('background'));

    expect(modalProps.closeModal).toBeCalled();
  });

  it('should render the title and body of the modal', () => {
    const [{ queryByText }] = renderModal();

    expect(queryByText('Modal window')).toBeTruthy();
    expect(queryByText('modal body')).toBeTruthy();
  });
});
