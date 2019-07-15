import React, { Component } from 'react'
import { Header, Table, Button } from 'semantic-ui-react'
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom'
import Movieform from './CreateMovie';
import Route from 'react-router-dom/Route';
import './styles/home.css'
import { fetchApi } from '../config/api';

export class Home extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         movies: [],
         loading: true,
      }
    }
    
componentDidMount(){
    fetchApi('/movies')
    .then(res => {
        const { data } = res;
        this.setState({movies: data.movies, loading: false});
    })
    .catch(err => {
        this.setState({ loading: false });
        })
}
  
onAddMovieClick = () => {
  console.log('i am clicked');
  this.props.history.push({
    pathname: '/movie/create',
    state: {
      id: 7,
      color: 'green'
    }
  })
}

onEditMovie = (movie) => {
  this.props.history.push({
    pathname: '/movie/edit',  
    state: {
      movie
    }
  })
} 



  render() {
      console.log(this.props);
      
    return (
      <div>
        <h1>IMDB</h1>
        <br/>
        <h4>Movies<br/>
          <Button color='green' onClick={this.onAddMovieClick}>Add Movie</Button>
        </h4>
        <br/><br/><br/>
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
               
                    this.state.movies && this.state.movies.map((movie) => {
                             return (
                                <Table.Row>
                                   <Table.Cell singleLine>
                                   <img 
                                      style={{ width: 50, height: 50, marginRight: '10px'}}
                                      src={movie.poster}
                                      alt="Poster"
                                  />
                                   </Table.Cell>  
                                  <Table.Cell>
                                    <Header as='h2' textAlign='center'>
                                    {movie.name}
                                    </Header>
                                  </Table.Cell>
                                  <Table.Cell singleLine>{movie.year}</Table.Cell>
                                  <Table.Cell singleLine>{movie.plot}</Table.Cell>
                                  <Table.Cell singleLine>{
                                   movie.actors.map((actor) => {
                                       return(
                                        <React.Fragment key={movie.id}> 
                                        <li>{actor.name}</li>
                                        </React.Fragment>
                                       )
                                   })
                               }
                               </Table.Cell>
                               <Table.Cell singleLine><Button color='green' onClick={() => this.onEditMovie(movie)}>Edit</Button></Table.Cell>                                                        
                                </Table.Row>
                             )
                            })
            )}
        
        </Table.Body>
        </Table>
        </div>


            )
  }
}

export default Home
