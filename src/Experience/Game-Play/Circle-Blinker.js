import {CircleGeometry, Group, Mesh, MeshBasicMaterial, Vector2} from "three";
import Experience from "../Experience.js";
import Screen2D from "./Screen2D.js";

const CIRCLE_DEPTH = 0.1

export default class CircleBlinker
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.getScene()
        this.screen2D = new Screen2D()

        this.group = new Group()
        this.scene.add(this.group)

        this.onScreenCircles = []

        this.timeId = null
        this.downgradeId = null

        this.time = 2000
        this.downGradeTime = 4000
        this.edge = 400
        this.downGradeSpeed = 200

    }

    start()
    {
        if(this.timeId)
        {
            this.stop()
        }

        this.activate()

        this.downgradeId = setInterval(() =>
        {

            if(this.time > this.edge)
            {
                this.time -= this.downGradeSpeed

                if(this.timeId) clearInterval(this.timeId)

                this.activate()
            }

        }, this.downGradeTime)
    }

    activate()
    {
        this.timeId = setInterval(() =>
        {
            const randomRadius = Math.random() * 1.5 + 0.5
            const geometry = new CircleGeometry(randomRadius)
            geometry.computeBoundingSphere()

            const material = new MeshBasicMaterial({color: 0xffffff * Math.random() })

            const mesh = new Mesh(geometry, material)

            const positionOne =this.generatePositionXY(randomRadius)

            mesh.position.x = positionOne.x
            mesh.position.y = positionOne.y
            mesh.position.z = CIRCLE_DEPTH

            this.group.add(mesh)
            this.onScreenCircles.push(mesh)

        }, this.time)
    }

    stop()
    {
        if(this.timeId) clearInterval(this.timeId)

        if(this.downgradeId) clearInterval(this.downgradeId)

        this.cleanCircles()
    }

    generatePositionXY(randomRadius)
    {
        const {width, height} = this.screen2D.getScreen2sSizes()

        const halfPlaneX = width / 2
        const halfPlaneY = height / 2

        const minX = -halfPlaneX + randomRadius;
        const maxX = halfPlaneX - randomRadius;
        const minY = -halfPlaneY + randomRadius;
        const maxY = halfPlaneY - randomRadius;

        // Randomly set x and y within the adjusted bounds
        const x = Math.random() * (maxX - minX) + minX;
        const y = Math.random() * (maxY - minY) + minY;

        return new Vector2(x, y)
    }

    cleanCircles()
    {

        this.onScreenCircles.forEach(circle =>
        {
            circle.parent.remove(circle)
            circle.geometry.dispose()
            circle.material.dispose()
        })

        this.onScreenCircles = []
    }

    removeCircle(circle)
    {
        const index = this.onScreenCircles.indexOf(circle)

        if(index !== -1)
        {
            this.onScreenCircles.splice(index, 1)
            circle.parent.remove(circle)
            circle.geometry.dispose()
            circle.material.dispose()
        }

    }

    getOnScreenCircles()
    {
        return [...this.onScreenCircles]
    }
}
