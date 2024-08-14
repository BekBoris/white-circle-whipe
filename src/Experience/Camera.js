import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {PerspectiveCamera, Vector3} from "three";

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.getSizes()
        this.scene = this.experience.getScene()
        this.canvas = this.experience.canvas
        this.fov = 65

        this.setInstance()
        this.setControls()
    }

    setInstance()
    {
        this.instance = new PerspectiveCamera(this.fov, this.sizes.width / this.sizes.height, 0.1, 1000)
        this.instance.position.set(15, 0, 8)
        this.instance.lookAt(new Vector3())
        this.scene.add(this.instance)
    }

    setPosition(vector)
    {
        this.instance.position.copy(vector)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enabled = false
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}
