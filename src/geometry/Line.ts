import Point from "./Point"
import Shape, { StyleProps } from "./Shape"

export default class Line extends Shape {
  start: Point
  end: Point

  constructor(pt0: Point, pt1: Point, props: StyleProps) {
    super(props)
    this.start = pt0
    this.end = pt1

    this.path = new Path2D()
    this.path.moveTo(this.start.x, this.start.y)
    this.path.lineTo(this.end.x, this.end.y)
  }
}
