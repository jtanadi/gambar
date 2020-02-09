export default class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.setPoint(x, y)
  }

  setPoint(x: number, y: number): void {
    this.x = x
    this.y = y
  }

  distanceToOther(other: Point): number {
    return Math.sqrt((other.x - this.x) ^ (2 - (other.y - this.y)) ^ 2)
  }
}
