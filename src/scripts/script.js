const loadScript = () => {
    
    //Initialization
    const CANVAS_WIDTH = window.innerHeight * 0.8;
    const CANVAS_HEIGHT = window.innerHeight * 0.8;

    const canvas = document.getElementById('canvas');

    canvas.width = CANVAS_WIDTH * devicePixelRatio;
    canvas.height = CANVAS_HEIGHT * devicePixelRatio;

    canvas.style.setProperty('width', `${CANVAS_WIDTH}px`)
    canvas.style.setProperty('height', `${CANVAS_HEIGHT}px`)

    //UpdateLoop
    drawFrame(canvas);
}

const drawFrame = () => {
    const ctx = canvas.getContext("2d");

    ctx.moveTo(100, 100)
    ctx.lineTo(200, 200)
    ctx.stroke()

    requestAnimationFrame(drawFrame)
}