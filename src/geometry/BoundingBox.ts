import Point from "./Point"
import Rectangle from "./Rectangle"
import Shape, { StyleProps } from "./Shape"

export default class BoundingBox {
  box: Rectangle
  points: Point[]
  handleStyle: StyleProps

  constructor(shape: Shape, boxStyle: StyleProps, handleStyle: StyleProps) {
    this.handleStyle = handleStyle

    const boxEnd = new Point(
      shape.start.x + shape.width,
      shape.start.y + shape.height
    )
    this.box = new Rectangle(shape.start, boxEnd, boxStyle, false)

    this.points = [
      shape.start,
      new Point(shape.start.x + shape.width, shape.start.y),
      new Point(shape.start.x + shape.width, shape.start.y + shape.height),
      new Point(shape.start.x, shape.start.y + shape.height),

      new Point(shape.start.x + shape.width / 2, shape.start.y),
      new Point(shape.start.x + shape.width, shape.start.y + shape.height / 2),
      new Point(shape.start.x + shape.width / 2, shape.start.y + shape.height),
      new Point(shape.start.x, shape.start.y + shape.height / 2),
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
