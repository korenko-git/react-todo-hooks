import styled, { keyframes } from 'styled-components';

const animateScale = keyframes`
  0%   { transform: scale(1); }
  50%  { transform: scale(0); }
  100% { transform: scale(1); }
`;

const ToggleContainer = styled.span`
  position: absolute;
  cursor: pointer;
  top: 20px;
  right: 25px;
  font-size: 150%;
  z-index: 100;

  &:before {
    content: '☀️';
  }

  &.dark:before {
    content: '🌒';
  }

  &.animate {
    animation: ${animateScale} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export default ToggleContainer;
