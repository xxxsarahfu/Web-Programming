import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ListsBoard from "./listsBoard.js";
import CreateList from "./CreateList.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      totalDone: 0,
      totalAlive: 0,
      keyNum: 0,
      Lists: []
    };
  }
  //totalItems: totalAlive + totalDone

  addListOrItem = listTitle => {
    // Create List
    const { Lists } = this.state;
    this.setState({
      keyNum: this.state.keyNum + 1
    });
    Lists.push({
      key: "id" + this.state.keyNum,
      val: listTitle
    });
    this.setState({ Lists });
  };

  //doo: number of done items; ali: alive
  updateSum = (doo, ali) => {
    this.setState({
      totalDone: this.state.totalDone + doo,
      totalAlive: this.state.totalAlive + ali
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React TODO List</h1>
        </header>
        <div className="App-intro">
          Done: {this.state.totalDone} Alive: {this.state.totalAlive}
        </div>
        <CreateList addListOrItem={this.addListOrItem} />
        <ListsBoard GlobalSumUp={this.updateSum} Lists={this.state.Lists} />
      </div>
    );
  }
}

export default App;
