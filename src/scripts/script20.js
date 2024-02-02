let oldTime = 0

const CIRCLE_COUNT = 20
let circles = []

const mousePos = {
    x: 0,
    y: 0
}

let velX = 0
let velY = 0

const getLayerX = (event) => {
    return event.clientX - event.target.getBoundingClientRect().x
}

const getLayerY = (event) => {
    return event.clientY - event.target.getBoundingClientRect().y
}

const getRandomRGBColor = () => {
    let randomR = Math.random() * 255
    let randomG = Math.random() * 255
    let randomB = Math.random() * 255
    return `rgba(${randomR}, ${randomG}, ${randomB}, 1)`
}

class Circle{
    constructor({
        x = 0,
        y = 0,
        radius = 20,
        color,
    }) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocityX = 0
        this.velocityY = 0
        this.frictionFactor = 0.8
    }
    render(ctx) {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    }
    springTo(target, dt) {
        const accX = (target.x - this.x) * dt * 5
        const accY = (target.y - this.y) * dt * 5
        this.velocityX += accX
        this.velocityY += accY
        this.velocityX *= this.frictionFactor
        this.velocityY *= this.frictionFactor
        this.x += this.velocityX
        this.y += this.velocityY
    }
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

    canvas.addEventListener('mousemove', (event) => {
        mousePos.x = getLayerX(event) * 2
        mousePos.y = getLayerY(event) * 2
    })

    for(let i = 0; i<CIRCLE_COUNT; i++){
        const newCircle = new Circle({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 30 + 20,
            color: getRandomRGBColor()
        })
        circles.push(newCircle);
    }

    drawFrame()
}

const drawFrame = (ts) => {
    ts /= 1000;
    const ctx = canvas.getContext("2d")
    let dt = parseFloat(ts - oldTime)
    oldTime = ts

    ctx.clearRect(0, 0, canvas.width, canvas.height)

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

    for (let i = 0; i < CIRCLE_COUNT; i++) {
        let singleCircle = circles[i]

        if (!isNaN(dt)) {
            if(i === 0) {
                singleCircle.springTo(mousePos, dt)
            } else {
                const prevCircle = circles[i-1]
                singleCircle.springTo(prevCircle, dt)
            }
        }
        singleCircle.render(ctx)
    }

    requestAnimationFrame(drawFrame)
}