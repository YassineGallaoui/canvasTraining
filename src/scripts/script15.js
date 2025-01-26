let oldTime = 0

let rectangles = []
const GRAVITY = 98.1

const getRandomRGBColor = () => {
    let randomR = Math.random() * 255
    let randomG = Math.random() * 255
    let randomB = Math.random() * 255
    return `rgba(${randomR}, ${randomG}, ${randomB}, 1)`
}

const checkBoundaries = (rect, canvas) => {
    if(rect.x > canvas.width - rect.width || rect.x < 0){
        rect.velocityX *= -1
    }
    if (rect.y > canvas.height - rect.height || rect.y < 0) {
        rect.y = canvas.height - rect.height
        rect.velocityY *= 0.5
        rect.velocityY *= -1
    }
}

class Rectangle{
    constructor({
        gravity,
        x = 0,
        y = 0,
        width = 10,
        height = 10,
        velocityX = 0,
        velocityY = 0,
        frictionX = 0.99,
        frictionY = 0.99,
        color,
    }) {
        this.gravity = gravity;
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.velocityX = velocityX
        this.velocityY = velocityY
        this.frictionX = frictionX
        this.frictionY = frictionY
        this.color = color
    }
    render(ctx){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    update(deltaTime) {
        this.velocityX *= this.frictionX
        this.velocityY += this.gravity * deltaTime

        this.x += this.velocityX * deltaTime
        this.y += this.velocityY * deltaTime
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

    const sideLength = 50
    setInterval(() => {
        const velX = Math.random() * 100 + 100
        const velY = Math.random() * 200 + 200
        const newRect = new Rectangle({
            gravity: GRAVITY,
            x: 0,
            y: 100,
            width: sideLength,
            height: sideLength,
            velocityX: velX,
            velocityY: velY,
            frictionX: 0.997,
            frictionY: 0.99,
            color: getRandomRGBColor()
        })
        rectangles.push(newRect)
    }, 2000);
    drawFrame()
}

const drawFrame = (ts) => {
    ts /= 1000;
    const ctx = canvas.getContext("2d")
    let deltaTime = parseFloat(ts - oldTime)
    oldTime = ts

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let i = rectangles.length;
    while(i--){
        let rect = rectangles[i]
        rect.update(deltaTime)
        checkBoundaries(rect, canvas)
        rect.render(ctx)
    }

    requestAnimationFrame(drawFrame)
}