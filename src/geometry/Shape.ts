export interface StyleProps {
  type: string
  strokeColor?: string
  strokeWidth?: number
  fillColor?: string
}

export default class Shape {
  readonly type: string
  path: Path2D
  strokeColor: string
  strokeWidth: number
  fillColor: string

  constructor(props: StyleProps) {
    this.type = props.type
    this.strokeColor = props.strokeColor
    this.strokeWidth = props.strokeWidth
    this.fillColor = props.fillColor
  }

  draw(context: CanvasRenderingContext2D) {
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
