import React, { Component } from 'react';
import CreateMovie from './CreateMovie';
import { fetchApi } from '../config/api';

export default class EditMovie extends Component {
constructor(props) {
  super(props)

  this.state = {
     movies: []
  }
}



  render() {
    return (
      <div>
        <CreateMovie movie={this.props.location.state.movie}/>
      </div>
    )
  }
}


