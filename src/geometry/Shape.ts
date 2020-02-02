import Point from "./Point"

export interface StyleProps {
  strokeColor?: string
  strokeWidth?: number
  fillColor?: string
}

export enum PossibleShapes {
  BRUSH = "BRUSH",
  DIAMOND = "DIAMOND",
  ELLIPSE = "ELLIPSE",
  LINE = "LINE",
  RECTANGLE = "RECTANGLE",
  POLYGON = "POLYGON",
}

export default class Shape {
  readonly type: PossibleShapes
  path: Path2D
  start: Point
  width: number
  height: number
  selected: boolean
  strokeColor: string
  strokeWidth: number
  fillColor: string

  constructor(pt0: Point, pt1: Point, type: PossibleShapes, style: StyleProps) {
    const startX = pt0.x > pt1.x ? pt1.x : pt0.x
    const startY = pt0.y > pt1.y ? pt1.y : pt0.y
    this.start = new Point(startX, startY)

    this.type = type
    this.selected = false
    this.strokeColor = style.strokeColor
    this.strokeWidth = style.strokeWidth
    this.fillColor = style.fillColor

    this.width = Math.abs(pt1.x - pt0.x)
    this.height = Math.abs(pt1.y - pt0.y)
  }

  draw(context: CanvasRenderingContext2D): void {
    if (this.strokeColor && this.strokeWidth) {
      context.strokeStyle = this.strokeColor
      context.lineWidth = this.strokeWidth
      context.stroke(this.path)
    }

    if (this.fillColor) {
      context.fillStyle = this.fillColor
      context.fill(this.path)
    }
  }
}
