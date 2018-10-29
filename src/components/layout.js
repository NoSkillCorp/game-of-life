import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import Game from './game';

const Layout = () => (
  <div>
    <div>
      <Grid>
        <Row>
          <Game />
        </Row>
      </Grid>
    </div>
  </div>
);

export default Layout;
