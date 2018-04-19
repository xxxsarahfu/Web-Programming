import React, { Component } from "react";

// e: event, oncick. btn

class TodoList_Head extends Component {
  createBtn = e => {
    e.preventDefault();
    const input = this.refs.titleInput.value;
    if (input.length === 0) {
      alert("Input cannot be null!");
      return;
    }
    this.props.addListOrItem(input);
    e.target.reset(); //reset the input box to let user re-enter
  };

  editListOrItem = e => {
    var t = "";
    t = prompt("Type your new title:", this.props.nowText);
    if (t === null) {
      return;
    }
    this.props.editListOrItem(t);
  };

  deleteList = e => {
    const done = -this.props.done;
    const alive = -this.props.alive;
    this.props.GlobalSumUp(done, alive);
    this.props.hideListOrItem();
  };

  render() {
    //<form className="input-group mb-3" onSubmit={e => this.submitCallback(e)}>
    // return (
    //   <div>
    //     <h3 className="listTitle">{this.props.nowText}</h3>
    //     <label className="btn" onClick={this.editListOrItem}>
    //       edit
    //     </label>
    //     <button type="button" className="close" onClick={this.deleteList}>
    //       <span>&times;</span>
    //     </button>

    //     <div className="TodoList_Head" onSubmit={e => this.createBtn(e)}>
    //       <input
    //         type="text"
    //         ref="titleInput"
    //         className="titleInput"
    //         placeholder="Enter to create a new task..."
    //       />
    //       <button type="submit"> Add </button>
    //     </div>
    //   </div>
    // );

    return (
      <div className="card-header">
        <h3 className="card-title">
          <label
            className="w3-opacity w3-hoverable"
            onClick={this.editListOrItem}
          >
            {this.props.nowText}
          </label>

          <button
            type="button"
            className="w3-button "
            onClick={this.deleteList}
          >
            <span>&times;</span>
          </button>
        </h3>

        <form className="input-group mb-3" onSubmit={e => this.createBtn(e)}>
          <input
            ref="titleInput"
            type="text"
            className="form-control"
            placeholder="Enter to create a new task..."
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">
              Add
            </button>
          </div>
        </form>
        <div className="row">
          <div className="col">
            <div className="">
              Done <span className="">{this.props.done} </span>
              out of{" "}
              <span className="">{this.props.alive + this.props.done}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList_Head;
