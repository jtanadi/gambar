import Point from "./Point"
import Shape, { PossibleShapes, StyleProps } from "./Shape"

export default class Polygon extends Shape {
  points: Point[]
  constructor(pts: Point[], style: StyleProps) {
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity

    for (const point of pts) {
      if (point.x < minX) {
        minX = point.x
      }
      if (point.y < minY) {
        minY = point.y
      }
      if (point.x > maxX && point.x > minX) {
        maxX = point.x
      }
      if (point.y > maxY && point.y > minY) {
        maxY = point.y
      }
    }

    const pt0 = new Point(minX, minY)
    const pt1 = new Point(maxX, maxY)
    super(pt0, pt1, PossibleShapes.POLYGON, style)
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
