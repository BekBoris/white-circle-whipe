import Experience from './Experience/Experience.js'

const canvas = document.querySelector('canvas.webgl')
const video = document.querySelector('video.webcam')
const outputCanvas = document.querySelector('canvas.output-canvas')

const score = document.querySelector('div.score')
const startButton = document.querySelector('div.start')
const stopButton = document.querySelector('div.stop')

const experience = new Experience(canvas, video, outputCanvas)

startButton.addEventListener('click', () =>
{
    video.style.display = 'block'
    experience.getGamePlay().start()
})
stopButton.addEventListener('click', () =>
{
    video.style.display = 'none'
    experience.getGamePlay().stop()
})

experience.getGamePlay().on('scorechange', (scoreNum) =>
{
    score.innerText = scoreNum
})

experience.getGamePlay().on('lost', () =>
{
    video.style.display = 'none'
})
