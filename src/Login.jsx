import { Button,TextField } from '@material-ui/core';
import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    //console.log(JSON.stringify(this.state),"Bringie");
    localStorage.setItem('userEm', this.state.email);
    fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div style={{
          display: "grid",
          justifyContent: "center",
          marginTop: "5%",
        }}>
        <h1>Login Below!</h1>
        <TextField
          type="email"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
          as={TextField}
        />
        <TextField
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
        <Button type="submit" variant="contained">Submit</Button>
        </div>
      </form>
    );
  }
}