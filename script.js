const playGround = document.querySelector('#playground')
const ctx = playGround.getContext('2d')
const scoreText = document.querySelector('#score_text')
const restartBtn = document.querySelector('#restart_btn')

const gameWidth = playGround.width
const gameHeight = playGround.height

const background = "#545875"
const paddle1Color = "black"
const paddle2Color = "black"
const paddleBorder = "black"
const paddleBorderRadius = 5
const ballColor = "yellow"
const ballRadius = 12.5
const ballBorderColor = "black"
const paddleSpeed = 50

let intervalID;
let ballSpeed = 1
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0
let ballYDirection = 0
let playr1Score = 0
let playr2Score = 0

let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0,
}
let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100,
}

window.addEventListener("keydown", changeDirection)
restartBtn.addEventListener("click", restartGame)

gameStart()

function gameStart() {
    createBall()
    nextTick()
}
function nextTick() {
    intervalID = setTimeout(() => {
        clearBoard()
        drawPaddles()
        moveBall()
        drawBall(ballX, ballY)
        checkCollision()
        nextTick()
    }, 10)
}
function clearBoard() {
    ctx.fillStyle = background
    ctx.fillRect(0, 0, gameWidth, gameHeight)
}
function drawPaddles() {
    ctx.strokeStyle = paddleBorder;

    ctx.fillStyle = paddle1Color
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillStyle = paddle2Color
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}
function createBall() {
    ballSpeed = 1
    if (Math.round(Math.random()) == 1) {
        ballXDirection = 1
    }
    else {
        ballXDirection = -1
    }

    if (Math.round(Math.random()) == 1) {
        ballYDirection = 1
    }
    else {
        ballYDirection = -1
    }
    ballX = gameWidth / 2
    ballY = gameHeight / 2
    drawBall(ballX, ballY)
}
function moveBall() {
    ballX += (ballSpeed * ballXDirection)
    ballY += (ballSpeed * ballYDirection)
}
function drawBall(ballX, ballY) {
    ctx.fillStyle = ballColor
    ctx.strokeStyle = ballBorderColor
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.fill()
}
function checkCollision() {
    if (ballY <= 0 + ballRadius) {
        ballYDirection *= -1
    }
    if (ballY >= gameHeight - ballRadius) {
        ballYDirection *= -1
    }

    if (ballX <= 0) {
        playr2Score += 1
        updateScore()
        createBall()
        return;
    }

    if (ballX >= gameWidth) {
        playr1Score += 1
        updateScore()
        createBall()
        return;
    }

    if (ballX <= (paddle1.x + paddle1.width + ballRadius)) {
        if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
            ballX = (paddle1.x + paddle1.width) + ballRadius
            ballXDirection *= -1
            ballSpeed += 0.5
        }
    }

    if (ballX >= (paddle2.x - ballRadius)) {
        if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
            ballX = paddle2.x - ballRadius
            ballXDirection *= -1
            ballSpeed += 0.5
        }
    }
}
function changeDirection(e) {
    const keyPressed = e.keyCode

    const paddle1Up = 87
    const paddle1Down = 83

    const paddle2Up = 38
    const paddle2Down = 40

    switch (keyPressed) {
        case (paddle1Up):
            if (paddle1.y > 0) {
                paddle1.y -= paddleSpeed
            }
            break;

        case (paddle1Down):
            if (paddle1.y < gameHeight - paddle1.height) {
                paddle1.y += paddleSpeed
            }
            break;



        case (paddle2Up):
            if (paddle2.y > 0) {
                paddle2.y -= paddleSpeed
            }
            break;

        case (paddle2Down):
            if (paddle2.y < gameHeight - paddle2.height) {
                paddle2.y += paddleSpeed
            }
            break;
    }
    console.log(keyPressed)
}
function updateScore() {
    scoreText.textContent = `${playr1Score} : ${playr2Score}`
}
function restartGame() {
    playr1Score = 0
    playr2Score = 0
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0,
    }
    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100,
    }
    ballSpeed = 1
    ballX = 0
    ballY = 0
    ballXDirection = 0
    ballYDirection = 0
    updateScore()
    clearInterval(intervalID)
    gameStart()
}
