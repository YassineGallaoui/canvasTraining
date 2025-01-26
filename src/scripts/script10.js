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
    y: 0.981,
}
let oldTime = 0

const loadScript = () => {
    //Initialization
    const CANVAS_WIDTH = window.innerHeight * 0.8;
    const CANVAS_HEIGHT = window.innerHeight * 0.8;

    const canvas = document.getElementById('canvas');

    canvas.width = CANVAS_WIDTH * devicePixelRatio;
    canvas.height = CANVAS_HEIGHT * devicePixelRatio;

    document.addEventListener('keydown', (event) => {
        /* switch (event.key) {
            case 'ArrowUp':
                acc.y = -1;
            case 'ArrowDown':
                acc.y = 1;
            case 'ArrowLeft':
                acc.x = -1;
            case 'ArrowRight':
                acc.x = 1;
            default:
                break
        } */
        if (event.key === 'ArrowUp')
            acc.y = -1;
        if (event.key === 'ArrowDown')
            acc.y = 1;
        if (event.key === 'ArrowLeft')
            acc.x = -1;
        if (event.key === 'ArrowRight')
            acc.x = 1;
    })

    document.addEventListener('keyup', () => {
            acc.x = 0  
            acc.y = 0.981
                
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

    ctx.fillStyle = 'black'
    ctx.fillRect(position.x,position.y,20,20)

    requestAnimationFrame(drawFrame)
}