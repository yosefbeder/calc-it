/*
Algo task
1. Take a string.
2. Solve all * / from it.
3. Solve the end of it as a -+ problem
*/
// DOM Elements
const keyS = document.getElementsByClassName('key');
const keysNum = document.getElementsByClassName('key-num');
const keysSym = document.getElementsByClassName('key-sym');
const keyM = document.querySelector('.key-m');
const keyDelete = document.querySelector('.key-delete');
const keyDeleteAll = document.querySelector('.key-delete-all');
const keyEqual = document.querySelector('.key-equal');
const screen = document.querySelector('.screen');
let ln;
const keyDot = document.querySelector('.key-dot');
const getScreen = function () {
  return screen.textContent;
};

const getLastScreen = function (e = 1) {
  return screen.textContent[screen.textContent.length - e];
};

const getLastNum = function () {
  const screen = getScreen();
  const nums = screen.split('\xa0');
  return nums[nums.length - 1];
};

// Functions
const solveString = function (string) {
  const arr = string.slice(1).split('\xa0');

  const fs = ['/', '*'];
  const ls = ['+', '-'];

  fs.forEach(n => {
    if (arr[arr.length - 1] == '') {
      arr.splice(arr.length - 2, 2);
    }
  });

  const product = function (f, s, l) {
    if (s == '*') return String(+f * +l);
    if (s == '/') return String(+f / +l);
    if (s == '+') return String(+f + +l);
    if (s == '-') return String(+f - +l);
  };

  // loop to finish all / and *

  for (let i = 0; i < arr.length; i++) {
    for (let b = 0; b < fs.length; b++) {
      if (arr[i] == fs[b]) {
        arr.splice(i - 1, 3, product(arr[i - 1], fs[b], arr[i + 1]));
        i = i - 1;
      }
    }
  }

  // loop to finish all + and -

  for (let i = 0; i < arr.length; i++) {
    for (let b = 0; b < ls.length; b++) {
      if (arr[i] == ls[b]) {
        arr.splice(i - 1, 3, product(arr[i - 1], ls[b], arr[i + 1]));
        i = i - 1;
      }
    }
  }

  return `\xa0${arr[0]}`;
};

// Adding functions

const addNum = function (a) {
  screen.textContent = getScreen() + '' + a;
};

const addSym = function (a) {
  if (screen.textContent[screen.textContent.length - 1] != '\xa0') {
    screen.textContent = `${screen.textContent}\xa0${a}\xa0`;
  } else if (getLastScreen() == '\xa0' && screen.textContent.length > 1) {
    dl();
    screen.textContent = `${getScreen()}\xa0${a}\xa0`;
  }
};

const addM = function (a) {
  if (getLastScreen() == '\xa0' && screen.textContent.length > 1) {
    addNum(a);
  } else {
    addSym(a);
  }
};

const reset = function () {
  screen.textContent = '\xa0';
};

const dl = function () {
  ln = screen.textContent.length;
  if (getLastScreen() != '\xa0') {
    screen.textContent = screen.textContent.slice(0, ln - 1);
  } else if (getLastScreen() == '\xa0' && screen.textContent.length != 1) {
    screen.textContent = screen.textContent.slice(0, ln - 3);
  }
};

Array.from(keysNum).forEach(element => {
  element.addEventListener('click', function () {
    if (getLastScreen() == '0' && getLastNum().length == 1) dl();
    addNum(element.textContent);
  });
});

Array.from(keysSym).forEach(element => {
  element.addEventListener('click', function () {
    addSym(element.dataset.value);
  });
});

keyDelete.addEventListener('click', dl);

keyDeleteAll.addEventListener('click', reset);

keyM.addEventListener('click', function () {
  addM(keyM.dataset.value);
});

keyEqual.addEventListener('click', function () {
  screen.textContent = solveString(screen.textContent);
});

keyDot.addEventListener('click', function () {
  // if there's a . in the previus number
  const len = getScreen().split('\xa0').length;
  const ln = getScreen().split('\xa0')[len - 1];
  console.log(ln);
  let is = false;
  for (const l of ln) {
    if (l == '.') is = true;
  }
  if (!is) addNum('.');
});
