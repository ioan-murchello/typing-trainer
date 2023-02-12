"use strict";

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

//keytrainer======================================

var isEvent = false;
var timer_time = document.querySelector(".timer_time");
var index = 0;
var displayedLetters = document.querySelector(".displayed__letters");
var pressedLetters = document.querySelector(".pressed__letters");
var checkbox = document.querySelector("#checkbox");
var mistakes = document.querySelector(".mistakes_sum");
var btn_level = document.querySelector(".level_menu");
var level = btn_level.textContent;

// // dropdown
// function btnLevelHandler() {
//   let ul = document.querySelector(".practice_level");
//   let li = ul.querySelectorAll(".level");

//   btn_level.addEventListener("click", () => {
//     ul.classList.toggle("hide");
//   });

//   li.forEach(el => {
//     el.addEventListener('click', () => {
//       changeLevel(el, btn_level, level, ul);
//     })
//   })

// }

// btnLevelHandler();

//levels
var easy = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "key", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", " "];
var medium = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "key", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", " ", "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="];
var hard = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "key", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", " ", "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];
var str = "";
var i = 0;
var currency_mistakes = "";
var lettersLength = 60;
var dspan;
var span;
function random(level) {
  switch (level) {
    case "easy":
      str = easyLevel();
      break;
    case "medium":
      str = mediumLevel();
      break;
    case "hard":
      str = hardLevel();
      break;
  }
  for (i; i < lettersLength; i++) {
    create(span, displayedLetters, str[i], "forspan");
    create(dspan, pressedLetters, "", "forspan");
  }
}

//game-level-functions

function ran(min, max) {
  return Math.floor(Math.random() * max - min + 1) + min;
}
function easyLevel() {
  var str = "";
  do {
    var randomNum = Math.floor(Math.random() * 4) + 1;
    var _random = easy[Math.floor(Math.random() * easy.length)];
    for (var _i = 0; _i < randomNum; _i++) {
      str += _random;
      if (str.length == lettersLength) break;
    }
  } while (str.length != lettersLength);
  return str;
}
function mediumLevel() {
  var str = "";
  do {
    var randomNum = Math.floor(Math.random() * 2) + 1;
    var _random2 = medium[Math.floor(Math.random() * easy.length)];
    for (var _i2 = 0; _i2 < randomNum; _i2++) {
      str += _random2;
      if (str.length == lettersLength) break;
    }
  } while (str.length != lettersLength);
  return str;
}
function hardLevel() {
  var str = "";
  do {
    var randomNum = Math.floor(Math.random() * 2) + 1;
    var _random3 = hard[ran(0, hard.length - 1)];
    for (var _i3 = 0; _i3 < randomNum; _i3++) {
      str += _random3;
      if (str.length == lettersLength) break;
    }
  } while (str.length != lettersLength);
  return str;
}
function create(el, main, str, clas) {
  el = document.createElement("span");
  el.classList.add(clas);
  el.textContent = str;
  main.append(el);
}
random(level);
document.addEventListener("keyup", function (e) {
  document.querySelectorAll(".num").forEach(function (key) {
    if (e.key == key.textContent) {
      key.classList.remove("active_background");
    }
    if (e.code === "ShiftLeft" && key.getAttribute("data-left") === "left") {
      key.classList.remove("active_background");
    }
    if (e.code === "ShiftRight" && key.getAttribute("data-right") === "right") {
      key.classList.remove("active_background");
    }
    if (e.code === "ShiftRight" && key.getAttribute("data-right") === "right") {
      key.classList.remove("active_background");
    }
    if (e.code === "Space" && key.textContent === "space") {
      key.classList.remove("active_background");
    }
  });
});

//element
var onPressLetter = pressedLetters.querySelectorAll("span");
onPressLetter[0].cssText = "background:#000;color:#000";
onPressLetter[0].textContent = " ";
onPressLetter[index].classList.add("anim");

//el
var letterOnDisplay = displayedLetters.querySelectorAll("span");
letterOnDisplay[index].style.border = "1px solid #fff";
function changeLevel(elem, btn, level, ul) {
  btn.textContent = elem.textContent;
  level = elem.textContent;
  console.log(level);
  random(level);
  wrapper();
  ul.classList.remove("hide");
}
function wrapper() {
  function press(e) {
    document.querySelectorAll(".num").forEach(function (key) {
      if (e.key === key.textContent) {
        key.classList.add("active_background");
      }
      if (e.code === "ShiftLeft" && key.getAttribute("data-shift") === "left") {
        key.classList.add("active_background");
      }
      if (e.code === "ShiftRight" && key.getAttribute("data-shift") === "right") {
        key.classList.add("active_background");
      }
      if (e.code === "Space" && key.textContent === "space") {
        key.classList.add("active_background");
      }
      if (e.target === key.getAttribute('data-key')) {
        console.log('hierrrr');
        key.classList.add("active_background");
      }
    });

    ///////////////////////

    onPressLetter[index].style.color = "#44a9ff";
    if (e.key === "Enter") {
      return;
    }
    onPressLetter[index].textContent = e.key;
    // console.log(document.querySelector('.forspan').clientWidth);
    if (e.key != letterOnDisplay[index].textContent) {
      currency_mistakes++;
      mistakes.textContent = currency_mistakes;
    }
    if (e.key === letterOnDisplay[index].textContent) {
      if (index == 59 && e.key === letterOnDisplay[index].textContent) {
        letterOnDisplay[index].style.border = "1px solid #fff";
        onPressLetter[index].textContent = letterOnDisplay[index].textContent;
        onPressLetter[index].style.color = "#fff";
        onPressLetter[index].classList.remove("anim");
        document.removeEventListener("keypress", press);
        location.reload();
        return;
      }
      letterOnDisplay[index].style.border = "";
      letterOnDisplay[index].style.color = "rgb(155 182 187)";
      letterOnDisplay[index + 1].style.border = "1px solid #fff";
      onPressLetter[index].textContent = letterOnDisplay[index].textContent;
      onPressLetter[index].style.color = "#fff";
      onPressLetter[index].classList.remove("anim");
      onPressLetter[index + 1].classList.add("anim");
      index++;
    }
  }
  document.addEventListener('keypress', press);
}
wrapper();