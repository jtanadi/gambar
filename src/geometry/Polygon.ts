import Point from "./Point"
import Shape, { PossibleShapes, StyleProps } from "./Shape"
import { getNwSeCorners } from "./utils"

export default class Polygon extends Shape {
  points: Point[]

  constructor(pts: Point[], style: StyleProps, save: boolean) {
    const [pt0, pt1] = getNwSeCorners(pts)
    super(pt0, pt1, PossibleShapes.POLYGON, style, save)
    this.points = pts
    this.createShape()
  }

  move(delta: Point): void {
    this.start = new Point(this.start.x + delta.x, this.start.y + delta.y)
    this.points = this.points.map(
      pt => new Point(pt.x + delta.x, pt.y + delta.y)
    )
    this.createShape()
  }

  protected createShape(): void {
    this.path = new Path2D()
    this.path.moveTo(this.points[0].x, this.points[0].y)
    for (let i = 1; i < this.points.length; i++) {
      this.path.lineTo(this.points[i].x, this.points[i].y)
    }
    this.path.lineTo(this.points[0].x, this.points[0].y)
  }
}
