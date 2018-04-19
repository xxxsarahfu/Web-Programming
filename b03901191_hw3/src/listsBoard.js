import React, { Component } from "react";
import TodoList from "./TodoList.js";

class ListsBoard extends Component {
  updateSum = (doo, ali) => {
    this.props.GlobalSumUp(doo, ali);
  };

  render() {
    //這裡用 map function 來迭代 TodoLists，
    //需要留意的是每個迭代的元素必須要有 unique key
    //不然會發生錯誤（可以用自定義 id，或是使用 map function 的第二個參數 index）
    var Lists = this.props.Lists.map(item => (
      <TodoList key={item.key} GlobalSumUp={this.updateSum}>
        {item.val}
      </TodoList>
    ));
    return <div className="w3-animate-left">{Lists}</div>;
  }
}

export default ListsBoard;
