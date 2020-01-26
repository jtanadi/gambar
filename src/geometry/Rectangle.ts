import Point from "./Point"
import Shape, { PossibleShapes, StyleProps } from "./Shape"

export default class Rectangle extends Shape {
  start: Point
  width: number
  height: number

  constructor(pt0: Point, pt1: Point, style: StyleProps) {
    super(pt0, pt1, PossibleShapes.RECTANGLE, style)

    this.path = new Path2D()
    this.path.rect(this.start.x, this.start.y, this.width, this.height)
  }
}
