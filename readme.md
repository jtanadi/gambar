# gambar
Gambar is a small drawing library written in Typescript. The library provides a thin, consistent, layer on top of some basic Canvas API methods.

## Usage
Create a new instance of `Gambar` and pass in your `canvas` element.
```javascript
const canvas = document.querySelector("canvas")
const gambar = new Gambar(canvas)
```

### Creating Shapes
Most shapes have the same signature: `shape(startPt, endPt, style)`.
`startPt` and `endPt` are objects with `{x, y}` members. `style` is an object with `{strokeColor, strokeWidth, fillColor}` optional members.

```javascript
gambar.rectangle(
  {x: 100, y: 100},
  {x: 200, y: 150},
  {strokeColor: "red", strokeWidth: 2, fillColor: "white"})

gambar.diamond(startPt, endPt, style)
gambar.ellipse(startPt, endPt, style)
gambar.line(startPt, endPt, style)
```

`polygon` and `polyline` methods take an array of `point` objects and a `style` object.
```javascript
gambar.polygon(
  [{x: 10, y: 20}, {x: 100, y: 200}, {x: 50, y: 100}], 
  {strokeColor: "blue", strokeWidth: 3})

gambar.polyline([pt1, pt2, pt3, pt4], style)
```

