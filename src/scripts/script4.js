const image = new Image()
const video = document.createElement('video');
video.muted = "muted"

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
    const circleRadius = 100 + Math.sin(ts * 3) * 99
    const startAngle = 0
    const endAngle = Math.PI * 2
    const circleCounterClockwise = false

    ctx.strokeStyle = 'gray'
    ctx.beginPath()
    ctx.arc(circleX, circleY, circleRadius, startAngle, endAngle, circleCounterClockwise)
    ctx.stroke()

    //second circle
    ctx.fillStyle = 'orange'
    ctx.beginPath()

    const moveX = circleX + Math.cos(ts * 3) * circleRadius
    const moveY = circleY + Math.sin(ts * 3) * circleRadius

    ctx.arc(moveX, moveY, 20 + Math.cos(ts * 3) * 19, startAngle, endAngle, circleCounterClockwise)
    ctx.fill()

    //third circle
    ctx.fillStyle = 'red'
    ctx.beginPath()

    const moveX2 = circleX + Math.cos(ts * 3 + Math.PI * 0.33) * circleRadius
    const moveY2 = circleY + Math.sin(ts * 3 + Math.PI * 0.33) * circleRadius

    ctx.arc(moveX2, moveY2, 20 + Math.sin(ts * 3) * 19, startAngle, endAngle, circleCounterClockwise)
    ctx.fill()


    requestAnimationFrame(drawFrame)
}