import { AnimationState, FPS } from '../constants';

function roundSpeed(value, decimalPlaces = 3) {
  const multiplier = 10 ** decimalPlaces;
  return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
}

const animationEndEvent = new Event('animationEnd')

export const animationStateStore = {
  state: AnimationState.Idle,
  playstart: function () {
    this.state = AnimationState.Play;
  },
  playend: function () {
    this.state = AnimationState.Idle;
    document.dispatchEvent(animationEndEvent);
  },
};

export const animationSpeedStore = {
  speed: roundSpeed(1000 / FPS), // in ms
  change: function (multiplier) {
    this.speed = roundSpeed(1000 / (FPS * multiplier));
  },
};
