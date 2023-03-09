console.log("index.js loaded");

const audioCtx = new AudioContext();

const rangeFrequency = document.getElementById("rangeFrequency");
const buttonOn = document.getElementById("buttonOn");
const buttonAdd = document.getElementById("buttonAdd");
const buttonOff = document.getElementById("buttonOff");
const buttonChange = document.getElementById("buttonChange");

console.log(rangeFrequency.value);

let oscNode = new OscillatorNode(audioCtx, { type: 'sine', frequency: rangeFrequency.value });

let gainNode = new GainNode(audioCtx, { gain: 0.1 });
let gainNode2 = new GainNode(audioCtx, { gain: 0.1 });

buttonOff.disabled = true;

//Onボタンクリック時
buttonOn.addEventListener("click", function () {
  console.log("On");
  console.log(rangeFrequency.value);

  oscNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscNode.start();

  buttonOn.disabled = true;
  buttonOff.disabled = false;
  rangeFrequency.disabled = true;
});

//Offボタンクリック時
buttonOff.addEventListener("click", function () {
  console.log("Off");

  oscNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscNode.stop();

  oscNode = new OscillatorNode(audioCtx, { type: 'sine', frequency: rangeFrequency.value });

  buttonOn.disabled = false;
  buttonOff.disabled = true;
  rangeFrequency.disabled = false;
});

// range変更時の値取得
rangeFrequency.addEventListener('input', inputChange);
function inputChange() {
  console.log(rangeFrequency.value);
  oscNode = new OscillatorNode(audioCtx, { type: 'sine', frequency: rangeFrequency.value });
};

buttonAdd.addEventListener("click", function() {
  console.log("Add");
  // oscNode = new OscillatorNode(audioCtx, { type: 'sine', frequency: rangeFrequency.value });
  // console.log(rangeFrequency.value);
});
