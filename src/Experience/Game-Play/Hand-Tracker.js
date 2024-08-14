import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands'
import { Camera } from '@mediapipe/camera_utils'
import Experience from "../Experience.js"

export default class HandTracker
{
    constructor(videoElementId, canvasElementId)
    {
        this.experience = new Experience()
        this.sizes = this.experience.getSizes()
        this.videoElement = videoElementId

        this.tracking = false
        this.handLandmarks = []

        this.hands = new Hands({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        })

        this.hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        })

        this.hands.onResults(this.onResults.bind(this))

        this.setCamera()
    }

    setCamera() {
        this.camera = new Camera(this.videoElement, {
            onFrame: async () => {
                await this.hands.send({ image: this.videoElement })
            },
            width: this.sizes.width,
            height: this.sizes.height
        })
    }

    onResults(results) {

        this.tracking = true

        if (results.multiHandLandmarks) this.handLandmarks = results.multiHandLandmarks
    }

    start()
    {
        return this.camera.start()
    }

    stop()
    {
        this.tracking = false
        return this.camera.stop()
    }

    getHandLandmarks()
    {
        return [...this.handLandmarks]
    }
}
