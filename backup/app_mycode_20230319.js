console.log("app.js loaded");

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
let frequency02 = frequency01 * third;
let frequency03 = frequency01 * fifth;

// 根音を選択
const radioKeys = document.querySelectorAll('input[name="key"]');
let selectedKey;

// ラジオボタンから長調か短調か判断。デフォルトは長調
for (const radio of radioKeys) {
  radio.addEventListener('change', (event) => {
    selectedKey = event.target.value;
    console.log(`選択された調性は${selectedKey}です。`);
    if (selectedKey === "keyMajor") {
      third = 5/4;
      fifth = 3/2;
      console.log("frequency02:" + frequency02);
    } else if(selectedKey === "keyMinor") {
      third = 6/5;
      fifth = 3/2;
      console.log("frequency02:" + frequency02);
    }
  });
}

// 根音を選択
const radioNotes = document.querySelectorAll('input[name="note"]');
let selectedNote;

for (const radio of radioNotes) {
  radio.addEventListener('change', (event) => {
    selectedNote = event.target.value;
    console.log(`選択された音は${selectedNote}です。`);
    if (selectedNote === "A") {
      frequency01 = 440;
      frequency02 = frequency01 * third;
      frequency03 = frequency01 * fifth;
      console.log("frequency:" + frequency01 + "," + frequency02 + "," + frequency03);
    } else if (selectedNote === "C") {
      frequency01 = 261.63;
      frequency02 = frequency01 * third;
      frequency03 = frequency01 * fifth;
      console.log("frequency:" + frequency01 + "," + frequency02 + "," + frequency03);
    } else if (selectedNote === "F") {
      frequency01 = 349.23;
      frequency02 = frequency01 * third;
      frequency03 = frequency01 * fifth;
      console.log("frequency:" + frequency01 + "," + frequency02 + "," + frequency03);
    } else if (selectedNote === "Bb") {
      frequency01 = 466.16;
      frequency02 = frequency01 * third;
      frequency03 = frequency01 * fifth;
      console.log("frequency:" + frequency01 + "," + frequency02 + "," + frequency03);
    }
  });
};

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

// ゲインノードの設定
gainNode.gain.value = 0.1;

// 出力先に接続して、再生開始(gainNodeは音量を調整するオブジェクト)
gainNode.connect(audioCtx.destination);

//Onボタンクリック時
buttonOn.addEventListener("click", function () {
  console.log("On");
  console.log("frequency01:" + frequency01);

  // オシレーターの設定
  oscillator01.frequency.value = frequency01;
  oscillator01.type = "sine";

  // 各オシレーターを出力先に接続して、再生開始
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

//Offボタンクリック時(リロードしてる。今後、改修する)
buttonOff.addEventListener("click", function () {
  console.log("Off");
  location.reload()
});
