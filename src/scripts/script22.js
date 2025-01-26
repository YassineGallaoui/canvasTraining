let oldTime = 0
const mousePos= {
    x: NaN,
    y: NaN
}

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

    ctx.fillStyle = 'orange'
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = 'violet'
    if (!isNaN(mousePos.x)){
        ctx.beginPath()
        ctx.arc(mousePos.x, mousePos.y, 100, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    } else{
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2 - 250, 100, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }
    
    const overlapTextBox = document.getElementById('overlapText')
    if (!isNaN(mousePos.x)){
        const dist = Math.sqrt(Math.pow((mousePos.x - (canvas.width / 2)), 2) + Math.pow((mousePos.y - (canvas.height / 2)), 2))
        if (dist < 200)
            overlapTextBox.innerText = 'OVERLAP'
        else
            overlapTextBox.innerText = 'NO overlap'
    }
    requestAnimationFrame(drawFrame)
}