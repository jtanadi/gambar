import {
  BoundingBox,
  Ellipse,
  Line,
  Point,
  Polygon,
  Polyline,
  Rectangle,
  PossibleShapes,
  Shape,
  StyleProps,
} from "./geometry"

interface BoundingBoxStyle {
  nodeStyle: StyleProps
  edgeStyle: StyleProps
}

export default class Gambar {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  shapes: Shape[]
  bBoxNodeStyle: StyleProps
  bBoxEdgeStyle: StyleProps

  constructor(canvas: HTMLCanvasElement, boundingBoxStyle: BoundingBoxStyle) {
    this.canvas = canvas

    try {
      this.context = this.canvas.getContext("2d")
      this.context.translate(0.5, 0.5)
    } catch (e) {
      console.error(e)
    }

    if (boundingBoxStyle) {
      this.bBoxNodeStyle = boundingBoxStyle.nodeStyle
      this.bBoxEdgeStyle = boundingBoxStyle.edgeStyle
    }
    this.shapes = []
  }

  rectangle(pt0: Point, pt1: Point, style: StyleProps, save = true): void {
    this.clearSelection()
    const rect = new Rectangle(pt0, pt1, style, save)
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
    const ellipse = new Ellipse(pt0, pt1, style, save)
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
    const line = new Line(pt0, pt1, style, save)
    if (save) {
      this.shapes.push(line)
    }
    this.render()
    if (!save) {
      line.draw(this.context)
    }
  }

  polygon(points: Point[], style: StyleProps, save = true): void {
    const polygon = new Polygon(points, style, save)
    if (save) {
      this.shapes.push(polygon)
    }
    this.render()
    if (!save) {
      polygon.draw(this.context)
    }
  }

  polyline(points: Point[], style: StyleProps, save = true): void {
    const polyline = new Polyline(points, style, save)
    if (save) {
      this.shapes.push(polyline)
    }
    this.render()
    if (!save) {
      polyline.draw(this.context)
    }
  }

  private boundingBox(shape: Shape): void {
    if (this.bBoxNodeStyle && this.bBoxEdgeStyle) {
      const bbox = new BoundingBox(
        shape,
        this.bBoxEdgeStyle,
        this.bBoxNodeStyle
      )
      bbox.draw(this.context)
    }
  }

  render(): void {
    // Clear canvas and redraw all shapes in stack
    this.clearCanvas()

    this.context.save()
    this.shapes.forEach(shape => {
      shape.draw(this.context)

      // if (shape instanceof Line) {
      //   shape.drawPseudoPath(this.context)
      // }
    })

    // Draw boundingBox on top of everything
    this.shapes.forEach(shape => {
      if (shape.selected) {
        this.boundingBox(shape)
      }
    })
    this.context.restore()
  }

  deleteAll(): void {
    // Delete everything in drawing
    this.shapes = []
    this.render()
  }

  deleteShape(shape: Shape): void {
    this.shapes = this.shapes.filter(_shape => _shape.id !== shape.id)
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

  selectShapeAtPoint(point: Point, clearSelection = true): Shape {
    if (clearSelection) {
      this.clearSelection()
    }

    const selectedShape: Shape = this.findShapeAtPoint(point)
    if (selectedShape) {
      selectedShape.selected = true
    }
    this.render()
    return selectedShape
  }

  findShapeAtPoint(point: Point): Shape {
    // Iterate from the back to select top-most object first
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i]
      if (shape instanceof Line) {
        if (this.context.isPointInPath(shape.pseudoPath, point.x, point.y)) {
          return shape
        }
      } else {
        if (this.context.isPointInPath(shape.path, point.x, point.y)) {
          return shape
        }
      }
    }
    return null
  }

  findSelectedShapes(): [Shape, number][] {
    const selectedShapes: [Shape, number][] = []
    this.shapes.forEach((shape: Shape, i: number) => {
      if (shape.selected) {
        selectedShapes.push([shape, i])
      }
    })
    return selectedShapes
  }

  private swapLayerOrder(idxA: number, idxB: number): void {
    const temp: Shape = this.shapes[idxA]
    this.shapes[idxA] = this.shapes[idxB]
    this.shapes[idxB] = temp
  }

  pushSelectedShapesBackward(): void {
    const selectedShapes: [Shape, number][] = this.findSelectedShapes()
    for (const [, i] of selectedShapes) {
      // bottom-most object can't be pushed any more backward
      if (i > 0) {
        this.swapLayerOrder(i, i - 1)
      }
    }
    this.render()
  }

  pullSelectedShapesForward(): void {
    const selectedShapes: [Shape, number][] = this.findSelectedShapes()
    for (let i = selectedShapes.length - 1; i >= 0; i--) {
      const [, shapeIndex] = selectedShapes[i]

      // top-most object can't be pushed any more forward
      if (shapeIndex < this.shapes.length - 1) {
        this.swapLayerOrder(shapeIndex, shapeIndex + 1)
      }
    }
    this.render()
  }

  moveSelectedShapes(delta: Point): void {
    const selectedShapes: [Shape, number][] = this.findSelectedShapes()
    for (const [shape] of selectedShapes) {
      shape.move(delta)
    }
    this.render()
  }

  popShape(): Shape {
    const shape = this.shapes.pop()
    this.render()
    return shape
  }

  pushShape(shape: Shape): void {
    this.shapes.push(shape)
    this.render()
  }

  loadStack(shapes: Shape[]): void {
    // TODO: Validate input array
    this.shapes = shapes
    this.render()
  }

  getShapeStack(): Shape[] {
    return this.shapes
  }

  getDrawingData(): string {
    return this.canvas.toDataURL()
  }
}
