import React from 'react';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Navigation extends React.Component {
  handleClick(eventKey) {
    console.log(eventKey);
  }

  render() {
    const { stop, play, next } = this.props;
    return (
      <Nav bsStyle="pills">
        <NavItem eventKey={1} onClick={() => this.handleClick(1)}>
          <Glyphicon glyph="backward" />
        </NavItem>
        <NavItem eventKey={2} onClick={() => stop()}>
          <Glyphicon glyph="stop" />
        </NavItem>
        <NavItem eventKey={3} onClick={() => play()}>
          <Glyphicon glyph="play" />
        </NavItem>
        <NavItem eventKey={4} onClick={() => next()}>
          <Glyphicon glyph="forward" />
        </NavItem>
      </Nav>
    );
  }
}

Navigation.propTypes = {
  stop: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

export default Navigation;
