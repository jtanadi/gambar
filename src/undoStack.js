module.exports = class UndoStack {
  // Simple implementation of a stack with a limit. Once the limit
  // has been reached we go to the beginning of the stack

  constructor(limit) {
    this.limit = limit;
    this.start = 0;
    this.index = 0;
    this.stack = new Array(this.limit);

    for (let i = 0; i < this.limit; i++) {
      this.stack[i] = null;
    }
  }

  clear() {
    // Iterate over the smaller amount
    const end = (this.index < this.limit)
      ? this.index
      : this.limit

    for (let i = 0; i < end; i++) {
      this.stack[i] = null;
    }
    this.start = 0;
    this.index = 0;
  }

  push(item) {
    if (this.index >= this.limit) {
      this.start = (this.start + 1) % this.limit;
    }
    this.stack[this.index % this.limit] = item;
    this.index++;
  }

  pop() {
    // Don't decrement when index is 0
    if (!this.index) return null;

    this.index--;
    const item = this.stack[this.index % this.limit];
    this.stack[this.index % this.limit] = null;

    // Reset count
    if (!this.stack[this.start] && !this.stack[this.index]) {
      this.start = 0;
      this.index = 0;
    }

    return item;
  }
}
