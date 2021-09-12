import React, { Component } from 'react';

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
// https://pages.mtu.edu/~suits/notefrequencys.html

let position = 0;
let interval;

function createOscillator(audioContext, frequency) {
  const gain = audioContext.createGain();
  const oscillator = audioContext.createOscillator();

  const attack = 10;
  const decay = 400;

  gain.connect(audioContext.destination);
  gain.gain.exponentialRampToValueAtTime(
    0.01, audioContext.currentTime + 1,
  );

  gain.gain.setValueAtTime(0, audioContext.currentTime);
  gain.gain.linearRampToValueAtTime(1, audioContext.currentTime + attack / 1000);
  gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + decay / 1000);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';
  oscillator.connect(gain);
  oscillator.start(0);

  setTimeout(() => {
    oscillator.stop(0);
    oscillator.disconnect(gain);
    gain.disconnect(audioContext.destination);
  }, decay);
}

function play(audioContext, scale, song) {
  const note = song.charAt(position);
  const frequency = scale[note];
  position += 1;
  if (position >= song.length) {
    clearInterval(interval);
  }
  if (frequency) {
    createOscillator(audioContext, frequency);
  }
}

class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const audioContext = new AudioContext();
    const scale = {
      c: 261.6,
      d: 293.7,
      e: 329.6,
      f: 349.2,
      g: 392.0,
      a: 440.0,
      b: 493.9,
      q: 523.3, // c5
      w: 587.3, // d5
      x: 659.3, // e5
      r: 698.5, // f5
      t: 784.0, // g5
      y: 880.0, // a5
      u: 987.8, // b5
    };
    const song = 'c--d--e--f--g--a--b--q--w--x--r--t--y--u';

    interval = setInterval(play, 1000 / 2, audioContext, scale, song);
  }

  render() {
    return (
      <div>
        <div className="container">
          <p className="pointer" onClick={this.handleClick}>click</p>
        </div>
      </div>
    );
  }
}

export default Notes;
