import React from 'react'
import Game from './game'
import Navigation from './navigation'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import { Grid, Row } from 'react-bootstrap'

class Layout extends React.Component {

  constructor(props){
    super(props);
    document.title = this.props.title;
  }

  render(){
    return(
      <div>
        <div>
          <Navigation />
        </div>
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
