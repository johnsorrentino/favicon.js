import GuitarTuner from "../dist/guitartuner.mjs";

const guitarTuner = new GuitarTuner();
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
startButton.addEventListener("click", () => {
  guitarTuner.start();
});
stopButton.addEventListener("click", () => {
  guitarTuner.stop();
});
guitarTuner.setCallback(function (frequency, note) {
  console.log(frequency, note);
});
