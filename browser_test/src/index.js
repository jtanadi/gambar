import Drawing from "../../compiled"

const canvas = document.getElementById("canvas")
const tools = document.querySelectorAll(".tool")
let selectedTool = document.querySelector(".selected")
const historyBtns = document.querySelectorAll(".history")
const fileButtons = document.querySelectorAll(".file-button")

const dwg = new Drawing(canvas)

let down = false
let inCanvas = false
const start = { x: 0, y: 0 }

tools.forEach(tool => {
  tool.addEventListener("click", evt => {
    selectedTool.classList.remove("selected")
    evt.target.classList.add("selected")
    selectedTool = evt.target
  })
})

historyBtns.forEach(historyBtn => {
  historyBtn.addEventListener("click", evt => {
    if (evt.target.id === "undo") {
      dwg.undo()
    } else if (evt.target.id === "redo") {
      dwg.redo()
    }
  })
})

fileButtons.forEach(btn => {
  btn.addEventListener("click", evt => {
    if (evt.target.id === "open") {
      dwg.open()
    } else if (evt.target.id === "save") {
      dwg.save()
    }
  })
})

canvas.addEventListener("mouseenter", () => (inCanvas = true))
canvas.addEventListener("mouseleave", () => {
  inCanvas = false
  down = false
})

canvas.addEventListener("mousedown", evt => {
  if (!inCanvas || selectedTool.id === "polyline") return
  if (selectedTool.id === "selection") {
    dwg.toggleSelect({ x: evt.offsetX, y: evt.offsetY })
  }

  down = true
  start.x = evt.offsetX
  start.y = evt.offsetY
})

canvas.addEventListener("mouseup", evt => {
  if (selectedTool.id === "polyline") return
  down = false

  const end = {
    x: evt.offsetX,
    y: evt.offsetY,
  }

  const style = {
    strokeColor: "green",
    strokeWidth: 1,
    fillColor: "blue",
  }

  switch (selectedTool.id) {
    case "rectangle":
      dwg.rectangle(start, end, style)
      break
    case "ellipse":
      dwg.ellipse(start, end, style)
      break
    case "line":
      dwg.line(start, end, style)
      break
    case "diamond":
      dwg.diamond(start, end, style)
      break
    case "selection":
      dwg.render()
      break
  }
})

canvas.addEventListener("mousemove", evt => {
  if (!down || !inCanvas) return
  const end = {
    x: evt.offsetX,
    y: evt.offsetY,
  }

  drawMarquee(start, end, selectedTool.id)
})

function drawMarquee(start, end, tool) {
  const marqueeProps = {
    strokeColor: "gray",
    strokeWidth: 1,
  }
  switch (tool) {
    case "ellipse":
      dwg.ellipse(start, end, marqueeProps, false)
      break
    case "line":
      dwg.line(start, end, marqueeProps, false)
      break
    case "diamond":
      dwg.diamond(start, end, marqueeProps, false)
      break
    case "rectangle":
      dwg.rectangle(start, end, marqueeProps, false)
      break
    case "selection":
      dwg.rectangle(start, end, { fillColor: "rgba(0, 0, 0, 0.25)" }, false)
  }
}
