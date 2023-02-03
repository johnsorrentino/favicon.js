import Autocorrelation from "./autocorrelation";

class GuitarTuner {
  #stream;
  #audioContext;
  #mediaStreamSource;
  #analyser;
  #fft_size = 2048;
  #notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  start() {
    this.#requestMicrophoneAccess();
  }

  stop() {
    const recorder = new MediaRecorder(this.#stream);
    recorder.stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });
  }

  setCallback(callback) {
    this.callback = callback;
  }

  #requestMicrophoneAccess() {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        this.#stream = stream;
        this.#createAnalyser();
        this.#draw();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  #createAnalyser() {
    this.#audioContext = new AudioContext();
    this.#mediaStreamSource = this.#audioContext.createMediaStreamSource(
      this.#stream
    );
    this.#analyser = this.#audioContext.createAnalyser();
    this.#analyser.fftSize = this.#fft_size;
    this.#mediaStreamSource.connect(this.#analyser);
  }

  #draw() {
    requestAnimationFrame(() => {
      this.#draw();
    });

    const bufferLength = this.#analyser.fftSize;
    const buffer = new Float32Array(bufferLength);
    this.#analyser.getFloatTimeDomainData(buffer);
    const sampleRate = this.#audioContext.sampleRate;
    const autocorrelation = new Autocorrelation(buffer, sampleRate);
    const frequency = autocorrelation.execute();
    if (frequency === -1) return;

    const note = this.#frequencyToNote(frequency);
    if (typeof this.callback === "function") this.callback(frequency, note);
  }

  #frequencyToNote(frequency) {
    var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return this.#notes[(Math.round(noteNum) + 69) % 12];
  }
}

export default GuitarTuner;
