import React, { Component } from "react";
import TodoList_Head from "./TodoList_Head.js";
import TodoList_Body from "./TodoList_Body.js";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //text:List title or item value
      nowText: this.props.children, //previous, maybe ≠ ""!
      newText: null,
      done: 0,
      alive: 0,
      keyNum: 0,
      styleStatus: { display: "show" },
      items: []
    };
  }

  updateSum = (doo, ali) => {
    this.setState({
      done: this.state.done + doo,
      alive: this.state.alive + ali
    });
    this.props.GlobalSumUp(doo, ali);
  };

  addListOrItem = itemValue => {
    //add item in each list
    console.log(itemValue);
    const { items } = this.state;

    this.setState({
      newText: itemValue,
      alive: this.state.alive + 1,
      keyNum: this.state.keyNum + 1
    });

    items.push({
      key: "id" + this.state.keyNum,
      checked: -1, // -1: unchecked, 1:checked
      val: itemValue
    });

    this.setState({ items });
    this.props.GlobalSumUp(0, 1); // add 0 done, 1 alive.
  };

  editListOrItem = newText => {
    this.setState({ nowText: newText });
  };

  hideListOrItem = () => {
    this.setState({
      styleStatus: { display: "none" }
    });
  };

  render() {
    return (
      <div className="w3-card w3-animate-left" style={this.state.styleStatus}>
        <div className="w3-card w3-pale-blue">
          <TodoList_Head
            done={this.state.done}
            alive={this.state.alive}
            nowText={this.state.nowText}
            addListOrItem={this.addListOrItem}
            GlobalSumUp={this.updateSum}
            hideListOrItem={this.hideListOrItem}
            editListOrItem={this.editListOrItem}
          />
        </div>
        <TodoList_Body items={this.state.items} GlobalSumUp={this.updateSum} />
      </div>
    );
  }
}
export default TodoList;
