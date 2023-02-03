class Autocorrelation {
  constructor(buffer, sampleRate) {
    this.buffer = buffer;
    this.sampleRate = sampleRate;
  }

  // Using the strategy defined here.
  // https://github.com/cwilso/PitchDetect/pull/23
  execute() {
    // Reject if RMS is too small.
    const rms = this.#rms(this.buffer);
    if (rms < 0.05) return -1;

    // Trim the buffer so that it starts and ends at "zero".
    const startPosition = this.#startPosition(this.buffer, 0.2);
    const endPosition = this.#endPosition(this.buffer, 0.2);
    this.buffer = this.buffer.slice(startPosition, endPosition);

    // Take the dot product of the offsets
    var c = new Array(this.buffer.length).fill(0);
    for (var i = 0; i < this.buffer.length; i++)
      for (var j = 0; j < this.buffer.length - i; j++)
        c[i] = c[i] + this.buffer[j] * this.buffer[j + i];

    // Find the maximum value and its position
    var d = 0;
    while (c[d] > c[d + 1]) d++;
    var maxval = -1,
      maxpos = -1;
    for (var i = d; i < this.buffer.length; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }
    var T0 = maxpos;

    // Some type of smoothing
    // interpolation is parabolic interpolation. It helps with precision. We suppose that a parabola pass through the three points that comprise the peak. 'a' and 'b' are the unknowns from the linear equation system and b/(2a) is the "error" in the abscissa. Well x1,x2,x3 should be y1,y2,y3 because they are the ordinates.
    var x1 = c[T0 - 1],
      x2 = c[T0],
      x3 = c[T0 + 1];
    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);

    // Return the frequency / pitch
    return this.sampleRate / T0;
  }

  // Calculates and returns the root mean square of the array.
  #rms(array) {
    const squares = array.map((value) => value * value);
    const sum = squares.reduce((accumulator, value) => accumulator + value);
    const mean = sum / array.length;
    return Math.sqrt(mean);
  }

  // Finds and returns the first near zero within the array.
  #startPosition(array, threshold) {
    for (var i = 0; i < array.length / 2; i++) {
      if (Math.abs(array[i]) < threshold) {
        return i;
      }
    }
  }

  // Finds and returns the last near zero within the array.
  #endPosition(array, threshold) {
    for (var i = 1; i < array.length / 2; i++) {
      if (Math.abs(array[array.length - i]) < threshold) {
        return array.length - i;
      }
    }
  }
}

export default Autocorrelation;
