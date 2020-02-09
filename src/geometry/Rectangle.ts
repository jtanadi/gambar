import Point from "./Point"
import Shape, { PossibleShapes, StyleProps } from "./Shape"

export default class Rectangle extends Shape {
  constructor(pt0: Point, pt1: Point, style: StyleProps, save: boolean) {
    super(pt0, pt1, PossibleShapes.RECTANGLE, style, save)
    this.createShape()
  }

  protected createShape(): void {
    this.path = new Path2D()
    this.path.rect(this.start.x, this.start.y, this.width, this.height)
  }
}
