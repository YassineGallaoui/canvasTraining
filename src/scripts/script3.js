const image = new Image()
const video = document.createElement('video');
video.muted = "muted"

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

    //Clear call
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    const circleX = canvas.width / 2
    const circleY = canvas.height / 2
    const circleRadius = 100 + (Math.sin(ts*5) * 60)
    const startAngle = 0
    const endAngle = Math.PI * 2
    const circleCounterClockwise = false

    ctx.fillStyle = 'blue'
    ctx.beginPath()
    ctx.arc(circleX, circleY, circleRadius, startAngle, endAngle, circleCounterClockwise)
    ctx.fill()
    

    requestAnimationFrame(drawFrame)
}