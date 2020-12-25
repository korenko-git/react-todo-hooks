import { Component } from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './ErrorBoundary.css.js';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Wrapper>
          <span className="title">Error!</span>
          <span className="text">something has gone terribly wrong</span>
        </Wrapper>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};
