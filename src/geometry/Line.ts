import Point from "./Point"
import Shape, { PossibleShapes, StyleProps } from "./Shape"

const PSEUDOPATH_THRESHOLD = 4

export default class Line extends Shape {
  lineEnd: Point
  pseudoPath: Path2D

  constructor(pt0: Point, pt1: Point, style: StyleProps, save: boolean) {
    super(pt0, pt1, PossibleShapes.LINE, style, save)
    this.start = pt0
    this.lineEnd = pt1

    this.createShape()
    this.pseudoPath = this.createPseudoPath(
      this.strokeWidth < PSEUDOPATH_THRESHOLD
        ? PSEUDOPATH_THRESHOLD
        : this.strokeWidth
    )
  }

  move(delta: Point): void {
    this.start = new Point(this.start.x + delta.x, this.start.y + delta.y)
    this.lineEnd = new Point(this.lineEnd.x + delta.x, this.lineEnd.y + delta.y)
    this.createShape()
    this.pseudoPath = this.createPseudoPath(
      this.strokeWidth < PSEUDOPATH_THRESHOLD
        ? PSEUDOPATH_THRESHOLD
        : this.strokeWidth
    )
  }

  drawPseudoPath(context: CanvasRenderingContext2D): void {
    // This method is available for debugging
    context.strokeStyle = "gray"
    context.lineWidth = 1
    context.stroke(this.pseudoPath)
  }

  protected createShape(): void {
    this.path = new Path2D()
    this.path.moveTo(this.start.x, this.start.y)
    this.path.lineTo(this.lineEnd.x, this.lineEnd.y)
  }

  private createPseudoPath(d: number): Path2D {
    // Create a rectangle around line for easier selection with mouse
    // https://math.stackexchange.com/questions/2043054/find-a-point-on-a-perpendicular-line-a-given-distance-from-another-point
    // y = mx + b; b = y - mx

    // (x1, y1) ---------------- (x2, y2)
    //     |                        |
    //     |****ACTUAL*LINE*HERE****|
    //     |                        |
    // (x4, y4) ---------------- (x3, y3)

    const m = (this.lineEnd.y - this.start.y) / (this.lineEnd.x - this.start.x)
    const perpM = -1 / m

    const newX1 = this.start.x + Math.sqrt(d ** 2 / (1 + 1 / m ** 2))
    const newX4 = this.start.x - Math.sqrt(d ** 2 / (1 + 1 / m ** 2))

    const perpB1 = this.start.y - perpM * this.start.x
    const newY1 = perpM * newX1 + perpB1
    const newY4 = perpM * newX4 + perpB1

    const newX2 = this.lineEnd.x + Math.sqrt(d ** 2 / (1 + 1 / m ** 2))
    const newX3 = this.lineEnd.x - Math.sqrt(d ** 2 / (1 + 1 / m ** 2))

    const perpB2 = this.lineEnd.y - perpM * this.lineEnd.x
    const newY2 = perpM * newX2 + perpB2
    const newY3 = perpM * newX3 + perpB2

    const path = new Path2D()
    path.moveTo(newX1, newY1)
    path.lineTo(newX2, newY2)
    path.lineTo(newX3, newY3)
    path.lineTo(newX4, newY4)
    path.lineTo(newX1, newY1)

    return path
  }
}
