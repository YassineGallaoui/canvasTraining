let oldTime = 0
let oldNumber = 0

const RECT_COUNT = 50
let rectangles = []

class Rectangle{
    constructor({
        x = 0,
        y = 0,
        width = 10,
        height = 10,
        velocityX = 0,
        velocityY = 0,
    }) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.velocityX = velocityX
        this.velocityY = velocityY
    }
    render(ctx){
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    update(deltaTime) {
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
    
    for (let i = 0; i<RECT_COUNT; i++) {
        const sideLength = 50
        rectangles.push(new Rectangle({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            width: sideLength,
            height: sideLength,
            velocityX: (Math.random() * 2 - 1) * 300,
            velocityY: (Math.random() * 2 - 1) * 300,
        }))
    }
    drawFrame()
}

const drawFrame = (ts) => {
    ts /= 1000;
    const ctx = canvas.getContext("2d")
    let deltaTime = parseFloat(ts - oldTime)
    oldTime = ts

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let i = rectangles.length
    while(--i){
        const rect = rectangles[i]
        if (!isNaN(deltaTime)) {
            rect.update(deltaTime)
        }

        if (rect.x > canvas.width || rect.x < 0 || rect.y > canvas.height || rect.y < 0){
            rectangles.splice(i, 1)
        }
        rect.render(ctx)
    }

    if (rectangles.length !== oldNumber) {
        oldNumber = rectangles.length;
        console.log(oldNumber);
    }

    requestAnimationFrame(drawFrame)
}