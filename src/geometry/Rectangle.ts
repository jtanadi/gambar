import Point from "./Point"
import Shape, { StyleProps } from "./Shape"

export default class Rectangle extends Shape {
  start: Point
  width: number
  height: number

  constructor(pt0: Point, pt1: Point, props: StyleProps) {
    super(props)

    // pt0 and pt1 are opposite corners
    // Starting point should always be top left corner
    // so do this in case pt0 isn't top left corner
    const startX = pt0.x > pt1.x ? pt1.x : pt0.x
    const startY = pt0.y > pt1.y ? pt1.y : pt0.y
    this.start = new Point(startX, startY)

    this.width = Math.abs(pt1.x - pt0.x);
    this.height = Math.abs(pt1.y - pt0.y);

    this.path = new Path2D()
    this.path.rect(this.start.x, this.start.y, this.width, this.height)
  }
}
