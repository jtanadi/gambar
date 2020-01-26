export default class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  distanceToOther(other: Point): number {
    return Math.sqrt((other.x - this.x) ^ (2 - (other.y - this.y)) ^ 2)
  }
}
