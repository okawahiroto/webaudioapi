console.log("index.js loaded");

const audioCtx = new AudioContext();

const rangeFrequency = document.getElementById("rangeFrequency");
const buttonOn = document.getElementById("buttonOn");
const buttonStop = document.getElementById("buttonStop");

let oscNode = new OscillatorNode(audioCtx, { type: 'sawtooth', frequency: 442 });
let oscNode2 = new OscillatorNode(audioCtx, { type: 'sawtooth', frequency: 500 });

let gainNode = new GainNode(audioCtx, { gain: 0.1 });
let gainNode2 = new GainNode(audioCtx, { gain: 0.1 });

//Onボタンクリック時
buttonOn.addEventListener("click", function () {
  console.log("buttonOn clicked");
  oscNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscNode2.connect(gainNode2);
  gainNode2.connect(audioCtx.destination);
  oscNode.start();
  oscNode2.start();
});

//Offボタンクリック時
buttonStop.addEventListener("click", function () {
  console.log("buttonOff clicked");
  oscNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscNode.stop();
  oscNode2.stop();
  // OscillatorNodeオブジェクトを再生成
  oscNode = new OscillatorNode(audioCtx, { type: 'sawtooth', frequency: 442 });
  oscNode2 = new OscillatorNode(audioCtx, { type: 'sawtooth', frequency: 500 });
});

// range変更時の値取得
rangeFrequency.addEventListener('input', inputChange);
function inputChange() {
  console.log(rangeFrequency.value);
};
