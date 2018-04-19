import React, { Component } from "react";

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
      text: this.props.children,
      styleStatus: { display: "show" }
    };
  }
  checkOrNotItem = e => {
    console.log(this.state.checked);
    // (setState(updater, callback))
    this.setState({ checked: this.state.checked === 1 ? -1 : 1 }, () => {
      var chk = this.state.checked;
      if (chk === 1) {
        //checked
        this.setState({
          myClass: "itemcheck",
          text: <s>{this.props.children}</s>
        });
        this.props.GlobalSumUp(+1, -1);
      } else {
        this.setState({
          myClass: "itemcheck",
          text: this.props.children
        });
        this.props.GlobalSumUp(-1, +1);
      }
    });
  };

  deleteItem = e => {
    this.setState({ styleStatus: { display: "none" } }, () => {
      var chk = this.state.checked;
      if (chk === 1) {
        this.props.GlobalSumUp(-1, 0);
      } else {
        this.props.GlobalSumUp(0, -1);
      }
    });
  };

  render() {
    // return (
    //   <div
    //     className=" w3-bar w3-center w3-display-container"
    //     style={this.state.styleStatus}
    //   >
    //     <div className="w3-bar-item w3-ul w3-center">
    //       <li className={this.state.myClass} onClick={this.checkOrNotItem}>
    //         {this.state.text}
    //       </li>
    //     </div>
    //     <div className="w3-bar-item ">
    //       <span
    //         className="w3-button w3-display-right "
    //         onClick={this.deleteItem}
    //       >
    //         <span>&times;</span>
    //       </span>
    //     </div>
    //   </div>
    // );
    return (
      <div
        className=" w3-bar w3-center w3-display-container"
        style={this.state.styleStatus}
      >
        <div className="w3-bar-item w3-ul w3-center w3-large">
          <span className={this.state.myClass} onClick={this.checkOrNotItem}>
            {this.state.text}
          </span>
          <span
            className="w3-button w3-display-right "
            onClick={this.deleteItem}
          >
            &times;
          </span>
        </div>
      </div>
    );
  }
}

export default Items;
