import HandTracker from "./Hand-Tracker.js";
import CircleBlinker from "./Circle-Blinker.js";
import Hand from "./Hand.js";
import EventEmitter from "../Utils/EventEmitter.js";

export default class GamePlay extends EventEmitter
{
    constructor(videoElement, outputCanvasElement)
    {
        super()
        this.handTracker = new HandTracker(videoElement, outputCanvasElement)

        this.hand = new Hand()
        this.circleBlinker = new CircleBlinker()

        //this.start()
    }

    start()
    {
        this.handTracker.start().then(()=>
        {
            this.circleBlinker.start()
        })

        this.score = 0

        this.trigger('scorechange', [this.score])
    }

    stop()
    {
        this.handTracker.stop()
        this.circleBlinker.stop()
        this.score = 0

        this.trigger('scorechange', [this.score])
    }

    checkScore()
    {
        const onScreenCircles = this.circleBlinker.getOnScreenCircles()

        if(onScreenCircles.length > 25)
        {
            this.trigger('lost')

            alert(`YOU LOST YOUR SCORE IS ${this.score}`)

            this.stop()
        }
    }

    checkCollision(hand, circle= null)
    {
    if(!circle)
    {
     return false
    }

    hand.geometry.computeBoundingSphere();
    circle.geometry.computeBoundingSphere();

    const distance = hand.position.distanceTo(circle.position);
    const sumRadii = hand.geometry.boundingSphere.radius + circle.geometry.boundingSphere.radius;

    return distance < sumRadii;
    }

    mechanics()
    {

        if (this.hand.hand.visible)
        {
            const onScreenCircles = this.circleBlinker.getOnScreenCircles()

            for(const circle of onScreenCircles )
            {
                const collided = this.checkCollision(this.hand.hand, circle);

                if(collided)
                {
                    this.circleBlinker.removeCircle(circle)

                    this.score++

                    this.trigger('scorechange', [this.score])

                    return
                }
            }

        }
    }

    update()
    {
    const handLandmarks = this.handTracker.getHandLandmarks()

    this.hand.update(handLandmarks)

    this.mechanics()

    this.checkScore()
    }
}
