import HistoryStack from "./HistoryStack"
import {
  Point,
  Shape,
  StyleProps,
  Rectangle,
  Ellipse,
  Line,
  Diamond,
} from "./geometry"

export default class Drawing {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  shapes: Shape[]
  history: HistoryStack<Shape>

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas

    try {
      this.context = this.canvas.getContext("2d")
      this.context.translate(0.5, 0.5)
    } catch (e) {
      console.log(e)
    }

    this.shapes = []
    /* this.history = []; */
    this.history = new HistoryStack<Shape>(10)
  }

  delete(): void {
    // Delete everything in drawing
    this.shapes = []
    this.render()
  }

  clearSelection(): void {
    this.shapes.forEach(shape => {
      shape.selected = false
    })
    this.render()
  }

  clearCanvas(): void {
    // Clear context by drawing a clearRect the size of the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  rectangle(pt0: Point, pt1: Point, style: StyleProps, save = true): void {
    this.clearSelection()
    const rect = new Rectangle(pt0, pt1, style)
    if (save) {
      this.shapes.push(rect)
    }
    this.render()
    if (!save) {
      rect.draw(this.context)
    }
  }

  ellipse(pt0: Point, pt1: Point, style: StyleProps, save = true): void {
    this.clearSelection()
    const ellipse = new Ellipse(pt0, pt1, style)
    if (save) {
      this.shapes.push(ellipse)
    }
    this.render()
    if (!save) {
      ellipse.draw(this.context)
    }
  }

  line(pt0: Point, pt1: Point, style: StyleProps, save = true): void {
    this.clearSelection()
    const line = new Line(pt0, pt1, style)
    if (save) {
      this.shapes.push(line)
    }
    this.render()
    if (!save) {
      line.draw(this.context)
    }
  }

  diamond(pt0: Point, pt1: Point, style: StyleProps, save = true): void {
    this.clearSelection()
    const diamond = new Diamond(pt0, pt1, style)
    if (save) {
      this.shapes.push(diamond)
    }
    this.render()
    if (!save) {
      diamond.draw(this.context)
    }
  }

  render(): void {
    // Clear canvas and redraw all shapes in stack
    this.clearCanvas()
    this.shapes.forEach(shape => {
      shape.draw(this.context)
    })
  }

  private drawHandle(point: Point, style: StyleProps): void {
    const handleSize = 10
    const pt0 = new Point(point.x - handleSize / 2, point.y - handleSize / 2)
    const pt1 = new Point(point.x + handleSize / 2, point.y + handleSize / 2)

    const handle = new Rectangle(pt0, pt1, style)
    handle.draw(this.context)
  }

  drawBoundingBox(
    shape: Shape,
    boxStyle: StyleProps,
    handleStyle: StyleProps
  ): void {
    const end = new Point(
      shape.start.x + shape.width,
      shape.start.y + shape.height
    )
    const box = new Rectangle(shape.start, end, boxStyle)
    box.draw(this.context)

    const pts = [
      shape.start,
      new Point(shape.start.x + shape.width, shape.start.y),
      new Point(shape.start.x + shape.width, shape.start.y + shape.height),
      new Point(shape.start.x, shape.start.y + shape.height),

      new Point(shape.start.x + shape.width / 2, shape.start.y),
      new Point(shape.start.x + shape.width, shape.start.y + shape.height / 2),
      new Point(shape.start.x + shape.width / 2, shape.start.y + shape.height),
      new Point(shape.start.x, shape.start.y + shape.height / 2),
    ]
    pts.forEach(point => this.drawHandle(point, handleStyle))
  }

  selectShapeAtPoint(point: Point, clearSelection = true): void {
    if (clearSelection) {
      this.clearSelection()
    }

    const selectedShape: Shape = this.findShapeAtPoint(point)
    if (selectedShape) {
      selectedShape.selected = true
    }
  }

  findShapeAtPoint(point: Point): Shape {
    // Iterate from the back to select top-most object first
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (this.context.isPointInPath(shape.path, point.x, point.y)) {
        return shape
      }
    }
    return null
  }

  moveShape(shapeToMove: Shape, newStart: Point): void {
    console.log(this.shapes)
    this.shapes = this.shapes.map(shape => {
      if (shape === shapeToMove) {
        shape.start = newStart
      }
      return shape
    })
    console.log(this.shapes)
  }

  loadStack(shapes: Shape[]): void {
    this.shapes = shapes
    this.render()
  }

  getDrawingData(): string {
    return this.canvas.toDataURL()
  }

  getShapeStack(): Shape[] {
    return this.shapes
  }
}
