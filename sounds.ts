import { Howl } from 'howler';

const normal_loop_url = require('./audio/Roomba Game Track Loop 1 .mp3');

export class Sounds {
  is_muted: boolean = false;
  private normal_loop = new Howl({
    src: [normal_loop_url],
    loop: true
  });

  constructor() {

  }

  play() {
    this.normal_loop.play();
  }

  private queue() {

  }

  mute() {
    this.is_muted = true;
  }

  unmute() {
    this.is_muted = false;
    this.play();
  }
}