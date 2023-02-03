import {classPrivateMethodGet as $bQRlS$classPrivateMethodGet, classPrivateFieldGet as $bQRlS$classPrivateFieldGet, classPrivateMethodInit as $bQRlS$classPrivateMethodInit, classPrivateFieldInit as $bQRlS$classPrivateFieldInit, classPrivateFieldSet as $bQRlS$classPrivateFieldSet} from "@swc/helpers";



var // Calculates and returns the root mean square of the array.
_rms = /*#__PURE__*/ new WeakSet(), // Finds and returns the first near zero within the array.
_startPosition = /*#__PURE__*/ new WeakSet(), // Finds and returns the last near zero within the array.
_endPosition = /*#__PURE__*/ new WeakSet();
class $b98cf007752bba5c$var$Autocorrelation {
    // Using the strategy defined here.
    // https://github.com/cwilso/PitchDetect/pull/23
    execute() {
        // Reject if RMS is too small.
        const rms1 = $bQRlS$classPrivateMethodGet(this, _rms, rms).call(this, this.buffer);
        if (rms1 < 0.05) return -1;
        // Trim the buffer so that it starts and ends at "zero".
        const startPosition1 = $bQRlS$classPrivateMethodGet(this, _startPosition, startPosition).call(this, this.buffer, 0.2);
        const endPosition1 = $bQRlS$classPrivateMethodGet(this, _endPosition, endPosition).call(this, this.buffer, 0.2);
        this.buffer = this.buffer.slice(startPosition1, endPosition1);
        // Take the dot product of the offsets
        var c = new Array(this.buffer.length).fill(0);
        for(var i = 0; i < this.buffer.length; i++)for(var j = 0; j < this.buffer.length - i; j++)c[i] = c[i] + this.buffer[j] * this.buffer[j + i];
        // Find the maximum value and its position
        var d = 0;
        while(c[d] > c[d + 1])d++;
        var maxval = -1, maxpos = -1;
        for(var i = d; i < this.buffer.length; i++)if (c[i] > maxval) {
            maxval = c[i];
            maxpos = i;
        }
        var T0 = maxpos;
        // Some type of smoothing
        // interpolation is parabolic interpolation. It helps with precision. We suppose that a parabola pass through the three points that comprise the peak. 'a' and 'b' are the unknowns from the linear equation system and b/(2a) is the "error" in the abscissa. Well x1,x2,x3 should be y1,y2,y3 because they are the ordinates.
        var x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
        const a = (x1 + x3 - 2 * x2) / 2;
        const b = (x3 - x1) / 2;
        if (a) T0 = T0 - b / (2 * a);
        // Return the frequency / pitch
        return this.sampleRate / T0;
    }
    constructor(buffer, sampleRate){
        $bQRlS$classPrivateMethodInit(this, _rms);
        $bQRlS$classPrivateMethodInit(this, _startPosition);
        $bQRlS$classPrivateMethodInit(this, _endPosition);
        this.buffer = buffer;
        this.sampleRate = sampleRate;
    }
}
function rms(array) {
    const squares = array.map((value)=>value * value
    );
    const sum = squares.reduce((accumulator, value)=>accumulator + value
    );
    const mean = sum / array.length;
    return Math.sqrt(mean);
}
function startPosition(array, threshold) {
    for(var i = 0; i < array.length / 2; i++){
        if (Math.abs(array[i]) < threshold) return i;
    }
}
function endPosition(array, threshold) {
    for(var i = 1; i < array.length / 2; i++){
        if (Math.abs(array[array.length - i]) < threshold) return array.length - i;
    }
}
var $b98cf007752bba5c$export$2e2bcd8739ae039 = $b98cf007752bba5c$var$Autocorrelation;


var _stream = /*#__PURE__*/ new WeakMap(), _audioContext = /*#__PURE__*/ new WeakMap(), _mediaStreamSource = /*#__PURE__*/ new WeakMap(), _analyser = /*#__PURE__*/ new WeakMap(), _fft_size = /*#__PURE__*/ new WeakMap(), _notes = /*#__PURE__*/ new WeakMap(), _requestMicrophoneAccess = /*#__PURE__*/ new WeakSet(), _createAnalyser = /*#__PURE__*/ new WeakSet(), _draw = /*#__PURE__*/ new WeakSet(), _frequencyToNote = /*#__PURE__*/ new WeakSet();
class $fcbdc18d8cf91bb6$var$GuitarTuner {
    start() {
        $bQRlS$classPrivateMethodGet(this, _requestMicrophoneAccess, requestMicrophoneAccess).call(this);
    }
    stop() {
        const recorder = new MediaRecorder($bQRlS$classPrivateFieldGet(this, _stream));
        recorder.stream.getAudioTracks().forEach(function(track) {
            track.stop();
        });
    }
    setCallback(callback) {
        this.callback = callback;
    }
    constructor(){
        $bQRlS$classPrivateMethodInit(this, _requestMicrophoneAccess);
        $bQRlS$classPrivateMethodInit(this, _createAnalyser);
        $bQRlS$classPrivateMethodInit(this, _draw);
        $bQRlS$classPrivateMethodInit(this, _frequencyToNote);
        $bQRlS$classPrivateFieldInit(this, _stream, {
            writable: true,
            value: void 0
        });
        $bQRlS$classPrivateFieldInit(this, _audioContext, {
            writable: true,
            value: void 0
        });
        $bQRlS$classPrivateFieldInit(this, _mediaStreamSource, {
            writable: true,
            value: void 0
        });
        $bQRlS$classPrivateFieldInit(this, _analyser, {
            writable: true,
            value: void 0
        });
        $bQRlS$classPrivateFieldInit(this, _fft_size, {
            writable: true,
            value: 2048
        });
        $bQRlS$classPrivateFieldInit(this, _notes, {
            writable: true,
            value: [
                "C",
                "C#",
                "D",
                "D#",
                "E",
                "F",
                "F#",
                "G",
                "G#",
                "A",
                "A#",
                "B"
            ]
        });
    }
}
function requestMicrophoneAccess() {
    navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
    }).then((stream)=>{
        $bQRlS$classPrivateFieldSet(this, _stream, stream);
        $bQRlS$classPrivateMethodGet(this, _createAnalyser, createAnalyser).call(this);
        $bQRlS$classPrivateMethodGet(this, _draw, draw).call(this);
    }).catch((error)=>{
        console.log(error);
    });
}
function createAnalyser() {
    $bQRlS$classPrivateFieldSet(this, _audioContext, new AudioContext());
    $bQRlS$classPrivateFieldSet(this, _mediaStreamSource, $bQRlS$classPrivateFieldGet(this, _audioContext).createMediaStreamSource($bQRlS$classPrivateFieldGet(this, _stream)));
    $bQRlS$classPrivateFieldSet(this, _analyser, $bQRlS$classPrivateFieldGet(this, _audioContext).createAnalyser());
    $bQRlS$classPrivateFieldGet(this, _analyser).fftSize = $bQRlS$classPrivateFieldGet(this, _fft_size);
    $bQRlS$classPrivateFieldGet(this, _mediaStreamSource).connect($bQRlS$classPrivateFieldGet(this, _analyser));
}
function draw() {
    requestAnimationFrame(()=>{
        $bQRlS$classPrivateMethodGet(this, _draw, draw).call(this);
    });
    const bufferLength = $bQRlS$classPrivateFieldGet(this, _analyser).fftSize;
    const buffer = new Float32Array(bufferLength);
    $bQRlS$classPrivateFieldGet(this, _analyser).getFloatTimeDomainData(buffer);
    const sampleRate = $bQRlS$classPrivateFieldGet(this, _audioContext).sampleRate;
    const autocorrelation = new $b98cf007752bba5c$export$2e2bcd8739ae039(buffer, sampleRate);
    const frequency = autocorrelation.execute();
    if (frequency === -1) return;
    const note = $bQRlS$classPrivateMethodGet(this, _frequencyToNote, frequencyToNote).call(this, frequency);
    if (typeof this.callback === "function") this.callback(frequency, note);
}
function frequencyToNote(frequency) {
    var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return $bQRlS$classPrivateFieldGet(this, _notes)[(Math.round(noteNum) + 69) % 12];
}
var $fcbdc18d8cf91bb6$export$2e2bcd8739ae039 = $fcbdc18d8cf91bb6$var$GuitarTuner;


export {$fcbdc18d8cf91bb6$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=guitartuner.mjs.map
