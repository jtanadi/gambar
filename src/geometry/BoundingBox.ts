import Point from "./Point"
import Line from "./Line"
import Rectangle from "./Rectangle"
import Shape, { StyleProps } from "./Shape"

import { getNwSeCorners } from "../utils"

export default class BoundingBox {
  box: Rectangle
  points: Point[]
  handleStyle: StyleProps

  constructor(shape: Shape, boxStyle: StyleProps, handleStyle: StyleProps) {
    this.handleStyle = handleStyle

    let start: Point, end: Point
    if (shape instanceof Line) {
      ;[start, end] = getNwSeCorners([shape.start, shape.lineEnd])
    } else {
      start = shape.start
      end = new Point(shape.start.x + shape.width, shape.start.y + shape.height)
    }
    this.box = new Rectangle(start, end, boxStyle, false)

    this.points = [
      start,
      new Point(start.x + shape.width, start.y),
      new Point(start.x + shape.width, start.y + shape.height),
      new Point(start.x, start.y + shape.height),

      new Point(start.x + shape.width / 2, start.y),
      new Point(start.x + shape.width, start.y + shape.height / 2),
      new Point(start.x + shape.width / 2, start.y + shape.height),
      new Point(start.x, start.y + shape.height / 2),
    ]
  }

  private drawHandle(point: Point, context: CanvasRenderingContext2D): void {
    const handleSize = 10
    const pt0 = new Point(point.x - handleSize / 2, point.y - handleSize / 2)
    const pt1 = new Point(point.x + handleSize / 2, point.y + handleSize / 2)

    const handle = new Rectangle(pt0, pt1, this.handleStyle, false)
    handle.draw(context)
  }

  draw(context: CanvasRenderingContext2D): void {
    this.box.draw(context)
    this.points.forEach(point => this.drawHandle(point, context))
  }
}
