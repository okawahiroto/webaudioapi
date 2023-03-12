console.log("index.js loaded");

const rangeFrequency = document.getElementById("rangeFrequency");
const radioMajor = document.getElementById("radioMajor");
const radioMinor = document.getElementById("radioMinor");
const buttonOn = document.getElementById("buttonOn");
const buttonThird = document.getElementById("buttonThird");
const buttonFifth = document.getElementById("buttonFifth");
const buttonOff = document.getElementById("buttonOff");
const buttonChange = document.getElementById("buttonChange");

console.log('range:' + rangeFrequency.value);
console.log('radioMajor:' + radioMajor.checked);

// 各オシレーターの周波数を計算
let rootFrequency = rangeFrequency.value;
let third = 5/4;
let fifth = 3/2;

let frequency01 = 440;
let frequency02 = rootFrequency * third;
let frequency03 = rootFrequency * fifth;

// ラジオボタンから長調か短調か判断。デフォルトは長調
function keyCheck(event) {
  if (event.target.id === "radioMajor") {
    console.log("radioMajor");
    third = 5/4;
    fifth = 3/2;
    keyChange();
    console.log("frequency02:" + frequency02);
  } else if(event.target.id === "radioMinor") {
    console.log("radioMinor");
    third = 6/5;
    fifth = 3/2;
    keyChange();
    console.log("frequency02:" + frequency02);
  }
};

// 長調・短調が変わると和音(周波数)を計算し直す。
function keyChange() {
  frequency02 = rootFrequency * third;
  frequency03 = rootFrequency * fifth;
};


radioMajor.addEventListener("change", keyCheck);
radioMinor.addEventListener("change", keyCheck);

// range変更時の値取得
rangeFrequency.addEventListener('input', inputChange);
function inputChange() {
  rootFrequency = rangeFrequency.value;
  frequency01 = rangeFrequency.value;
  console.log('freq01:' + frequency01);
};

console.log('freq01:' + frequency01);

// オシレーターを生成
let audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();
const oscillator01 = audioCtx.createOscillator();
const oscillator02 = audioCtx.createOscillator();
const oscillator03 = audioCtx.createOscillator();

// オシレーターの設定


// ゲインノードの設定
gainNode.gain.value = 0.1;

// 各オシレーターを出力先に接続して、再生開始
gainNode.connect(audioCtx.destination);


//Onボタンクリック時
buttonOn.addEventListener("click", function () {
  console.log("On");
  console.log("frequency01:" + frequency01);
  oscillator01.frequency.value = frequency01;
  oscillator01.type = "sine";
  oscillator01.connect(gainNode);
  oscillator01.start();
});

buttonThird.addEventListener("click", function() {
  console.log("Third");
  console.log("frequency02:" + frequency02);
  oscillator02.frequency.value = frequency02;
  oscillator02.type = "sine";
  oscillator02.connect(gainNode);
  oscillator02.start();
});

buttonFifth.addEventListener("click", function() {
  console.log("Fifth");
  console.log("frequency03:" + frequency03);

  oscillator03.frequency.value = frequency03;
  oscillator03.type = "sine";
  oscillator03.connect(gainNode);
  oscillator03.start();
});

//Offボタンクリック時
buttonOff.addEventListener("click", function () {
  console.log("Off");
  location.reload()
});