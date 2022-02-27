
// Always include at top of Javascript file
"use strict";

// attach chooseImage Label
var label = document.getElementById("label");
label.className = " chooseLabel";
var controls = document.getElementById("controls");
controls.className = " controls";

// UPLOAD IMAGE using a post request
// Called by the event listener that is waiting for a file to be chosen
function uploadFile() {
  
    // get the file chosen by the file dialog control
    const selectedFile = document.getElementById('fileChooser').files[0];
    // store it in a FormData object
    const formData = new FormData();
    // name of field, the file itself, and its name
    formData.append('newImage',selectedFile, selectedFile.name);

    // build a browser-style HTTP request data structure
    const xhr = new XMLHttpRequest();
    // it will be a POST request, the URL will this page's URL+"/upload" 
    xhr.open("POST", "/upload", true);
  
    // callback function executed when the HTTP response comes back
    xhr.onloadend = function(e) {
        // Get the server's response body
        console.log(xhr.responseText);
        
        //reconfigure button to replace image
        controls.className = controls.className.replace(" controls", " newControls");
        label.textContent = "Replace Image";
        label.className = label.className.replace(" chooseLabel", " replaceLabel");
      
        //for mobile view: add border when image uploads
        var mobileMessage = document.getElementById("message");
        mobileMessage.className += " messageBorder";
        //console.log(mobileMessage.className);
        
        // now that the image is on the server, we can display it!
        let newImage = document.getElementById("serverImage");
        newImage.src = "../images/"+selectedFile.name;
    }
    
    // actually send the request
    xhr.send(formData);
    var changeLabelTo = document.getElementById("label");
    changeLabelTo.textContent = "Uploading...";
}
// Add event listener to the file input element
document.getElementById("fileChooser").addEventListener("change",uploadFile);

//Share postcard using POST request
//Called by the event listener that is waiting for the "Share Postcard" button to be clicked
function sharePostcard() {
    const xhr = new XMLHttpRequest();
    // POST request
    xhr.open("POST", "/sharePostcard", true);
    // callback function executed when the HTTP response comes back
    xhr.onloadend = function(e) {
        // Get the server's response body
        //let myResult = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
    }
    // get all of the necessary info to include in send request: image, message, font, color
    //image
    var imageName = document.getElementById("serverImage").src;
    console.log(imageName);
    
    //message
    var messageID = document.getElementById("message");
    var message = messageID.textContent;
    
    //font
    var fontID = document.getElementsByClassName("active")[0].id;
    //const fontStyle = getComputedStyle(fontID).getPropertyValue("font-family");
    
    //color
    const squareID = document.getElementsByClassName("chosenSquare")[0];
    const style = getComputedStyle(squareID);
    const backgroundColor = style.backgroundColor;
    
  
    // actually send the request
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    //xhr.send(JSON.stringify({num1: 12, num2: 12}));
    xhr.send(JSON.stringify({image: imageName, message: message, font: fontID, color: backgroundColor}));
}
document.getElementById("sharePostcard").addEventListener("click", function () {
  sharePostcard();
  window.location.href = 'bow-acute-brother-display.html';
});



// function for changing the font
changeFont('indieFlower')
function changeFont(fontStyle) {
  	
  var message = document.getElementById("message");
  var lastUsedFont = message.className;
  //console.log(lastUsedFont);
  
  if (message.classList.contains("messageBorder")) { 
    //console.log("has border: readding");
    message.className = message.className.replace(lastUsedFont, "");
    message.className += fontStyle;
    message.className += " messageBorder";
  }
  else {
    //console.log("no border");
    message.className = message.className.replace(lastUsedFont, "");
	  message.className += fontStyle;
  }
  
	var selectedFont = document.getElementsByTagName("li");
	var i = 0;
	for (i = 0; i < 4; i++) {
		selectedFont[i].className = selectedFont[i].className.replace(" active", "");
	}
	if (fontStyle == 'indieFlower') {
		selectedFont[0].className = " active";
	}
	else if (fontStyle == 'dancingScript') {
		selectedFont[1].className = " active";
	}
	else if (fontStyle == 'longCang') {
		selectedFont[2].className = " active";
	}
	else if (fontStyle == 'homemadeApple') {
		selectedFont[3].className = " active";
	}		
}

// function for changing color of postcard
changeColor('square1');
function changeColor(color) {
	var postcard = document.getElementById("postcard");
  var square = document.getElementById(color);

	postcard.className = postcard.className.replace(color, "");
	postcard.className = color;
  var mobileChosenSquare = document.getElementsByClassName("mobileSquareChosen");

  for (var i = 0; i < 9; i++) {
		var chosenSquare = document.getElementsByClassName("chosenSquare");
		if (chosenSquare.length > 0) {
			chosenSquare[0].className = chosenSquare[0].className.replace(" chosenSquare", "");
		}
    
    if (mobileChosenSquare.length > 0) {
			mobileChosenSquare[0].className = mobileChosenSquare[0].className.replace(" mobileSquareChosen", "");
		}
		square.className += " chosenSquare";
    square.className += " mobileSquareChosen";
	}
}


//hover functions and event listeners
function hoverSquare1() {
  document.getElementById("postcard").style.backgroundColor = "#e6e2cf";
}
function leaveSquare1() {
  document.getElementById("postcard").style.backgroundColor = null;
}
document.getElementById("square1").addEventListener("mouseover", hoverSquare1);
document.getElementById("square1").addEventListener("mouseleave", leaveSquare1);

function hoverSquare2() {
  document.getElementById("postcard").style.backgroundColor = "#dbcaac";
}
function leaveSquare2() {
  document.getElementById("postcard").style.backgroundColor = null;
}
document.getElementById("square2").addEventListener("mouseover", hoverSquare2);
document.getElementById("square2").addEventListener("mouseleave", leaveSquare2);

function hoverSquare3() {
  document.getElementById("postcard").style.backgroundColor = "#c9cbb3";
}
function leaveSquare3() {
  document.getElementById("postcard").style.backgroundColor = null;
}
document.getElementById("square3").addEventListener("mouseover", hoverSquare3);
document.getElementById("square3").addEventListener("mouseleave", leaveSquare3);

function hoverSquare4() {
  document.getElementById("postcard").style.backgroundColor = "#bbc9ca";
}
function leaveSquare4() {
  document.getElementById("postcard").style.backgroundColor = null;
}
document.getElementById("square4").addEventListener("mouseover", hoverSquare4);
document.getElementById("square4").addEventListener("mouseleave", leaveSquare4);

function hoverSquare5() {
  document.getElementById("postcard").style.backgroundColor = "#a6a5b5";
}
function leaveSquare5() {
  document.getElementById("postcard").style.backgroundColor = null;
}
document.getElementById("square5").addEventListener("mouseover", hoverSquare5);
document.getElementById("square5").addEventListener("mouseleave", leaveSquare5);

function hoverSquare6() {
  document.getElementById("postcard").style.backgroundColor = "#b5a6ab";
}
function leaveSquare6() {
  document.getElementById("postcard").style.backgroundColor = null;
}
document.getElementById("square6").addEventListener("mouseover", hoverSquare6);
document.getElementById("square6").addEventListener("mouseleave", leaveSquare6);

function hoverSquare7() {
  document.getElementById("postcard").style.backgroundColor = "#eccfcf";
}
function leaveSquare7() {
  document.getElementById("postcard").style.backgroundColor = null;
}
document.getElementById("square7").addEventListener("mouseover", hoverSquare7);
document.getElementById("square7").addEventListener("mouseleave", leaveSquare7);

function hoverSquare8() {
  document.getElementById("postcard").style.backgroundColor = "#eceeeb";
}
function leaveSquare8() {
  document.getElementById("postcard").style.backgroundColor = null;
}
document.getElementById("square8").addEventListener("mouseover", hoverSquare8);
document.getElementById("square8").addEventListener("mouseleave", leaveSquare8);

function hoverSquare9() {
  document.getElementById("postcard").style.backgroundColor = "#bab9b5";
}
function leaveSquare9() {
  document.getElementById("postcard").style.backgroundColor = null;
}
document.getElementById("square9").addEventListener("mouseover", hoverSquare9);
document.getElementById("square9").addEventListener("mouseleave", leaveSquare9);