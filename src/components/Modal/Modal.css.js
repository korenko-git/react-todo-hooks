import styled from 'styled-components';

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ state }) => (state === 'entered' ? 1 : 0)};
  transition: opacity linear 0.15s;
  z-index: 2000;
  margin: 15px;

  @media (min-width: 768px) {
    width: 400px;
    margin: 0 auto;
  }

  .background {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 1040;
    display: block;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    outline: 0;
  }

  .box-dialog {
    z-index: 1050;
    width: 100%;
    background-color: ${({ theme }) => theme.card};
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    .box-content {
      padding: 10px;
      width: 100%;
    }
    .box-header {
      height: 48px;
      padding: 8px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid ${({ theme }) => theme.background};
      .box-title {
        font-size: 24px;
        font-weight: 400;
        margin: 0 0 0 0;
      }
      .x-close {
        width: 35px;
        height: 35px;
        margin-right: 0px;
        position: relative;
        padding: 0px;

        &:before,
        &:after {
          content: '';
          position: absolute;
          width: 21px;
          height: 1px;
          background-color: white;
          border-radius: 2px;
          top: 16px;
          box-shadow: 0 0 2px 0 #ccc;
        }

        &:before {
          transform: rotate(45deg);
          left: 6px;
        }

        &:after {
          transform: rotate(-45deg);
          right: 6px;
        }
      }
    }
    .box-body {
      font-size: 14px;
      padding: 0px;
      width: auto;
      height: auto;
    }
    .box-footer {
      height: 48px;
      padding: 0px 7px 0px 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-top: 1px solid ${({ theme }) => theme.background};
    }
  }
`;

export default Modal;
