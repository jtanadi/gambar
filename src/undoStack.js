class UndoStack {
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
    // Clear up to this.index only, in case index < length
    for (let i = 0; i < this.index; i++) {
      this.stack[i] = null;
    }
    this.index = 0;
  }

  push(item) {
    if (this.index >= this.limit) {
      this.start++;
      this.start = this.start % this.limit;
    }
    this.stack[this.index % this.limit] = item;
    this.index++;
  }

  pop() {
    if (this.index === 0 && this.start === 0) {
      return null
    } else if (this.index === 0) {
      this.index = this.stack.length;
    }

    const item = this.stack[--this.index];
    this.stack[this.index] = null;

    if (this.index === this.start) {
      this.index = 0;
      this.start = 0;
    }

    return item;
  }

  shift() {
    // Shift second half of stack into first half
    let j = this.limit / 2;
    for (let i = 0; i < this.limit; i++) {
      this.stack[i] = (i >= this.limit / 2)
        ? null
        : this.stack[j++];
    }
    this.start = 0;
    this.index = 0;
  }
}
