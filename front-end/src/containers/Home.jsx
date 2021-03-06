import React, { Component } from 'react';
import { Header, Table, Button } from 'semantic-ui-react';
import './styles/home.css';
import { fetchApi } from '../config/api';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      loading: true,
    };
  }

  componentDidMount() {
    fetchApi('/movies')
      .then((res) => {
        const { data } = res;
        this.setState({ movies: data.movies, loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

onAddMovieClick = () => {
  console.log('i am clicked');
  this.props.history.push({
    pathname: '/movie/create',
    state: {
      id: 7,
      color: 'green',
    },
  });
}

onEditMovie = (movie) => {
  this.props.history.push({
    pathname: '/movie/edit',
    state: {
      movie,
    },
  });
}


render() {
  console.log(this.props);

  return (
    <div style={{ width: '80%', marginLeft: '10%', maxWidth: '80%', marginRight: '10%' }}>
      <h1><center>IMDB</center></h1>
      <br />
      <Button color="green" style={{ marginLeft: '10px' }} onClick={this.onAddMovieClick}>Add Movie</Button>

      <h2 style={{ marginLeft: '10px' }}>Movies</h2>
      <br />
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Poster</Table.HeaderCell>
            <Table.HeaderCell singleLine>Movie Name</Table.HeaderCell>
            <Table.HeaderCell>Year of Release</Table.HeaderCell>
            <Table.HeaderCell>Plot</Table.HeaderCell>
            <Table.HeaderCell>Cast</Table.HeaderCell>
            <Table.HeaderCell>Edit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>

          {
            this.state.loading ? (
              <p>Loading</p>
            ) : (

              this.state.movies && this.state.movies.map(movie => (
                <Table.Row>
                  <Table.Cell singleLine>
                    <img
                      style={{ width: 50, height: 50, marginRight: '10px' }}
                      src={movie.poster}
                      alt=""
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Header as="h2" textAlign="center">
                      {movie.name}
                    </Header>
                  </Table.Cell>
                  <Table.Cell singleLine>{movie.year}</Table.Cell>
                  <Table.Cell >{movie.plot}</Table.Cell>
                  <Table.Cell singleLine>{
                    movie.actors.map(actor => (
                      <React.Fragment key={movie.id}>
                        <li>{actor.name}</li>
                      </React.Fragment>
                    ))
                  }
                  </Table.Cell>
                  <Table.Cell singleLine><Button color="green" onClick={() => this.onEditMovie(movie)}>Edit</Button></Table.Cell>
                </Table.Row>
              ))
            )}

        </Table.Body>
      </Table>
    </div>


  );
}
}

export default Home;
