export const counterStore = {
  counter: 0,
  inc: function () {
    this.counter += 1;
  },
  reset: function () {
    this.counter = 0;
  },
};
