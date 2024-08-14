import Experience from "../Experience.js";
import {Mesh, MeshBasicMaterial, PlaneGeometry, Vector3} from "three";

/**
 * Finds distance to position perspective camera
 */
const cameraDistance = (height, fov) => {
    return (height / 2) / Math.tan((fov/2) * Math.PI / 180);
}

export default class Screen2D
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.getScene()
        this.sizes = this.experience.getSizes()
        this.camera = this.experience.getCamera()

        this.height = 20
        this.width = 20 * this.sizes.ratio

        this.setScreenPlane()
        this.cameraOnScreenPlane()
    }

    setScreenPlane()
    {
        const geometry = new PlaneGeometry(this.width, this.height)
        const material = new MeshBasicMaterial()
        this.planeMesh = new Mesh(geometry, material)
        this.planeMesh.visible = false
        this.scene.add( this.planeMesh)
    }

    cameraOnScreenPlane()
    {
        const distance = cameraDistance(20, this.camera.fov)
        this.camera.setPosition(new Vector3().setZ(distance))
    }

    getScreen2sSizes()
    {
        return {width: this.width, height: this.height}
    }
}
