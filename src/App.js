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
          this.setState({
            isLoaded: true,
            servants: result.servants
          });
        },

        (error) => {
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
      return(servants.map((servant, index) => (
        <Servant key={index} name={servant["name"]} class={servant.class} commandlist={servant.commandlist} />
      )));
    }
  }
}

class CommandCard extends Component {
  getStyle(command) {
    return {
      "A": "arts-blue",
      "Q": "quick-green",
      "B": "buster-red"
    }[command]
  }

  render() {
    return <span className={this.getStyle(this.props.command)}>{this.props.command}</span>
  }
}

class Servant extends Component {
  render() {
    return (
      <div className="servant">
        <h1>{this.props.name}</h1>
        <h2>{this.props.class}</h2>
          {
            this.props.commandlist.map(
              (command, index) => {
                return <CommandCard key={index} command={command} />
              }
            )
          }
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
