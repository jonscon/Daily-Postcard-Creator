// Always include at top of Javascript file
"use strict";

function formatPostcard () {
  let url = "formatPostcard";
  
  let xhr = new XMLHttpRequest();
  xhr.open("GET", '/formatPostcard');
  xhr.addEventListener("load", function() {
    let text = JSON.parse(xhr.responseText);
    let info = JSON.parse(text);
    
    //add all info into postcard
    var newImage = document.getElementById("serverImage");
    newImage.src = info.image;
    
    var newMessage = document.getElementById("message");
    newMessage.textContent = info.message;
    
    newMessage.className += info.font;
    newMessage.className += " messageBorder";
    
    var newPostcard = document.getElementById("postcard");
    newPostcard.style.backgroundColor = info.color;

    console.log(info.color);
  })
  
  xhr.send();

}
formatPostcard();
