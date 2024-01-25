let posX = 0;
let posY = 0;
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

    const centerCanvasX = canvas.width / 2
    const centerCanvasY = canvas.height / 2

    //Clear call
    ctx.fillStyle = 'black'
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    posX += Math.random()
    posY += Math.random()

    ctx.fillRect(centerCanvasX + posX, centerCanvasY + posY, 100, 100)

    requestAnimationFrame(drawFrame)
}