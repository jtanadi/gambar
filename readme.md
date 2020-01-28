# gambar
Gambar is a small drawing library written in Typescript. The library provides a thin, consistent, layer on top of some basic Canvas API methods.

The name is Indonesian and translates to *picture*, *drawing*, or *to draw*.

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

gambar.ellipse(startPt, endPt, style)
gambar.line(startPt, endPt, style)
gambar.diamond(startPt, endPt, style)
```

The `polygon` method takes an array of `point` objects and a `style` object.
```javascript
gambar.polygon(
  [
    {x: 10, y: 20},
    {x: 100, y: 200},
    {x: 50, y: 100}
  ],
  {strokeColor: "blue", strokeWidth: 3}
)
```

