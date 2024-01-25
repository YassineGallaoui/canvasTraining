const angle = Math.random() * (Math.PI * 2);
let posX = 0
let posY = 0
const mousePosition = {
    x:0,
    y:0
}

const getLayerX = (event) => {
    return event.clientX - event.target.getBoundingClientRect().x
}

const getLayerY = (event) => {
    return event.clientY - event.target.getBoundingClientRect().y
}

let oldTime = 0;
const loadScript = () => {
    //Initialization
    const CANVAS_WIDTH = window.innerHeight * 0.8;
    const CANVAS_HEIGHT = window.innerHeight * 0.8;

    const canvas = document.getElementById('canvas');

    canvas.width = CANVAS_WIDTH * devicePixelRatio;
    canvas.height = CANVAS_HEIGHT * devicePixelRatio;

    canvas.addEventListener('mousemove', (event) => {
        mousePosition.x = getLayerX(event);
        mousePosition.y = getLayerY(event);
    })

    canvas.style.setProperty('width', `${CANVAS_WIDTH}px`)
    canvas.style.setProperty('height', `${CANVAS_HEIGHT}px`)

    drawFrame()
}

const drawFrame = (ts) => {
    ts /= 1000;
    const ctx = canvas.getContext("2d")

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const canvasCenterX = canvas.width / 2
    const canvasCenterY = canvas.height / 2

    const dt = ts - oldTime
    oldTime = ts
    let mouseAngle = Math.atan2(mousePosition.y - (canvasCenterY / 2), mousePosition.x - (canvasCenterX / 2));

    //Arrow
    ctx.lineWidth = 3
    ctx.strokeStyle = 'red'
    ctx.fillStyle = 'yellow'
        
    const speed = 2;
    let velocityX = parseFloat(Math.cos(mouseAngle) * speed);
    let velocityY = parseFloat(Math.sin(mouseAngle) * speed);

    if (!isNaN(velocityX) || !isNaN(velocityY)) {
        posX += velocityX
        posY += velocityY
    } else {
        posX = canvasCenterX
        posY = canvasCenterY
    }

    ctx.save();

        ctx.translate(posX, posY)
        ctx.rotate(mouseAngle)

        ctx.beginPath()
        ctx.moveTo(0, 10)
        ctx.lineTo(100, 10)
        ctx.lineTo(100, 20)
        ctx.lineTo(140, 0)
        ctx.lineTo(100, -20)
        ctx.lineTo(100, -10)
        ctx.lineTo(0, -10)
        ctx.closePath()
        ctx.stroke()
        ctx.fill()

    ctx.restore()

    requestAnimationFrame(drawFrame)
}