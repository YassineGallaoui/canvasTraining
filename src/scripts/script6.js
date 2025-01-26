const mousePosition = {
    x: 0,
    y: 0
}

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
    
    canvas.addEventListener('mousemove', (event) => {
        mousePosition.x = getLayerX(event);
        mousePosition.y = getLayerY(event);
    })

    drawFrame()
}

const drawFrame = (ts) => {
    ts /= 1000;
    const ctx = canvas.getContext("2d")

    //Clear call
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    
    //Arrow
    ctx.lineWidth = 3
    ctx.strokeStyle = 'red'
    ctx.fillStyle = 'yellow'

    ctx.save()
                ctx.translate(centerX, centerY)
                ctx.rotate(Math.atan2(mousePosition.y - centerY, mousePosition.x - centerX))

                ctx.beginPath()
                ctx.moveTo(0, 10)
                ctx.lineTo(100, 10)
                ctx.lineTo(100, 25)
                ctx.lineTo(140, 0)
                ctx.lineTo(100, -25)
                ctx.lineTo(100, -10)
                ctx.lineTo(0, -10)
                ctx.closePath()
                ctx.stroke()
                ctx.fill()

    ctx.restore()

    requestAnimationFrame(drawFrame)
}