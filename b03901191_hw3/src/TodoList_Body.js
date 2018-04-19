import React, { Component } from "react";
import Items from "./Items.js";

class TodoList_Body extends Component {
  updateSum = (doo, ali) => {
    this.props.GlobalSumUp(doo, ali);
  };

  //這裡用 map function 來迭代 Todo items，
  //需要留意的是每個迭代的元素必須要有 unique key
  //不然會發生錯誤（可以用自定義 id，或是使用 map function 的第二個參數 index）
  render() {
    var todoItems = this.props.items.map(item => (
      <Items key={item.key} checked={item.checked} GlobalSumUp={this.updateSum}>
        {item.val}
      </Items>
    ));

    return <div className="Items card-body">{todoItems}</div>;
  }
}

export default TodoList_Body;
