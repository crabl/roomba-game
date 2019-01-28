import { Howl } from 'howler';

const normal_loop_url = require('./audio/loops/normal-loop.mp3');
const critical_loop_url = require('./audio/loops/battery-critical.mp3');
const undock_sound_url = require('./audio/sprites/undock.mp3');
const dock_sound_url = require('./audio/sprites/dock.mp3');
const vacuum_sound_url = require('./audio/sprites/vacuum.mp3');

export class Sounds {
  is_muted: boolean = false;
  private normal_loop = new Howl({
    src: [normal_loop_url],
    loop: true
  });

  private critical_loop = new Howl({
    src: [critical_loop_url],
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
    volume: 0.1,
    sprite: {
      ramp_on: [0, 1000],
      ramp_off: [7000, 8000]
    }
  });

  private vacuum = new Howl({
    src: [vacuum_sound_url],
    loop: true,
    volume: 0.1,
    sprite: {
      vacuum: [1000, 1600]
    }
  });

  constructor() {
    
  }

  play() {
    this.normal_loop.play();
  }

  normalToCritical() {
    this.critical_loop.off('end');
    this.normal_loop.once('end', () => {
      this.normal_loop.stop();
      this.critical_loop.play();
    });
  }

  criticalToNormal() {
    this.normal_loop.off('end');
    this.critical_loop.once('end', () => {
      this.critical_loop.stop();
      this.normal_loop.play();
    });
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

  mute() {
    this.is_muted = true;
  }

  unmute() {
    this.is_muted = false;
    this.play();
  }

  stopAll() {
    this.vacuum.stop();
    this.normal_loop.stop();
    this.critical_loop.stop();
  }
}