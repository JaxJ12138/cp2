"use strict";

/*
*Name: Zhengxuan Jiang
*Date: Oct 20, 2021
*Section: CSE 154 AG
*TA: Shawn Cho, Alex Larsen
*This is the index.js  for my CSE 154 of web development work.
*It includes a few funcitons that assign and change css properties responsively.
*One function create the rain of men. Two functions to apply dynamic syle to
*the images. One function to refresh the rainy men
*/

(function() {
  window.addEventListener("load", init);

  // these are globle variable and constants
  let x = 0;
  const DISTANCE = ['close', 'mid', 'far'];
  const BUFFER = 10;
  const BUTTONDISPLACE = 150;
  const BUTTONX = 0.8;
  const BUTTONY = 0.5;
  const AREAPERMAN = 30000;
  const NUMFORIMG = 6;
  const HORIZONTALSPEED = 10;
  const DEGREE = 45.0;

  // this function set up the page according to the window height and width
  function init() {
    window.setInterval(timeUpdate, BUFFER);
    window.addEventListener("mousemove", mouseUpdate);

    let button = qs('button');

    button.style.top = window.innerHeight * BUTTONX + "px";
    button.style.left = window.innerWidth * BUTTONY - BUTTONDISPLACE + "px";

    button.addEventListener("click", buttonClick);

    generate();

  }

  // this is the function generating all the falling men
  function generate() {
    let area = window.innerHeight * window.innerWidth;
    let count = area / AREAPERMAN;

    for (let i = 1; i <= count; i++) {
      let img = document.createElement('img');
      img.addEventListener("click", clickReaction);

      let index = Math.floor(Math.random() * NUMFORIMG + 1);
      let dis = Math.floor(Math.random() * HORIZONTALSPEED);
      let topCoord = Math.floor(Math.random() * window.innerHeight);
      let rightCoord = Math.floor(Math.random() * window.innerWidth);

      // the image is from www.pngfind.com
      img.src = 'images/man' + index + '.png';
      img.alt = 'the ' + index + ' man';
      if (dis <= 1) {
        img.classList.add(DISTANCE[0], 'transition');
      } else if (dis <= 4) {
        img.classList.add(DISTANCE[1], 'transition');
      } else {
        img.classList.add(DISTANCE[2], 'transition');
      }

      img.style.top = topCoord + "px";
      img.style.left = rightCoord + "px";

      let parent = id("the-window");
      parent.appendChild(img);
    }
  }

  // This function refreshes the page
  function buttonClick() {
    let parent = id('the-window');
    parent.innerHTML = "";
    generate();

  }

  // this function allows the page to update from time to time
  function timeUpdate() {
    let elements = id('the-window').children;
    for (let i = 0; i < elements.length; i++) {
      let drop = parseInt(elements[i].style.top);
      let cross = parseInt(elements[i].style.left);
      if (cross > window.innerWidth + BUFFER) {
        elements[i].style.left = "-9px";
      } else if (cross <= -BUFFER) {
        elements[i].style.left = window.innerWidth + 9 + "px";
      } else {
        let displacement = Math.floor(x * BUFFER / DEGREE);
        elements[i].style.left = cross - displacement + "px";
      }

      if (drop > window.innerHeight) {
        elements[i].style.top = "-100px";
      } else {
        elements[i].style.top = drop + 1 + "px";
      }
    }
  }

  // this function update the orientation of the men according to mouse movement.
  function mouseUpdate() {
    x = Math.floor(0 - (event.clientX - window.innerWidth / 2) / window.innerWidth * 90);
    let elements = id('the-window').children;
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.transform = "rotateZ(" + x + "deg)";
    }

  }

  // this function allow viewer to push back the men further till disappearing.
  function clickReaction() {
    if (this.classList.contains('close')) {
      this.classList.replace('close', 'mid');
    } else if (this.classList.contains('mid')) {
      this.classList.replace('mid', 'far');
    } else {
      this.remove();
    }
  }

  /* --- CSE 154 HELPER FUNCTIONS --- */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} identification - element ID.
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
})();
