import React from 'react';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';

class navigation extends React.Component {
  handleClick(eventKey) {
    console.log(eventKey);
  }

  render() {
    return (
      <Nav bsStyle="pills">
        <NavItem eventKey={1} onClick={() => this.handleClick(1)}>
          <Glyphicon glyph="backward" />
        </NavItem>
        <NavItem eventKey={2} onClick={() => this.props.stop()}>
          <Glyphicon glyph="stop" />
        </NavItem>
        <NavItem eventKey={3} onClick={() => this.props.play()}>
          <Glyphicon glyph="play" />
        </NavItem>
        <NavItem eventKey={4} onClick={() => this.props.next()}>
          <Glyphicon glyph="forward" />
        </NavItem>
      </Nav>
    );
  }
}

export default navigation;
