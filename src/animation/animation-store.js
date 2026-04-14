import { AnimationState } from "../constants";

const animationEndEvent = new Event("animationEnd");

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
