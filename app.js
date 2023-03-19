console.log("app.js loaded");

const rangeFrequency = document.getElementById("rangeFrequency");
const radioMajor = document.getElementById("radioMajor");
const radioMinor = document.getElementById("radioMinor");

const buttonOn = document.getElementById("buttonOn");
const buttonThird = document.getElementById("buttonThird");
const buttonFifth = document.getElementById("buttonFifth");
const buttonOff = document.getElementById("buttonOff");
const buttonChange = document.getElementById("buttonChange");

let selectedKey = "keyMajor";
let selectedNote = "A";

// ChatGPTのコード。3つの周波数の配列を準備、calculateFrequencies関数で調性と根音に基づき、3つの周波数を配列で返し(代入し)ている。
let [frequency01, frequency02, frequency03] = calculateFrequencies(selectedKey, selectedNote);

// 初期値を設定する方法。自分だとこうする。ChatGPTのようなコードを書けるようになりたい。
// let [frequency01, frequency02, frequency03] = [440, 550, 660];

console.log(selectedKey + ':' + selectedNote);

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
  console.log(`選択された音は${selectedNote}です。`);
  const frequencies = calculateFrequencies(selectedKey, selectedNote);
  frequency01 = frequencies[0];
  frequency02 = frequencies[1];
  frequency03 = frequencies[2];
  console.log(`frequency: ${frequency01}, ${frequency02}, ${frequency03}`);
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

// range変更時の値取得
rangeFrequency.addEventListener('input', inputChange);
function inputChange() {
  rootFrequency = rangeFrequency.value;
  frequency01 = rangeFrequency.value;
  console.log('frequency01:' + frequency01);
};

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
