import { AnimationState, fps } from '../constants';

function roundSpeed(value, decimalPlaces = 3) {
  const multiplier = 10 ** decimalPlaces;
  return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
}

export const animationStateStore = {
  state: AnimationState.Idle,
  playstart: function () {
    this.state = AnimationState.Play;
  },
  playend: function () {
    this.state = AnimationState.Idle;
  },
};

export const animationSpeedStore = {
  speed: roundSpeed(1000 / fps),
  change: function (multiplier) {
    this.speed = roundSpeed(1000 / (fps * multiplier));
  },
};
