import { Howl } from 'howler';

const normal_loop_url = require('./audio/loops/normal.mp3');
const undock_sound_url = require('./audio/sprites/undock.mp3');
const dock_sound_url = require('./audio/sprites/dock.mp3');
const vacuum_sound_url = require('./audio/sprites/vacuum.mp3');

export class Sounds {
  is_muted: boolean = false;
  private normal_loop = new Howl({
    src: [normal_loop_url],
    loop: true
  });

  private undock_sound = new Howl({
    src: [undock_sound_url]
  });

  private dock_sound = new Howl({
    src: [dock_sound_url]
  });

  private vacuum_ramps = new Howl({
    src: [vacuum_sound_url],
    volume: 0.25,
    sprite: {
      ramp_on: [0, 1000],
      ramp_off: [7000, 8000]
    }
  });

  private vacuum = new Howl({
    src: [vacuum_sound_url],
    loop: true,
    volume: 0.25,
    sprite: {
      vacuum: [1000, 1600]
    }
  });

  constructor() {
    this.normal_loop.on('end', () => {
      console.log('yo')
    })
  }

  play() {
    this.normal_loop.play();
  }

  undock() {
    this.undock_sound.play();
    const undock_sound_length = this.undock_sound.duration() * 1000 - 500;
    setTimeout(() => {
      this.vacuum_ramps.play('ramp_on')
    }, undock_sound_length);

    setTimeout(() => {
      this.vacuum.play('vacuum');
    }, undock_sound_length + 1000);
  }

  dock() {
    this.vacuum.stop();
    this.vacuum_ramps.play('ramp_off');
    const ramp_off_duration = 1000;
    
    setTimeout(() => {
      this.dock_sound.play();
    }, ramp_off_duration);
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