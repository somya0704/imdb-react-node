import React, { Component } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import { fetchApi } from '../config/api';
import Modal from 'react-modal';
import { Redirect } from 'react-router-dom';
import CreateActor from './CreateActor';
import { Home } from './Home';

const customStyles = {
  content: {
    top: '10%',
    width: '50%',
    left: '25%',
    bottom: 'auto',
  },
};


export default class CreateMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actors: [],
      posterData: null,
      localPosterUrl: null,
      isActorCreateModalOpen: false,
      selectedActorsDropdown: [],
      toHome: true,
    };
  }

  componentDidMount() {
    fetchApi('/actors')
      .then((res) => {
        const { data } = res;
        const { actors } = data;
        for (let index = 0; index < actors.length; index++) {
          const actor = actors[index];
          actor.key = actor._id;
          actor.text = actor.name;
          actor.value = actor._id;
        }
        this.setState({ actors });
      })
      .catch((err) => {
        console.log(err);
      });
    const { movie } = this.props;
    if (movie) {
      const arrOfSelectedActorsId = [];
      const { actors } = movie;
      if (actors) {
        for (let index = 0; index < actors.length; index++) {
          const actor = actors[index];
          arrOfSelectedActorsId.push(actor._id);
        }
      }
      this.setState({
        name: movie.name,
        year: movie.year,
        localPosterUrl: movie.poster,
        plot: movie.plot,
        selectedActorsDropdown: arrOfSelectedActorsId,
      });
    }
  }

  handleInputChange = (event) => {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };


  onActorSelect = (e, data) => {
    console.log(data);
    this.setState({ selectedActors: data.value, selectedActorsDropdown: data.value });
  }

onChange = (e) => {
  this.setState({
    posterData: e.target.files[0],
    localPosterUrl: URL.createObjectURL(e.target.files[0]),
  });
}

  onFormSubmit = () => {
    const { name, year, selectedActors, posterData, plot } = this.state;
    const movie = {
      name,
      year,
      plot,
      actors: selectedActors,
    };


    const formData = new FormData();
    if (posterData) {
      formData.append('poster', posterData);
    }
    formData.append('data', JSON.stringify(movie));
    if (this.props.movie) { // Updating movie
      fetchApi(`/movies/${this.props.movie._id}`, formData, 'put')
        .then((res) => {
          window.location.href = '/';
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else { // Create movie
      fetchApi('/movies', formData, 'post')
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  onMovieFormCancel = () => {
    window.location.href = '/';
  };


  onAddActorClick = () => {
    this.setState({ isActorCreateModalOpen: true });
  }

  addActorToState = (actor) => {
    console.log('actor', actor);
    actor.key = actor._id;
    actor.text = actor.name;
    actor.value = actor._id;

    const { actors } = this.state;

    actors.push(actor);
    console.log('actors', actors);

    this.setState({ actors });
  }

  render() {
    console.log(this.state);

    const { localPosterUrl, actors, isActorCreateModalOpen, name, year, plot, selectedActorsDropdown } = this.state;
    return (
      <div>
        <h4><center>Create Movie</center></h4>
        <div style={{ width: '80%', marginLeft: '10%', marginTop: '80px' }}>

          <Form>
            <Form.Input required name="name" fluid label="Movie Name" placeholder="Movie Name" value={name} onChange={this.handleInputChange} />
            <Form.Input required name="year" type="number" fluid label="Year of release" placeholder="Year of release" value={year} onChange={this.handleInputChange} />
            <Form.TextArea name="plot" fluid label="Plot" placeholder="Plot" value={plot} onChange={this.handleInputChange} />
            {
              localPosterUrl && (
                <img
                  style={{ width: 50, height: 50, marginRight: '10px' }}
                  src={localPosterUrl}
                  alt="Poster"
                />
              )
            }

            <input type="file" style={{ display: 'none' }} name="image" onChange={this.onChange} ref={abc => this.fileInput = abc} />
            <Button style={{ marginBottom: '10px' }} onClick={() => this.fileInput.click()}>Choose poster</Button>
            <Form.Group inline>
              <Dropdown
                placeholder="Actors"
                fluid
                multiple
                search
                selection
                onChange={this.onActorSelect}
                options={actors}
                value={selectedActorsDropdown}
              />
              <Form.Field>
                <Button color="green" style={{ marginLeft: '10px' }} onClick={this.onAddActorClick}>Add New Actor</Button>
              </Form.Field>
            </Form.Group>
            <Form.Group inline>
              <Form.Field>
                <Button onClick={this.onFormSubmit} color="green">Save</Button>
              </Form.Field>
            </Form.Group>
          </Form>

          <Modal
            isOpen={isActorCreateModalOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="New Actor"
          >
            <CreateActor
              closeModal={() => this.setState({ isActorCreateModalOpen: false })}
              onActorCreate={this.addActorToState}
            />
          </Modal>
          <Button onClick={this.onMovieFormCancel} >Cancel</Button>

        </div>
      </div>
    );
  }
}
