import React, { Component } from "react";

class CreatList extends Component {
  createBtn = e => {
    // create List or add task, here list.
    e.preventDefault();
    const titleText = this.refs.titleInput.value;
    if (titleText.length !== 0) {
      this.props.addListOrItem(titleText);
      e.target.reset();
    }
    // this.setState({
    //   styleStatus: {
    //     display: "width:80%"
    //   }
    // });
  };

  render() {
    return (
      <form
        className="w3-row w3-animate-input "
        //style={this.styleStatus}
        onSubmit={e => this.createBtn(e)}
      >
        <input
          ref="titleInput"
          type="text"
          className="w3-threequarter w3-input "
          placeholder="Enter to create a new list..."
        />
        <div className="create">
          <button
            className="w3-quarter w3-btn w3-sand w3-margin-bottom w3-hoverable"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    );
  }
}

export default CreatList;
