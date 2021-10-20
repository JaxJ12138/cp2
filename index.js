"use strict";

/*
  Name: Zhengxuan Jiang
  Date: Oct 20, 2021
  Section: CSE 154 AG
  TA: Shawn Cho, Alex Larsen
  This is the index.js  for my CSE 154 of web development work.
  It includes a few funcitons that assign and change css properties responsively.
  One function create the rain of men. Two functions to apply dynamic syle to
  the images. One function to refresh the rainy men

*/

(function() {
  window.addEventListener("load", init);
  window.setInterval(timeUpdate, 10);
  window.addEventListener("mousemove",mouseUpdate);

  let x = 0;
  const DISTANCE = ['close','mid','far'];

  // this function set up the page according to the window height and width
  function init() {

    let button = qs('button');

    button.style.top = window.innerHeight*0.8 + "px";
    button.style.left = window.innerWidth*0.5-150 + "px";

    button.addEventListener("click", buttonClick);

    generate();

  }

  // this is the function generating all the falling men
  function generate(){
    let area = window.innerHeight * window.innerWidth;
    let count = area/30000;

    for (let i = 1; i<=count; i++){
      let img = document.createElement('img');
      img.addEventListener("click", clickReaction);

      let index = Math.floor(Math.random()*6+1);
      let dis = Math.floor(Math.random()*10);
      let topCoord = Math.floor(Math.random()*window.innerHeight);
      let rightCoord = Math.floor(Math.random()*window.innerWidth);

      // the image is from www.pngfind.com
      img.src = 'images/man'+index+'.png';
      img.alt = 'the '+index+' man';
      if (dis <= 1){
        img.classList.add(DISTANCE[0],'transition');
      }else if (dis<=4){
        img.classList.add(DISTANCE[1],'transition');
      }else{
        img.classList.add(DISTANCE[2],'transition');
      }


      img.style.top = topCoord + "px";
      img.style.left = rightCoord + "px";

      let parent = id("the-window");
      parent.appendChild(img);
    }
  }

  // This function refreshes the page
  function buttonClick(){
    let parent = id('the-window')
    parent.innerHTML = "";
    generate();

  }

  // this function allows the page to update from time to time
  function timeUpdate(){
    let elements = id('the-window').children;
    for (let i=0; i < elements.length; i++){
      let drop = parseInt(elements[i].style.top);
      let cross = parseInt(elements[i].style.left);
      if (cross > window.innerWidth+10){
        elements[i].style.left = "-9px";
      }else if (cross <= -10){
        elements[i].style.left = window.innerWidth+9+"px";
      }else{
        let displacement = Math.floor(x*10/45.0);
        elements[i].style.left = cross - displacement + "px";
        console.log(x/45.0);
      }

      if (drop > window.innerHeight){
        elements[i].style.top = "-150px";
      }else{
        elements[i].style.top = drop+1 + "px";
      }

    }
  }

  // this function update the orientation of the men according to mouse movement.
  function mouseUpdate(){
    let e = event;
    x = Math.floor(0-(e.clientX - window.innerWidth/2)/window.innerWidth*90);
    let elements = id('the-window').children;
    for (let i=0; i < elements.length; i++){
      elements[i].style.transform = "rotateZ("+ x + "deg)";
    }

  }

  // this function allow viewer to push back the men further till disappearing.
  function clickReaction(){
    if (this.classList.contains('close')){
      this.classList.replace('close','mid');
    }else if(this.classList.contains('mid')){
      this.classList.replace('mid','far');
    }else{
      this.remove();
    }
  }

  /* --- CSE 154 HELPER FUNCTIONS --- */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(identification) {
    return document.getElementById(identification);
  }

  /**
   * Returns first element matching selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} - DOM object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns an array of elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();
