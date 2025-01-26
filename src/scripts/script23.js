let oldTime = 0

let boxes = []
const GRAVITY = 981.

const getRandomRGBColor = () => {
    let randomR = Math.random() * 255
    let randomG = Math.random() * 255
    let randomB = Math.random() * 255
    return `rgba(${randomR}, ${randomG}, ${randomB}, 1)`
}

class Rectangle{
    constructor(x, y, width, height, color, velocityY){
        this.x = x,
        this.y = y,
        this.width = width
        this.height = height
        this.color = color
        this.velocityY = velocityY
    }
    update(dt){
        if (this.velocityY !== 0){
            this.velocityY += GRAVITY * dt
            this.y += this.velocityY * dt
        }
    }
    render(ctx){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
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

    drawFrame()
}

const drawFrame = (ts) => {
    ts /= 1000;
    const ctx = canvas.getContext("2d")
    let dt = parseFloat(ts - oldTime)
    oldTime = ts

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const lastBox = boxes[boxes.length-1]

    if(lastBox == null){
        createNewRect(canvas)
    }

    if (lastBox != null) {
        if (arrivedToBottom(lastBox, canvas)) {
            createNewRect(canvas)
        } else {
            if (boxes.length > 1) {
                let hit = false;
                boxes.forEach((box, index) => {
                    if (index != boxes.length - 1 && checkHit(box, lastBox)) {
                        hit = true
                    }
                })
                if (hit) createNewRect(canvas)
            }
        }
    }

    for(let i=0; i<boxes.length; i++) {
        const box = boxes[i]
        if(!isNaN(dt))
            box.update(dt)
        box.render(ctx)
    }

    requestAnimationFrame(drawFrame)
}

const checkHit = (box1, lastBox) => {
    if ((box1.x <= lastBox.x + 100
        && box1.x + 100 >= lastBox.x) &&
        (box1.y <= lastBox.y + 100
            && box1.y + 100 >= lastBox.y)) {
        lastBox.velocityY = 0
        lastBox.y = box1.y - 100
        return true
    } else {
        return false
    }
}

const arrivedToBottom = (lastBox, canvas) => {
    if(lastBox.y + lastBox.height >= canvas.height){
        lastBox.velocityY = 0;
        lastBox.y = canvas.height - lastBox.height;
        return true;
    } else 
        return false;
}

const createNewRect = (canvas) => {
    const x = Math.random() * canvas.width * 0.9
    const newBox = new Rectangle(x, -100, 100, 100, getRandomRGBColor(), 100)
    boxes.push(newBox)
}