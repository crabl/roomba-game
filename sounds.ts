import { Howl } from 'howler';

const normal_loop_url = require('./audio/Roomba Game Track Loop 1 .mp3');
const startup_sound_url = require('./audio/Roomba Start-up sound.mp3');
const shutdown_sound_url = require('./audio/Roomba Power down.mp3');
const vacuum_on_sound_url = require('./audio/Vacuum Roomba Sound.mp3');

export class Sounds {
  is_muted: boolean = false;
  private normal_loop = new Howl({
    src: [normal_loop_url],
    loop: true
  });

  private startup_sound = new Howl({
    src: [startup_sound_url]
  });

  private shutdown_sound = new Howl({
    src: [shutdown_sound_url]
  });

  private vacuum_ramps = new Howl({
    src: [vacuum_on_sound_url],
    volume: 0.25,
    sprite: {
      ramp_on: [0, 1000],
      ramp_off: [7000, 8000]
    }
  });

  private vacuum = new Howl({
    src: [vacuum_on_sound_url],
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
    // this.normal_loop.play();
  }

  undock() {
    this.startup_sound.play();
    this.startup_sound.once('end', () => {
      this.vacuum_ramps.play('ramp_on');
      this.startup_sound.off('end');
    });

    this.vacuum_ramps.once('end', () => {
      this.vacuum.play('vacuum');
      this.vacuum_ramps.off('end');
    });
  }

  dock() {
    this.vacuum.once('end', () => {
      this.vacuum_ramps.play('ramp_off');
      this.vacuum_ramps.once('end', () => {
        this.shutdown_sound.play();
        this.vacuum_ramps.off('end');
      });
      this.vacuum.off('end');
    });
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