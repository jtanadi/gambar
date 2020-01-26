import HistoryStack from "./HistoryStack"
import { Point, Shape, StyleProps, Rectangle, Ellipse, Line } from "./geometry"

export default class Drawing {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  shapes: Shape[]
  history: HistoryStack<Shape>

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    try {
      this.context = this.canvas.getContext('2d');
      this.context.translate(0.5, 0.5);
    } catch (e) {
      console.log(e);
    }

    this.shapes = [];
    this.history = new HistoryStack<Shape>(10)
  }

  clear() {
    // Clear context by drawing a clearRect the size of the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.shapes = [];
  }

  drawMarquee(pt0: Point, pt1: Point, type: string) {
    // Draw marquee by clearing context and drawing a shape
    // from (x0, y0) (top left) to (x1, y1) (bottom right)

    // Draw all shapes so they appear persistent
    this.drawShapes();

    const marqueeProps: StyleProps = {
      type,
      strokeColor: "gray",
      strokeWidth: 1,
    }

    let marquee: Shape
    switch (type) {
      case "ellipse":
        marquee = new Ellipse(pt0, pt1, marqueeProps)
        break
      case "line":
        marquee = new Line(pt0, pt1, marqueeProps)
        break
      default:
        marquee = new Rectangle(pt0, pt1, marqueeProps)
    }
    marquee.draw(this.context)
  }

  /* createShape(x0, y0, x1, y1, mode, stroke = 'black', fill = 'none') { */


  /*   // Create shape by making a new Path2D object */
  /*   // Shape objects (path and SVG data) are saved in `this.shapes` stack and redrawn at every turn */
  /*   // x0, y0 is top left corner; x1, y1 is bottom right corner */

  /*   const path = new Path2D(); */
  /*   if (mode === 'rect') { */
  /*     const [x, y, width, height] = drawMethods.rect(x0, y0, x1, y1, path); */
  /*   } else if (mode === 'ellipse') { */
  /*     const [cx, cy, rx, ry] = drawMethods.ellipse(x0, y0, x1, y1, path); */
  /*   } else if (mode === 'line') { */
  /*     drawMethods.line(x0, y0, x1, y1, path); */
  /*   } */

  /*   this.shapes.push({ */
  /*     path, */
  /*     mode, */
  /*     stroke, */
  /*     fill, */
  /*   }); */
  /*   this.drawShapes(); */
  /*   /1* this.history.clear(); *1/ */
  /* } */

  /* createBrush(x0, y0, x1, y1, stroke = 'none', fill = 'none') { */
  /*   const path = new Path2D(); */
  /*   drawMethods.line(x0, y0, x1, y1, path); */
  /*   this.shapes.push({ */
  /*     path, */
  /*     mode: 'brush', */
  /*     stroke, */
  /*     fill, */
  /*   }); */
  /*   this.drawShapes(false); */
  /*   /1* this.history.clear(); *1/ */
  /* } */

  drawShapes(clear = true) {
    // Currently, we have to clear and redraw all shapes
    // because we need the marquee to refresh on mousemove
    // (Marquee isn't part of shapes stack, so only current
    // one will be drawn at each refresh)
    if (clear) {
      this.clear();
    }
    this.shapes.forEach(shape => {
      shape.draw(this.context)
    })
  }

  /*
  load(svg) {
    this.shapes = parseSVG(svg);
    this.drawShapes();
  }

  save() {
    return new Error('not yet implemented');
    // let xml = `<?xml version="1.0" encoding="UTF-8" ?>\n<svg width="${this.canvas.width}" height="${this.canvas.height}" xmlns="http://www.w3.org/2000/svg">\n`

    // xml += this.shapes.map(shape => `  ${shape.svg}`).join("\n")
    // xml += "\n</svg>"

    // console.log(xml)
  }
   */

  getDrawingData() {
    return this.canvas.toDataURL();
  }

  undo() {
    // Currently only undoes drawing
    const shapeToStore = this.shapes.pop();
    if (!shapeToStore) return;
    this.history.push(shapeToStore);
    this.drawShapes();
  }

  redo() {
    // Currently only redoes drawing
    const shapeToRedraw = this.history.pop();
    if (!shapeToRedraw) return;
    this.shapes.push(shapeToRedraw);
    this.drawShapes();
  }
}
