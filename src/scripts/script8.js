var angle = 0
var posX = 0
var posY = 0

let oldTime = 0;
const loadScript = () => {
    //Initialization
    const CANVAS_WIDTH = window.innerHeight * 0.8;
    const CANVAS_HEIGHT = window.innerHeight * 0.8;

    const canvas = document.getElementById('canvas');

    canvas.width = CANVAS_WIDTH * devicePixelRatio;
    canvas.height = CANVAS_HEIGHT * devicePixelRatio;

    posX = canvas.width / 2
    posY = canvas.height / 2
    angle = Math.random() * (Math.PI * 2)

    canvas.style.setProperty('width', `${CANVAS_WIDTH}px`)
    canvas.style.setProperty('height', `${CANVAS_HEIGHT}px`)

    drawFrame()
}

const drawFrame = (ts) => {
    ts /= 1000;
    const ctx = canvas.getContext("2d")

    const dt = ts - oldTime
    oldTime = ts

    //Rect
    ctx.fillStyle = 'black'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
        
    const speed = dt;

    const velocityX = parseFloat((Math.cos(angle) * speed).toFixed(3)) * 100;
    const velocityY = parseFloat((Math.sin(angle) * speed).toFixed(3)) * 100;

    if (!isNaN(velocityX) || !isNaN(velocityY)) {
        posX += velocityX
        posY += velocityY
    }

    ctx.fillRect(posX, posY, 100, 100)

    requestAnimationFrame(drawFrame)
}