// Script to open and close sidebar
function bar_open() {
    if (document.getElementById("mySidebar").style.display === "block"){
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("myOverlay").style.display = "none";
    }
    else{
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("myOverlay").style.display = "block";
    }
}
    
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

// Modal Image Gallery
function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
}

// Accordion 
function myAccFunc1() {
    var x = document.getElementById("demoAcc1");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}
function myAccFunc2() {
    var x = document.getElementById("demoAcc2");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}
function myAccFunc3() {
    var x = document.getElementById("demoAcc3");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

// Click on the "Jeans" link on page load to open the accordion for demo purposes
/*document.getElementById("myBtn").click();*/


function clickpic1(){    
    var div = document.getElementById("tshirtimg");
    var x = document.getElementById("bt1");
    var arr = ["beixinimg","sweaterimg","jerseyimg"];
    var but = ["bt5","bt6","bt4"];
    
    if (div.style.display == "none") {
        div.style.display = "block";
        x.style="background-color:#FFF0D4";
        for (var i=0; i<arr.length;i++){
            document.getElementById(arr[i]).style.display = "none";
            document.getElementById(but[i]).style = "background-color:#FFFFFF";
        }
    } 
    else {
        div.style.display = "none";
        x.style="background-color:#FFFFFF";
    }
}
function clickpic2(){    
    var div = document.getElementById("shortsimg");
    var x = document.getElementById("bt2");
    var arr = ["miniskimg","skirtimg","jerseyimg"];
    var but = ["bt7","bt3","bt4"];
    
    if (div.style.display == "none") {
        div.style.display = "block";
        x.style="background-color:#FFF0D4";
        for (var i=0; i<arr.length;i++){
            document.getElementById(arr[i]).style.display = "none";
            document.getElementById(but[i]).style = "background-color:#FFFFFF";
        }
    } 
    else {
        div.style.display = "none";
        x.style="background-color:#FFFFFF";
    }
}
function clickpic3(){    
    var div = document.getElementById("skirtimg");
    var x = document.getElementById("bt3");
    var arr = ["miniskimg","shortsimg","jerseyimg"];
    var but = ["bt7","bt2","bt4"];
    
    if (div.style.display == "none") {
        div.style.display = "block";
        x.style="background-color:#FFF0D4";
        for (var i=0; i<arr.length;i++){
            document.getElementById(arr[i]).style.display = "none";
            document.getElementById(but[i]).style = "background-color:#FFFFFF";
        }
    } 
    else {
        //document.getElementById("bt3").disabled = true;
        div.style.display = "none";
        x.style="background-color:#FFFFFF";
    }
}
function clickpic4(){    
    var div = document.getElementById("jerseyimg");
    var x = document.getElementById("bt4");
    var arr = ["tshirtimg","shortsimg","skirtimg","beixinimg","sweaterimg","miniskimg","bikiniimg"];
    var but = ["bt1","bt2","bt3","bt5","bt6","bt7","bt8"];
    
    if (div.style.display == "none") {
        div.style.display = "block";
        x.style="background-color:#FFF0D4";
        for (var i=0; i<arr.length;i++){
            document.getElementById(arr[i]).style.display = "none";
            document.getElementById(but[i]).style = "background-color:#FFFFFF";
        }
    } 
    else {
        div.style.display = "none";
        x.style="background-color:#FFFFFF";
    }
}
function clickpic5(){    
    var div = document.getElementById("beixinimg");
    var x = document.getElementById("bt5");
    var arr = ["tshirtimg","sweaterimg","jerseyimg"];
    var but = ["bt1","bt6","bt4"];
    
    if (div.style.display == "none") {
        div.style.display = "block";
        x.style="background-color:#FFF0D4";
        for (var i=0; i<arr.length;i++){
            document.getElementById(arr[i]).style.display = "none";
            document.getElementById(but[i]).style = "background-color:#FFFFFF";
        }
    } 
    else {
        div.style.display = "none";
        x.style="background-color:#FFFFFF";
    }
}
function clickpic6(){    
    var div = document.getElementById("sweaterimg");
    var x = document.getElementById("bt6");
    var arr = ["tshirtimg","beixinimg","Jersey"];
    var but = ["bt1","bt5","bt4"];
    
    if (div.style.display == "none") {
        div.style.display = "block";
        x.style="background-color:#FFF0D4";
        for (var i=0; i<arr.length;i++){
            document.getElementById(arr[i]).style.display = "none";
            document.getElementById(but[i]).style = "background-color:#FFFFFF";
        }
    } 
    else {
        div.style.display = "none";
        x.style="background-color:#FFFFFF";
    }
}

function clickpic7(){    
    var div = document.getElementById("miniskimg");
    var x = document.getElementById("bt7");
    var arr = ["shortsimg","skirtimg","jerseyimg"];
    var but = ["bt2","bt3","bt4"];
    
    if (div.style.display == "none") {
        div.style.display = "block";
        x.style="background-color:#FFF0D4";
        for (var i=0; i<arr.length;i++){
            document.getElementById(arr[i]).style.display = "none";
            document.getElementById(but[i]).style = "background-color:#FFFFFF";
        }
    } 
    else {
        div.style.display = "none";
        x.style="background-color:#FFFFFF";
    }
}

function clickpic8(){    
    var div = document.getElementById("bikiniimg");
    var x = document.getElementById("bt8");
    var arr = ["jerseyimg"];
    var but =["bt4"];
    if (div.style.display == "none") {
        div.style.display = "block";
        x.style="background-color:#FFF0D4";
        for (var i=0; i<arr.length;i++){
            document.getElementById(arr[i]).style.display = "none";
            document.getElementById(but[i]).style = "background-color:#FFFFFF";
        }
    } 
    else {
        div.style.display = "none";
        x.style="background-color:#FFFFFF";
    }
}

//unfinished and unused
function clickPic(clothid) {
    var arr = new Array("tshirtimg","shortsimg","jerseyimg","skirtimg");
    for (var i =0; i < arr.length; i++){
        var div = document.getElementById(arr[i]);
        if (div === clothid){
            if (div.style.display == "none") {
                div.style.display = "block";
            } 
            else {
                div.style.display = "none";
            }
            break;
        }
    }
}

function clickpic(clothid,imgid){    
    var div = document.getElementById(imgid);
    var x = document.getElementById(clothid);
    if (div.style.display == "none") {
        div.style.display = "block";
        x.style="background-color:#FFF0D4";
    } 
    else {
        div.style.display = "none";
        x.style="background-color:#FFFFFF";
    }
}