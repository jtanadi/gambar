import Point from "../geometry/Point"

export function getNwSeCorners(pts: Point[]): [Point, Point] {
  let minX = pts[0].x
  let minY = pts[0].y
  let maxX = pts[0].x
  let maxY = pts[0].y

  for (const point of pts) {
    if (point.x < minX) {
      minX = point.x
    }
    if (point.y < minY) {
      minY = point.y
    }
    if (point.x > maxX && point.x > minX) {
      maxX = point.x
    }
    if (point.y > maxY && point.y > minY) {
      maxY = point.y
    }
  }

  return [new Point(minX, minY), new Point(maxX, maxY)]
}
