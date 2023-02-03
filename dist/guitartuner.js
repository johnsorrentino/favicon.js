var $dHH5r$swchelpers = require("@swc/helpers");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", function () { return $d46c26c6573bc7a1$export$2e2bcd8739ae039; });


var // Calculates and returns the root mean square of the array.
_rms = /*#__PURE__*/ new WeakSet(), // Finds and returns the first near zero within the array.
_startPosition = /*#__PURE__*/ new WeakSet(), // Finds and returns the last near zero within the array.
_endPosition = /*#__PURE__*/ new WeakSet();
var $688c26de1b3e08ab$var$Autocorrelation = /*#__PURE__*/ function() {
    "use strict";
    function $688c26de1b3e08ab$var$Autocorrelation(buffer, sampleRate) {
        $dHH5r$swchelpers.classCallCheck(this, $688c26de1b3e08ab$var$Autocorrelation);
        $dHH5r$swchelpers.classPrivateMethodInit(this, _rms);
        $dHH5r$swchelpers.classPrivateMethodInit(this, _startPosition);
        $dHH5r$swchelpers.classPrivateMethodInit(this, _endPosition);
        this.buffer = buffer;
        this.sampleRate = sampleRate;
    }
    $dHH5r$swchelpers.createClass($688c26de1b3e08ab$var$Autocorrelation, [
        {
            // Using the strategy defined here.
            // https://github.com/cwilso/PitchDetect/pull/23
            key: "execute",
            value: function execute() {
                // Reject if RMS is too small.
                var _$rms = $dHH5r$swchelpers.classPrivateMethodGet(this, _rms, rms).call(this, this.buffer);
                if (_$rms < 0.05) return -1;
                // Trim the buffer so that it starts and ends at "zero".
                var _$startPosition = $dHH5r$swchelpers.classPrivateMethodGet(this, _startPosition, startPosition).call(this, this.buffer, 0.2);
                var _$endPosition = $dHH5r$swchelpers.classPrivateMethodGet(this, _endPosition, endPosition).call(this, this.buffer, 0.2);
                this.buffer = this.buffer.slice(_$startPosition, _$endPosition);
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
                var a = (x1 + x3 - 2 * x2) / 2;
                var b = (x3 - x1) / 2;
                if (a) T0 = T0 - b / (2 * a);
                // Return the frequency / pitch
                return this.sampleRate / T0;
            }
        }
    ]);
    return $688c26de1b3e08ab$var$Autocorrelation;
}();
function rms(array) {
    var squares = array.map(function(value) {
        return value * value;
    });
    var sum = squares.reduce(function(accumulator, value) {
        return accumulator + value;
    });
    var mean = sum / array.length;
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
var $688c26de1b3e08ab$export$2e2bcd8739ae039 = $688c26de1b3e08ab$var$Autocorrelation;


var _stream = /*#__PURE__*/ new WeakMap(), _audioContext = /*#__PURE__*/ new WeakMap(), _mediaStreamSource = /*#__PURE__*/ new WeakMap(), _analyser = /*#__PURE__*/ new WeakMap(), _fft_size = /*#__PURE__*/ new WeakMap(), _notes = /*#__PURE__*/ new WeakMap(), _requestMicrophoneAccess = /*#__PURE__*/ new WeakSet(), _createAnalyser = /*#__PURE__*/ new WeakSet(), _draw = /*#__PURE__*/ new WeakSet(), _frequencyToNote = /*#__PURE__*/ new WeakSet();
var $d46c26c6573bc7a1$var$GuitarTuner = /*#__PURE__*/ function() {
    "use strict";
    function $d46c26c6573bc7a1$var$GuitarTuner() {
        $dHH5r$swchelpers.classCallCheck(this, $d46c26c6573bc7a1$var$GuitarTuner);
        $dHH5r$swchelpers.classPrivateMethodInit(this, _requestMicrophoneAccess);
        $dHH5r$swchelpers.classPrivateMethodInit(this, _createAnalyser);
        $dHH5r$swchelpers.classPrivateMethodInit(this, _draw);
        $dHH5r$swchelpers.classPrivateMethodInit(this, _frequencyToNote);
        $dHH5r$swchelpers.classPrivateFieldInit(this, _stream, {
            writable: true,
            value: void 0
        });
        $dHH5r$swchelpers.classPrivateFieldInit(this, _audioContext, {
            writable: true,
            value: void 0
        });
        $dHH5r$swchelpers.classPrivateFieldInit(this, _mediaStreamSource, {
            writable: true,
            value: void 0
        });
        $dHH5r$swchelpers.classPrivateFieldInit(this, _analyser, {
            writable: true,
            value: void 0
        });
        $dHH5r$swchelpers.classPrivateFieldInit(this, _fft_size, {
            writable: true,
            value: 2048
        });
        $dHH5r$swchelpers.classPrivateFieldInit(this, _notes, {
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
    $dHH5r$swchelpers.createClass($d46c26c6573bc7a1$var$GuitarTuner, [
        {
            key: "start",
            value: function start() {
                $dHH5r$swchelpers.classPrivateMethodGet(this, _requestMicrophoneAccess, requestMicrophoneAccess).call(this);
            }
        },
        {
            key: "stop",
            value: function stop() {
                var recorder = new MediaRecorder($dHH5r$swchelpers.classPrivateFieldGet(this, _stream));
                recorder.stream.getAudioTracks().forEach(function(track) {
                    track.stop();
                });
            }
        },
        {
            key: "setCallback",
            value: function setCallback(callback) {
                this.callback = callback;
            }
        }
    ]);
    return $d46c26c6573bc7a1$var$GuitarTuner;
}();
function requestMicrophoneAccess() {
    var _this = this;
    navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
    }).then(function(stream) {
        $dHH5r$swchelpers.classPrivateFieldSet(_this, _stream, stream);
        $dHH5r$swchelpers.classPrivateMethodGet(_this, _createAnalyser, createAnalyser).call(_this);
        $dHH5r$swchelpers.classPrivateMethodGet(_this, _draw, draw).call(_this);
    }).catch(function(error) {
        console.log(error);
    });
}
function createAnalyser() {
    $dHH5r$swchelpers.classPrivateFieldSet(this, _audioContext, new AudioContext());
    $dHH5r$swchelpers.classPrivateFieldSet(this, _mediaStreamSource, $dHH5r$swchelpers.classPrivateFieldGet(this, _audioContext).createMediaStreamSource($dHH5r$swchelpers.classPrivateFieldGet(this, _stream)));
    $dHH5r$swchelpers.classPrivateFieldSet(this, _analyser, $dHH5r$swchelpers.classPrivateFieldGet(this, _audioContext).createAnalyser());
    $dHH5r$swchelpers.classPrivateFieldGet(this, _analyser).fftSize = $dHH5r$swchelpers.classPrivateFieldGet(this, _fft_size);
    $dHH5r$swchelpers.classPrivateFieldGet(this, _mediaStreamSource).connect($dHH5r$swchelpers.classPrivateFieldGet(this, _analyser));
}
function draw() {
    var _this = this;
    requestAnimationFrame(function() {
        $dHH5r$swchelpers.classPrivateMethodGet(_this, _draw, draw).call(_this);
    });
    var bufferLength = $dHH5r$swchelpers.classPrivateFieldGet(this, _analyser).fftSize;
    var buffer = new Float32Array(bufferLength);
    $dHH5r$swchelpers.classPrivateFieldGet(this, _analyser).getFloatTimeDomainData(buffer);
    var sampleRate = $dHH5r$swchelpers.classPrivateFieldGet(this, _audioContext).sampleRate;
    var autocorrelation = new $688c26de1b3e08ab$export$2e2bcd8739ae039(buffer, sampleRate);
    var frequency = autocorrelation.execute();
    if (frequency === -1) return;
    var note = $dHH5r$swchelpers.classPrivateMethodGet(this, _frequencyToNote, frequencyToNote).call(this, frequency);
    if (typeof this.callback === "function") this.callback(frequency, note);
}
function frequencyToNote(frequency) {
    var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return $dHH5r$swchelpers.classPrivateFieldGet(this, _notes)[(Math.round(noteNum) + 69) % 12];
}
var $d46c26c6573bc7a1$export$2e2bcd8739ae039 = $d46c26c6573bc7a1$var$GuitarTuner;


//# sourceMappingURL=guitartuner.js.map
