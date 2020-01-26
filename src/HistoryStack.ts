export default class HistoryStack<T> {
  private capacity: number
  private start: number
  private currentIdx: number
  private circular: boolean
  private stack: T[]

  constructor(capacity: number) {
    if (capacity < 1) throw new Error("Capacity must be larger than 0");
    this.capacity = capacity;
    this.start = 0;
    this.currentIdx = 0
    this.circular = false
    this.stack = new Array(this.capacity).fill(null);
  }

  clear(): void {
    this.stack.fill(null)
    this.start = 0
    this.currentIdx = 0
  }

  push(item: T): void {
    this.stack[this.currentIdx++] = item

    if (this.currentIdx >= this.stack.length) {
      this.currentIdx = 0
      this.circular = true
    }

    if (this.circular && this.currentIdx > this.start) {
      this.start = this.currentIdx
    }
  }

  pop(): T {
    if (this.currentIdx <= 0) {
      this.currentIdx = this.stack.length
    }

    const itemToReturn: T = this.stack[--this.currentIdx]

    if (this.start <= this.currentIdx) {
      this.circular = false
    }

    return itemToReturn
  }
}
