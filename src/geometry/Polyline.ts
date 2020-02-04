import Point from "./Point"
import Shape, { PossibleShapes, StyleProps } from "./Shape"

export default class Polyline extends Shape {
  points: Point[]

  constructor(points: Point[], style: StyleProps) {
    const pt0 = points[0]
    const pt1 = points[points.length - 1]

    super(pt0, pt1, PossibleShapes.POLYLINE, style)
    this.points = points
  }

  move(delta: Point): void {
    throw new Error("Not yet implemented")
  }

  protected createShape(): void {
    this.path = new Path2D()
    this.path.moveTo(this.path[0].x, this.path[0].y)
    for (let i = 1; i < this.points.length; i++) {
      this.path.lineTo(this.path[0].x, this.path[0].y)
    }
  }
}
