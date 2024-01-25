let angle1 = 0
let angle2 = 0

const loadScript = () => {
    //Initialization
    const CANVAS_WIDTH = window.innerHeight * 0.8;
    const CANVAS_HEIGHT = window.innerHeight * 0.8;

    const canvas = document.getElementById('canvas');

    canvas.width = CANVAS_WIDTH * devicePixelRatio;
    canvas.height = CANVAS_HEIGHT * devicePixelRatio;

    canvas.style.setProperty('width', `${CANVAS_WIDTH}px`)
    canvas.style.setProperty('height', `${CANVAS_HEIGHT}px`)

    drawFrame()
}

const drawFrame = (ts) => {
    ts /= 1000;
    const ctx = canvas.getContext("2d")

    //Clear call
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //first circle
    const circleX = canvas.width / 2
    const circleY = canvas.height / 2
    const circleRadius = 100
    const startAngle = 0
    const endAngle = Math.PI * 2
    const circleCounterClockwise = false

    ctx.strokeStyle = 'gray'
    ctx.beginPath()
    ctx.arc(circleX + Math.cos(ts) * 200, circleY - Math.sin(angle2) * 200, circleRadius, startAngle, endAngle, circleCounterClockwise)
    ctx.stroke()

    angle1 += 0.05
    angle2 += 0.05

    requestAnimationFrame(drawFrame)
}