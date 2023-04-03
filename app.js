console.log("app.js loaded");

const tuningFrequency = document.getElementById("tuningFrequency");
const rangeFrequency = document.getElementById("rangeFrequency");
const radioMajor = document.getElementById("radioMajor");
const radioMinor = document.getElementById("radioMinor");

const buttonRoot = document.getElementById("buttonRoot");
const buttonThird = document.getElementById("buttonThird");
const buttonFifth = document.getElementById("buttonFifth");
const buttonOff = document.getElementById("buttonOff");

let rootOn = false;
let thirdOn = false;
let fifthOn = false;

let selectedKey = "keyMajor";
let selectedNote = "A";

// ChatGPT 3つの周波数の配列を準備、calculateFrequencies関数で調性と根音に基づき、3つの周波数を配列で返し(代入し)ている。
let [frequency01, frequency02, frequency03] = calculateFrequencies(selectedKey, selectedNote);

// 自分のコード
// let [frequency01, frequency02, frequency03] = [440, 550, 660];

console.log(tuningFrequency.value);
console.log(selectedKey + ':' + selectedNote);

tuningFrequency.addEventListener("input", () => {
  const tuningFrequencyValue = tuningFrequency.value;
  console.log(tuningFrequencyValue);
});

// 各オシレーターの周波数を計算
function calculateFrequencies(key, note) {
  let third, fifth;
  if (key === "keyMajor") {
    third = 5/4;
    fifth = 3/2;
  } else {
    third = 6/5;
    fifth = 3/2;
  }
  let frequency01, frequency02, frequency03;
  switch(note) {
    case "A":
      frequency01 = 440;
      break;
    case "C":
      frequency01 = 261.63;
      break;
    case "F":
      frequency01 = 349.23;
      break;
    case "Bb":
      frequency01 = 466.16;
      break;
    default:
      frequency01 = 440;
  }
  frequency02 = frequency01 * third;
  frequency03 = frequency01 * fifth;
  return [frequency01, frequency02, frequency03];
}

// 調性・根音変更時の処理
function updateFrequencies() {
  console.log(`選択された調性は${selectedKey}です。`);
  console.log(`選択された根音は${selectedNote}です。`);
  const frequencies = calculateFrequencies(selectedKey, selectedNote);
  frequency01 = frequencies[0];
  frequency02 = frequencies[1];
  frequency03 = frequencies[2];
  console.log(`frequency: ${frequency01}, ${frequency02}, ${frequency03}`);

  if (rootOn) {
    resetButtonRoot();
  }
  if (thirdOn) {
    resetButtonThird();
  }
  if (fifthOn) {
    resetButtonFifth();
  }

}

// 調性を選んだとき
const radioKeys = document.querySelectorAll('input[name="key"]');
for (const radio of radioKeys) {
  radio.addEventListener('change', (event) => {
    selectedKey = event.target.value;
    updateFrequencies();
    console.log(selectedKey + ':' + selectedNote);
  });
}

// 根音を選んだときの処理
const radioNotes = document.querySelectorAll('input[name="note"]');
for (const radio of radioNotes) {
  radio.addEventListener('change', (event) => {
    selectedNote = event.target.value;
    updateFrequencies();
    console.log(selectedKey + ':' + selectedNote);
  });
}

// range変更時の値取得。今後、音量やピッチの変更などに利用するかも。
// rangeFrequency.addEventListener('input', inputChange);
// function inputChange() {
//   rootFrequency = rangeFrequency.value;
//   frequency01 = rangeFrequency.value;
//   console.log('frequency01:' + frequency01);
// };

// オシレーターを生成
let audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();
let oscillator01 = audioCtx.createOscillator();
let oscillator02 = audioCtx.createOscillator();
let oscillator03 = audioCtx.createOscillator();

// ゲインノードの設定
gainNode.gain.value = 0.1;

// 出力先に接続して、再生開始(gainNodeは音量を調整するオブジェクト)
gainNode.connect(audioCtx.destination);

// ボタンクリック時の処理
buttonRoot.addEventListener("click", function () {
  console.log("Root");
  rootOn = !rootOn;
  if (rootOn) {
    oscillator01.frequency.value = frequency01;
    oscillator01.type = "sine";
    oscillator01.connect(gainNode);
    oscillator01.start();
    buttonRoot.classList.remove("btn-secondary");
    buttonRoot.classList.add("btn-danger");
    console.log(rootOn);

  } else {
    resetButtonRoot();
  }
});

buttonThird.addEventListener("click", function () {
  console.log("Third");
  thirdOn = !thirdOn;
  if (thirdOn) {
    oscillator02.frequency.value = frequency02;
    oscillator02.type = "sine";
    oscillator02.connect(gainNode);
    oscillator02.start();
    buttonThird.classList.remove("btn-secondary");
    buttonThird.classList.add("btn-danger");
  } else {
    resetButtonThird();
  }
});

buttonFifth.addEventListener("click", function () {
  console.log("Fifth");
  fifthOn = !fifthOn;
  if (fifthOn) {
    oscillator03.frequency.value = frequency03;
    oscillator03.type = "sine";
    oscillator03.connect(gainNode);
    oscillator03.start();
    buttonFifth.classList.remove("btn-secondary");
    buttonFifth.classList.add("btn-danger");
  } else {
    resetButtonFifth();
  }
});

//Offボタンクリック時(リロードしてる。今後、改修する)
buttonOff.addEventListener("click", function() {
  console.log("Off");
  if (rootOn) {
    resetButtonRoot();
  }
  if (thirdOn) {
    resetButtonThird();
  }
  if (fifthOn) {
    resetButtonFifth();
  }
});

// ボタン初期化
function resetButtonRoot() {
  rootOn = false;
  oscillator01.stop();
  buttonRoot.classList.remove("btn-danger");
  buttonRoot.classList.add("btn-secondary");
  oscillator01 = audioCtx.createOscillator();
}

function resetButtonThird() {
  thirdOn = false;
  oscillator02.stop();
  buttonThird.classList.remove("btn-danger");
  buttonThird.classList.add("btn-secondary");
  oscillator02 = audioCtx.createOscillator();
}

function resetButtonFifth() {
  fifthOn = false;
  oscillator03.stop();
  buttonFifth.classList.remove("btn-danger");
  buttonFifth.classList.add("btn-secondary");
  oscillator03 = audioCtx.createOscillator();
}
