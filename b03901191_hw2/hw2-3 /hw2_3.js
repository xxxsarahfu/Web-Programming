
var total_done = document.getElementById("total_done");
var total_dos = 0; //done item num

var total_remain = document.getElementById("total_remain");
var total_rem = 0; //remian num

var Lists = [];


class TodoList {
  constructor(myid, title) {
    this.myDiv = document.getElementById(myid);
    this.myTitle = title;

    this.myList = this.myDiv.getElementsByTagName("LI");
    this.myHeader = this.myDiv.getElementsByClassName("header")[0];
    this.myH2 = this.myDiv.getElementsByTagName("h2")[0];
    this.myAddBtn = this.myDiv.getElementsByClassName("addBtn")[0];

    this.NdoneNum = 0;
    this.doneNum = 0;

    this.TitleName();
    this.CloseBtn();
    // this.DeleteItem();
    this.CheckedItem();
    this.AddBtn();
    
  }
  
  // edit title name 
  TitleName(){
    this.myH2.innerHTML = this.myTitle;
    var tmpDiv = this.myDiv;
    var tmpH2 = this.myH2;

    var mod = this.myDiv.getElementsByClassName("EditTitle")[0];
    var p = "";
    mod.addEventListener('click', function(ev){
      p = prompt("Type your list title:", tmpH2.innerHTML);
      if(p != "")
        tmpH2.innerHTML = p;
    }, false);
  }
  
  // Create a "close" button and append it to each list-item
  CloseBtn() {
    var i;
    for (i = 0; i < this.myList.length; i++) {
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      this.myList[i].appendChild(span);
    }
  }

  // Click x to delete whole list
  addDeleteBtn() {
    var tmpDiv = this.myDiv;
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "closeList";
    span.appendChild(txt);
    var obj = this;

    // this.myHeader.appendChild(span);
    this.myHeader.insertBefore(span, this.myHeader.childNodes[1])

    this.myDiv.getElementsByClassName("closeList")[0];
    span.addEventListener('click', function(ev) {
      // console.log("/");
      tmpDiv.style.display = 'none';
      total_rem -= obj.NdoneNum;
      total_remain.innerHTML = "Remain: " + total_rem;
      console.log(obj.doneNum);
      total_dos -= obj.doneNum;
      total_done.innerHTML = "<br>Total done: " + total_dos;
    }, false);

  }

  // Handle done/rem number counter
  resetNum() {
    var obj = this;
    var close = this.myDiv.getElementsByClassName("close");
    var tmpHeader = this.myHeader;

    total_rem -= obj.NdoneNum;
    total_dos -= obj.doneNum;
    obj.NdoneNum = 0;
    obj.doneNum = 0;

    var i;
    for(i = 0; i < close.length; i++) {
      
      var div = close[i].parentElement;
      if(div.style.display == "none") {
        
        continue;
      } 
      
      if(div.className == "checked") {
        obj.doneNum++;
      } else {
        obj.NdoneNum++;
      } 
    }
    tmpHeader.getElementsByTagName("text")[0].innerHTML = "done " + obj.doneNum + " out of " + (obj.NdoneNum+obj.doneNum);
    total_rem += obj.NdoneNum;
    total_remain.innerHTML = "Remain: " + total_rem;
    total_dos += obj.doneNum;
    total_done.innerHTML = "<br>Total done: " + total_dos;
       
  }

  // Click on a close button to hide the current list item
  DeleteItem() {
    var close = this.myDiv.getElementsByClassName("close");
    var i;
    var tmpDiv = this.myDiv;

    var obj = this;
    var tmpHeader = this.myHeader;
    
    for (i = 0; i < close.length; i++) {
      
      close[i].addEventListener('click', function(ev) {
        
        var div = this.parentElement;
        div.style.display = "none";

        obj.resetNum();
      }, false);
    }
  }

  // Add a "checked" symbol when clicking on a list item
  CheckedItem() {
    var list = this.myDiv.querySelector('ul');
    var obj = this;
    var tmpHeader = this.myHeader;

    list.addEventListener('click', function(ev) {
      if (ev.target.tagName === 'LI') {
        var t = ev.target.classList.toggle('checked');
        if(t) {// true
          obj.NdoneNum--;
          total_rem--;
          obj.doneNum++;
          total_dos++;

          //tmpHeader.getElementsByTagName("text")[0].innerHTML = "unfinished items: " + obj.NdoneNum;
          tmpHeader.getElementsByTagName("text")[0].innerHTML = "done " + obj.doneNum + " out of " + (obj.NdoneNum+obj.doneNum);
          total_remain.innerHTML = "Remain: " + total_rem;
          total_done.innerHTML = "<br>Total done: " + total_dos;
        } 
        else {
          obj.NdoneNum++;
          total_rem++;
          obj.doneNum--;
          total_dos--;

          tmpHeader.getElementsByTagName("text")[0].innerHTML = "done " + obj.doneNum + " out of " + (obj.NdoneNum+obj.doneNum);
          total_remain.innerHTML = "Remain: " + total_rem;
          total_done.innerHTML = "<br>Total done: " + total_dos;
        }
      }
    }, false);
  }

  // Create a new list-item when clicking on the "Add" button
  AddBtn() {
    var tmpDiv = this.myDiv;
    var tmpHeader = this.myHeader;
    var obj = this;

    this.myAddBtn.addEventListener('click', function(ev) {
      var li = document.createElement("li");
      var inputValue = tmpDiv.getElementsByTagName("INPUT")[0].value;
      var t = document.createTextNode(inputValue);
      li.appendChild(t);
      
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");

      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);

      if (inputValue === '') {
        alert("You must write something!");
      } else {
        tmpDiv.getElementsByTagName("UL")[0].appendChild(li);
        obj.NdoneNum++;
        total_rem++;
        tmpHeader.getElementsByTagName("text")[0].innerHTML = "done " + obj.doneNum + " out of " + (obj.NdoneNum+obj.doneNum);
        total_remain.innerHTML = "Remain: " + total_rem;

        
      }
      tmpDiv.getElementsByTagName("INPUT")[0].value = "";

      obj.DeleteItem();

    }, false);
  }
}


toatl_list_num = 0;
var model = new TodoList("list_0", "list_title_0");

document.getElementById("list_0").style.display = 'none'; //list0 is not pushed into Lists!!

var btn = document.getElementById("createBtn");
btn.addEventListener('click', function(ev) {

  var div = document.getElementById("list_0");
  var listName = document.getElementById("listNameInput").value;
 
  clone = div.cloneNode(true); // true: clone all childNodes and all event handlers
  clone.id = "list_" + (++toatl_list_num);
  clone.style.display = ''; // disable 'none'
  document.body.appendChild(clone);
  
  if(listName == ''){
    Lists.push(new TodoList(clone.id, "List " + toatl_list_num));
  } else {
    Lists.push(new TodoList(clone.id, listName));
  }
  Lists[Lists.length - 1].addDeleteBtn();

  document.getElementById("listNameInput").value = "";
}, false);

