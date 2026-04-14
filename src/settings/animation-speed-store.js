import { FPS } from "../constants";

function roundSpeed(value, decimalPlaces = 3) {
  const multiplier = 10 ** decimalPlaces;
  return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
}

export const animationSpeedStore = {
  speed: roundSpeed(1000 / FPS), // in ms
  change: function (multiplier) {
    this.speed = roundSpeed(1000 / (FPS * multiplier));
  },
};
