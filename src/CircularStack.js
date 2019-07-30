module.exports = class CircularStack {
  // Circular stack with a fixed capacity (specified at initialization)
  // Kind of like circular buffer, but with LIFO behavior

  constructor(capacity) {
    if (isNaN(capacity)) throw new Error ("Capacity must be a number");
    else if (!capacity) throw new Error ("Capacity must be larger than 0");
    this.capacity = capacity;
    this.start = 0;
    this.index = 0;
    this.stack = new Array(this.capacity);

    for (let i = 0; i < this.capacity; i++) {
      this.stack[i] = null;
    }
  }

  clear() {
    // Iterate over the smaller amount
    const end = (this.index < this.capacity)
      ? this.index
      : this.capacity

    for (let i = 0; i < end; i++) {
      this.stack[i] = null;
    }
    this.start = 0;
    this.index = 0;
  }

  push(item) {
    if (this.index >= this.capacity) {
      this.start = (this.start + 1) % this.capacity;
    }
    this.stack[this.index % this.capacity] = item;
    this.index++;
  }

  pop() {
    // Don't decrement when index is 0
    if (!this.index) return null;

    this.index--;
    const item = this.stack[this.index % this.capacity];
    this.stack[this.index % this.capacity] = null;

    // Reset count
    if (!this.stack[this.start] && !this.stack[this.index]) {
      this.start = 0;
      this.index = 0;
    }

    return item;
  }
}
