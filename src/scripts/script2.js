const image = new Image()
const video = document.createElement('video');
video.muted = "muted"

const loadScript = () => {
    image.onload = () => {
        video.onloadeddata = () => {
            video.play()
            drawFrame(canvas);
        }
        video.src = '../../assets/sample-video.mp4'
    }
    image.src = '../../assets/neom.jpg'

    //Initialization
    const CANVAS_WIDTH = window.innerHeight * 0.8;
    const CANVAS_HEIGHT = window.innerHeight * 0.8;

    const canvas = document.getElementById('canvas');

    canvas.width = CANVAS_WIDTH * devicePixelRatio;
    canvas.height = CANVAS_HEIGHT * devicePixelRatio;

    canvas.style.setProperty('width', `${CANVAS_WIDTH}px`)
    canvas.style.setProperty('height', `${CANVAS_HEIGHT}px`)
}

const drawFrame = (ts) => {
    ts /= 1000;

    const ctx = canvas.getContext("2d")

    //Clear call
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    //Rectangle
    const gradient = ctx.createLinearGradient(100, 100, 200, 100)
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1, 'yellow');

    ctx.fillStyle = gradient;
    ctx.strokeStyle = 'blue'
    ctx.lineWidth = 5

    ctx.fillRect(100, 100, 100, 100)
    ctx.strokeRect(100, 100, 100, 100)

    //Circle
    const circleX = 150;
    const circleY = 350;
    const circleRadius = 50;
    const startAngle = 0;
    const endAngle = Math.PI * ts;
    const fillCircle = 'orange';
    const strokeCircle = 'red';
    ctx.beginPath()
    ctx.arc(circleX, circleY, circleRadius, startAngle, endAngle);
    ctx.fillStyle = fillCircle;
    ctx.fill();
    
    //Lines
    ctx.lineWidth = 3
    ctx.strokeStyle = 'brown'
    ctx.beginPath();
    ctx.moveTo(125, 500);
    ctx.lineTo(200, 500);
    ctx.lineTo(200, 450);
    ctx.closePath()
    ctx.stroke()
    ctx.fill()

    //Paths
    //Quadratic curve
    ctx.lineWidth = 2
    ctx.strokeStyle = 'red'
    ctx.beginPath()
    ctx.moveTo(125, 600)
    ctx.quadraticCurveTo(190, 500, 250, 600)
    ctx.stroke();

    //Paths
    //Bezier curve
    ctx.lineWidth = 3
    ctx.strokeStyle = 'red'
    ctx.beginPath()
    ctx.moveTo(125, 700)
    ctx.bezierCurveTo(150, 650 + (ts * 20), 200, 650, 225, 700)
    ctx.stroke()

    //Text
    ctx.font = '4rem sans-serif'
    ctx.fillText('Ciao mondo', 125, 800)
    ctx.strokeText('Hello world', 125, 900)

    //Image
    ctx.drawImage(image, 600, 100, image.naturalWidth * 0.5, image.naturalHeight * 0.5)

    //Video
    ctx.drawImage(video, 600, 600, video.videoWidth * 0.2, video.videoHeight * 0.2)

    requestAnimationFrame(drawFrame)
}