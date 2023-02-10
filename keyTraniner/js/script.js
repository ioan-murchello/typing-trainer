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
var level = "medium";

//levels
var easy = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", " "];
var medium = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", " ", "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="];
var hard = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", " ", "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];
var str = "";
var i = 0;
var currency_mistakes = "";
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
  for (i; i < 41; i++) {
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
      if (str.length == 41) break;
    }
  } while (str.length != 41);
  return str;
}
function mediumLevel() {
  var str = "";
  do {
    var randomNum = Math.floor(Math.random() * 2) + 1;
    var _random2 = medium[Math.floor(Math.random() * easy.length)];
    for (var _i2 = 0; _i2 < randomNum; _i2++) {
      str += _random2;
      if (str.length == 41) break;
    }
  } while (str.length != 41);
  return str;
}
function hardLevel() {
  var str = "";
  do {
    var randomNum = Math.floor(Math.random() * 2) + 1;
    var _random3 = hard[ran(0, hard.length - 1)];
    for (var _i3 = 0; _i3 < randomNum; _i3++) {
      str += _random3;
      if (str.length == 41) break;
    }
  } while (str.length != 41);
  return str;
}
function create(el, main, str, cla) {
  el = document.createElement("span");
  el.classList.add(cla);
  el.textContent = str;
  main.append(el);
}
if (level != "") {
  random(level);
}
document.addEventListener("keyup", function (e) {
  document.querySelectorAll(".num").forEach(function (k) {
    if (e.key == k.textContent) {
      k.classList.remove("active_background");
    }
    if (e.code === "ShiftLeft" && k.getAttribute("data-left") === "left") {
      k.classList.remove("active_background");
    }
    if (e.code === "ShiftRight" && k.getAttribute("data-right") === "right") {
      k.classList.remove("active_background");
    }
    if (e.code === "ShiftRight" && k.getAttribute("data-right") === "right") {
      k.classList.remove("active_background");
    }
    if (e.code === "Space" && k.textContent === "space") {
      k.classList.remove("active_background");
    }
  });
});
var element = pressedLetters.querySelectorAll("span");
element[0].cssText = "background:#000;color:#000";
element[0].textContent = " ";
element[index].classList.add("anim");
var el = displayedLetters.querySelectorAll("span");
el[index].style.border = "1px solid #fff";
function wrapper() {
  function press(e) {
    document.querySelectorAll(".num").forEach(function (k) {
      if (e.key === k.textContent) {
        k.classList.add("active_background");
      }
      if (e.code === "ShiftLeft" && k.getAttribute("data-shift") === "left") {
        k.classList.add("active_background");
      }
      if (e.code === "ShiftRight" && k.getAttribute("data-shift") === "right") {
        k.classList.add("active_background");
      }
      if (e.code === "Space" && k.textContent === "space") {
        k.classList.add("active_background");
      }
    });

    ///////////////////////

    element[index].style.cssText = "color: #81edff;";
    if (e.key === "Enter") {
      return;
    }
    element[index].textContent = e.key;
    console.log(element[index].textContent = e.key);
    if (e.key != el[index].textContent) {
      currency_mistakes++;
      mistakes.textContent = currency_mistakes;
    }
    if (e.key === el[index].textContent) {
      // if(index + 1 == 41) return
      el[index + 1].style.border = "1px solid #fff";
      el[index].style.border = "";
      console.log(el[index]);
      element[index].textContent = el[index].textContent;
      element[index].style.color = "#fff";
      element[index + 1].style.background = "rtansparent";
      element[index + 1].textContent = " ";
      element[index].style.background = "transparent";
      element[index].classList.remove("anim");
      element[index + 1].classList.add("anim");
      index++;
    }
    if (index == 40 && e.key === el[index].textContent) {
      document.removeEventListener("keypress", press);
      element[index].style.background = "";
      el[index].style.background = "";
      location.reload();
    }
  }
  document.addEventListener("keypress", press);
}
wrapper();

// dropdown
function doropdownList() {
  var ul = document.querySelector(".practice_level");
  var li = ul.querySelectorAll(".level");
  btn_level.addEventListener("click", function () {
    ul.classList.toggle("hide");
  });
  li.forEach(function (el) {
    el.addEventListener("click", function () {
      btn_level.textContent = el.textContent;
      level = el.textContent;
      localStorage.setItem("level", level);
      console.log(level);
      wrapper();
      ul.classList.remove("hide");
    });
  });
}
doropdownList();