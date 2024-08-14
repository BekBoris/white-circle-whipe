import {Mesh, Scene} from "three";
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import GamePlay from './Game-Play/Game-Play.js'

let instance = null

export default class Experience
{
    constructor(canvas, video, outputCanvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this

        // Options
        this.canvas = canvas

        // Setup
        this.sizes = new Sizes()
        this.scene = new Scene()
        this.time = new Time()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.gamePlay = new GamePlay(video, outputCanvas)

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    getSizes()
    {
        return this.sizes
    }

    getScene()
    {
        return this.scene
    }

    getCamera()
    {
        return this.camera
    }

    getGamePlay()
    {
        return this.gamePlay
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.gamePlay.update()
        this.renderer.update()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()
    }
}
