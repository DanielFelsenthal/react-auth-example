import React, { Component } from 'react';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      message: ''
    }
  }

  componentDidMount() {
    fetch('/api/home')
      .then(res => res.text())
      .then(res => this.setState({message: res}));
  }

  render() {
    return (
      <div
      style={{
        display: "grid",
        justifyContent: "center",
        marginTop: "5%",
      }}>
        <h1>Home</h1>
        <p style={{marginLeft:"10%"}}>{this.state.message}</p>
      </div>
    );
  }
}