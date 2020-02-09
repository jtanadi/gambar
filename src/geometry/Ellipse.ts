import Point from "./Point"
import Shape, { PossibleShapes, StyleProps } from "./Shape"

export default class Ellipse extends Shape {
  r: Point
  c: Point

  constructor(pt0: Point, pt1: Point, style: StyleProps, save: boolean) {
    super(pt0, pt1, PossibleShapes.ELLIPSE, style, save)
    this.createShape()
  }

  protected createShape(): void {
    const pt1 = new Point(this.start.x + this.width, this.start.y + this.height)

    const rX = Math.abs(pt1.x - this.start.x) / 2
    const rY = Math.abs(pt1.y - this.start.y) / 2
    this.r = new Point(rX, rY)

    const cX =
      pt1.x > this.start.x ? this.start.x + this.r.x : this.start.x - this.r.x
    const cY =
      pt1.y > this.start.y ? this.start.y + this.r.y : this.start.y - this.r.y
    this.c = new Point(cX, cY)

    this.path = new Path2D()
    this.path.ellipse(this.c.x, this.c.y, this.r.x, this.r.y, 0, 0, 2 * Math.PI)
  }
}
