import Point from "./Point"
import Shape, { StyleProps } from "./Shape"

export default class Ellipse extends Shape {
  r: Point
  c: Point

  constructor(pt0: Point, pt1: Point, props: StyleProps) {
    super(props)

    const rX = Math.abs(pt1.x - pt0.x) / 2;
    const rY = Math.abs(pt1.y - pt0.y) / 2;
    this.r = new Point(rX, rY)

    const cX = pt1.x > pt0.x ? pt0.x + this.r.x : pt0.x - this.r.x;
    const cY = pt1.y > pt0.y ? pt0.y + this.r.y : pt0.y - this.r.y;
    this.c = new Point(cX, cY)

    this.path = new Path2D()
    this.path.ellipse(this.c.x, this.c.y, this.r.x, this.r.y, 0, 0, 2 * Math.PI)
  }
}
