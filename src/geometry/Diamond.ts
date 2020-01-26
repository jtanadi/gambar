import Point from "./Point";
import Shape, { PossibleShapes, StyleProps } from "./Shape";

export default class Diamond extends Shape {
  start: Point;
  width: number;
  height: number;

  constructor(pt0: Point, pt1: Point, style: StyleProps) {
    super(pt0, pt1, PossibleShapes.DIAMOND, style);
    /*
     s a
      / \
     d   b
      \ /
       c
    */

    const { x, y } = this.start;
    const a = new Point(x + this.width / 2, y);
    const b = new Point(x + this.width, y + this.height / 2);
    const c = new Point(x + this.width / 2, y + this.height);
    const d = new Point(x, y + this.height / 2);

    this.path = new Path2D();
    this.path.moveTo(a.x, a.y);
    this.path.lineTo(b.x, b.y);
    this.path.lineTo(c.x, c.y);
    this.path.lineTo(d.x, d.y);
    this.path.lineTo(a.x, a.y);
  }
}
