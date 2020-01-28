import HistoryStack from "./HistoryStack"
import {
  BoundingBox,
  Point,
  Shape,
  StyleProps,
  Rectangle,
  Ellipse,
  Line,
  Diamond,
} from "./geometry"

export default class Gambar {
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

  boundingBox(
    shape: Shape,
    boxStyle: StyleProps,
    handleStyle: StyleProps
  ): void {
    const bbox = new BoundingBox(shape, boxStyle, handleStyle)
    bbox.draw(this.context)
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
