import React, { Component } from 'react';
import CreateMovie from './CreateMovie';

export default class EditMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  render() {
    return (
      <div>
        <CreateMovie movie={this.props.location.state.movie} />
      </div>
    );
  }
}

