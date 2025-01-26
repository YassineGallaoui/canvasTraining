let oldTime = 0

let radius = 40
let currX = 0
let currY = 0

let mouseX = 0
let mouseY = 0

let velX = 0
let velY = 0

const getLayerX = (event) => {
    return event.clientX - event.target.getBoundingClientRect().x
}

const getLayerY = (event) => {
    return event.clientY - event.target.getBoundingClientRect().y
}

const loadScript = () => {
    //Initialization
    const CANVAS_WIDTH = window.innerHeight * 0.8;
    const CANVAS_HEIGHT = window.innerHeight * 0.8;

    const canvas = document.getElementById('canvas');

    canvas.width = CANVAS_WIDTH * devicePixelRatio;
    canvas.height = CANVAS_HEIGHT * devicePixelRatio;

    canvas.style.setProperty('width', `${CANVAS_WIDTH}px`)
    canvas.style.setProperty('height', `${CANVAS_HEIGHT}px`)

    currX = canvas.width / 2
    currY = canvas.height / 2

    mouseX = currX
    mouseY = currY

    canvas.addEventListener('mousemove', (event) => {
        mouseX = getLayerX(event) * 2
        mouseY = getLayerY(event) * 2
    })

    drawFrame()
}

const drawFrame = (ts) => {
    ts /= 1000;
    const ctx = canvas.getContext("2d")
    let dt = parseFloat(ts - oldTime)
    oldTime = ts

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const speed = dt * 5
    const frictionFactor = 0.9
    
    if (!isNaN(dt)) {
        const accX = (mouseX - currX) * speed
        const accY = (mouseY - currY) * speed

        velX += accX
        velY += accY

        velX *= frictionFactor
        velY *= frictionFactor

        currX += velX
        currY += velY
    }

    ctx.lineWidth = 1
    ctx.strokeStyle = "black"
    ctx.beginPath()
    ctx.lineTo(canvas.width / 2, 0)
    ctx.lineTo(canvas.width / 2, canvas.height)
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.lineTo(0, canvas.height / 2)
    ctx.lineTo(canvas.width, canvas.height / 2)
    ctx.stroke()
    ctx.closePath()

    ctx.fillStyle = "orange"
    ctx.beginPath()
    ctx.arc(currX, currY, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()

    requestAnimationFrame(drawFrame)
}