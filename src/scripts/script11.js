const position = {
    x: 100,
    y: 100,
}
const velocity = {
    x: 0,
    y: 0,
}
const acc = {
    x: 0,
    y: 0,
}
let oldTime = 0

const BUTTON_ACCELERATION = 2
const SQUARE_WIDTH = 50
const SQUARE_HEIGHT = 50

const loadScript = () => {
    //Initialization
    const CANVAS_WIDTH = window.innerHeight * 0.8;
    const CANVAS_HEIGHT = window.innerHeight * 0.8;

    const canvas = document.getElementById('canvas');

    canvas.width = CANVAS_WIDTH * devicePixelRatio;
    canvas.height = CANVAS_HEIGHT * devicePixelRatio;

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp')
            acc.y = -BUTTON_ACCELERATION;
        if (event.key === 'ArrowDown')
            acc.y = BUTTON_ACCELERATION;
        if (event.key === 'ArrowLeft')
            acc.x = -BUTTON_ACCELERATION;
        if (event.key === 'ArrowRight')
            acc.x = BUTTON_ACCELERATION;
    })

    document.addEventListener('keyup', () => {
            acc.x = 0  
            acc.y = 0
    })

    canvas.style.setProperty('width', `${CANVAS_WIDTH}px`)
    canvas.style.setProperty('height', `${CANVAS_HEIGHT}px`)

    drawFrame()
}

const drawFrame = (ts) => {
    ts /= 1000;
    const ctx = canvas.getContext("2d")
    let deltaTime = parseFloat(ts - oldTime)
    oldTime = ts

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (!isNaN(deltaTime)){
        velocity.x += (acc.x * deltaTime)
        velocity.y += (acc.y * deltaTime)
    }

    position.x += velocity.x;
    position.y += velocity.y;

    if (position.x > canvas.width) position.x = 0
    if (position.x < 0) position.x = canvas.width
    if (position.y > canvas.height) position.y = 0
    if (position.y < 0) position.y = canvas.height

    ctx.fillStyle = 'black'
    ctx.fillRect(position.x, position.y, SQUARE_WIDTH, SQUARE_HEIGHT)

    requestAnimationFrame(drawFrame)
}