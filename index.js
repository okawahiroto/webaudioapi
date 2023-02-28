console.log("index.js loaded");

const audioCtx = new AudioContext();
let oscNode = new OscillatorNode(audioCtx, { type: 'sawtooth', frequency: 442 });
let gainNode = new GainNode(audioCtx, { gain: 0.5 });

const buttonOn = document.getElementById("buttonOn");
const buttonStop = document.getElementById("buttonStop");

buttonOn.addEventListener("click", function () {
  console.log("buttonOn clicked");
  oscNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscNode.start();
});

buttonStop.addEventListener("click", function () {
  console.log("buttonOff clicked");
  oscNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscNode.stop();
  // OscillatorNodeオブジェクトを再生成
  oscNode = new OscillatorNode(audioCtx, { type: 'sawtooth', frequency: 442 });
});
