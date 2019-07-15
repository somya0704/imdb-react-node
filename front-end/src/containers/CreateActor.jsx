import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { fetchApi } from '../config/api';


export default class CreateActor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sex: 'male',
    };
  }

    handleSexChange = (e, { value }) => this.setState({ sex: value })

    handleInputChange = (event) => {
      const { target } = event;
      const { value, name } = target;
      this.setState({
        [name]: value,
      });
    }

      handleDateChange = (e, data) => {
        this.setState({ dob: data.value });
      }

      onFormSubmit = () => {
        const { name, dob, bio, sex } = this.state;
        const actor = {
          name,
          bio,
          dob,
          sex,
        };
        fetchApi('/actors', { data: actor }, 'post')
          .then((res) => {
            const { data } = res;
            const { actor } = data;
            this.props.onActorCreate(actor);
            this.props.closeModal();
          })
          .catch((err) => {
            console.log(err);
          });
      }

      render() {
        console.log(this.state);

        const { sex } = this.state;
        return (
          <div style={{ width: '80%', marginLeft: '10%', marginTop: '80px' }}>

            <Form>
              <Form.Group widths="equal">
                <Form.Input name="name" fluid label="Actor Name" placeholder="Actor Name" onChange={this.handleInputChange} />
              </Form.Group>
              <Form.Group inline>
                <label>sex</label>
                <Form.Radio
                  label="Male"
                  value="male"
                  checked={sex === 'male'}
                  onChange={this.handleSexChange}
                />
                <Form.Radio
                  label="Female"
                  value="female"
                  checked={sex === 'female'}
                  onChange={this.handleSexChange}
                />
                <Form.Radio
                  label="Other"
                  value="other"
                  checked={sex === 'other'}
                  onChange={this.handleSexChange}
                />
              </Form.Group>

              <Form.Input onChange={this.handleDateChange} fluid label="Date of Birth" type="Date" />

              <Form.TextArea name="bio" onChange={this.handleInputChange} label="Bio" />

              <Button onClick={this.onFormSubmit} color="green">Save</Button>
              <Button onClick={this.props.closeModal} >Cancel</Button>
            </Form>
          </div>
        );
      }
}

