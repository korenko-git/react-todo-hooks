import { useState } from 'react';
import PropTypes from 'prop-types';

import ToggleContainer from './Toggle.css.js';

const Toggle = ({ theme, toggleTheme }) => {
  const [animate, setAnimate] = useState(false);

  const clickHandler = () => {
    setAnimate(true);
    toggleTheme();
    setTimeout(() => setAnimate(false), 300);
  };

  let className = theme;
  if (animate) className += ' animate';

  return (
    <ToggleContainer
      className={className}
      onClick={clickHandler}
    ></ToggleContainer>
  );
};

Toggle.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Toggle;
