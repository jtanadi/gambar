import Point from "./Point"
import Shape, { PossibleShapes, StyleProps } from "./Shape"

export default class Polygon extends Shape {
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

    this.path = new Path2D()
    this.path.moveTo(pts[0].x, pts[0].y)
    for (let i = 1; i < pts.length; i++) {
      this.path.lineTo(pts[i].x, pts[i].y)
    }
    this.path.lineTo(pts[0].x, pts[0].y)
  }
}
