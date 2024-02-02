let oldTime = 0

let startX = 200
let startY = 200
let startScale = 1

let endX = 1000
let endY = 1000
let endScale = 2

let currX = startX
let currY = startY
let currScale = startScale

let velX = 0
let velY = 0
let velScale = 0

const loadScript = () => {
    //Initialization
    const CANVAS_WIDTH = window.innerHeight * 0.8;
    const CANVAS_HEIGHT = window.innerHeight * 0.8;

    const canvas = document.getElementById('canvas');

    canvas.width = CANVAS_WIDTH * devicePixelRatio;
    canvas.height = CANVAS_HEIGHT * devicePixelRatio;

    canvas.style.setProperty('width', `${CANVAS_WIDTH}px`)
    canvas.style.setProperty('height', `${CANVAS_HEIGHT}px`)

    canvas.addEventListener('click', () => {
        let tempX = startX
        let tempY = startY
        let tempScale = startScale

        startX = endX
        startY = endY
        startScale = endScale

        endX = tempX
        endY = tempY
        endScale = tempScale
    })

    drawFrame()
}

const drawFrame = (ts) => {
    ts /= 1000;
    const ctx = canvas.getContext("2d")
    let dt = parseFloat(ts - oldTime)
    oldTime = ts

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const speed = dt*3
    const frictionFactor = 0.9
    let accX = 0
    let accY = 0
    if (!isNaN(dt)) {
        accX = (endX - currX) * dt
        accY = (endY - currY) * dt
        accScale = (endScale - currScale) * dt

        velX += accX 
        velY += accY
        velScale += accScale

        velX *= frictionFactor
        velY *= frictionFactor
        velScale *= frictionFactor

        currX += velX
        currY += velY
        currScale += velScale

        currScale += (endScale - currScale) * dt
    }

    ctx.strokeStyle = "black"
    ctx.beginPath()
    ctx.arc(startX, startY, 80 * startScale, 0, Math.PI * 2)
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(endX, endY, 80 * endScale, 0, Math.PI * 2)
    ctx.stroke()
    ctx.closePath()

    ctx.fillStyle = "orange"
    ctx.beginPath()
    ctx.arc(currX, currY, 60 * currScale, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()

    requestAnimationFrame(drawFrame)
}