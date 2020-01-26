import Point from "./Point"
import Shape, { PossibleShapes, StyleProps } from "./Shape"

export default class Line extends Shape {
  start: Point
  end: Point

  constructor(pt0: Point, pt1: Point, style: StyleProps) {
    super(pt0, pt1, PossibleShapes.LINE, style)
    this.start = pt0
    this.end = pt1

    this.path = new Path2D()
    this.path.moveTo(this.start.x, this.start.y)
    this.path.lineTo(this.end.x, this.end.y)
  }
}
