import React from 'react'
import Game from './game'
import { Grid, Row } from 'react-bootstrap'

class Layout extends React.Component {

  render(){
    return(
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
  }
}

export default Layout;
