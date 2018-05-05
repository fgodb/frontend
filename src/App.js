import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ServantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servants: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    fetch("test")
      .then(result => result.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            servants: result.servants
          });
        },

        (error) => {
          console.log(error);
          this.setState({
            isLoaded: false,
            error: error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, servants } = this.state;
    if (error) {
      return <div>Failed to load Servants: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading, please wait.</div>
    } else {
      console.log(servants[0]);
      return(servants.map((servant, index) => (
        <Servant key={index} name={servant["name"]} class={servant.class} />
      )));
    }
  }
}

class Servant extends Component {
  render() {
    return (
      <div className="servant">
        <h1>{this.props.name}</h1>
        <h2>{this.props.class}</h2>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>Hello</h1>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>

        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      <ServantList />
      </div>
    );
  }
}

export default App;
