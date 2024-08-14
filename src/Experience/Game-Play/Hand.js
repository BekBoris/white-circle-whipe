import {Mesh, MeshBasicMaterial, SphereGeometry, Vector2, Vector3} from "three";
import Experience from "../Experience.js";

const CIRCLE_DEPTH = 0.1

export default class Hand
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.getScene()
        this.camera = this.experience.getCamera()

        const radius = 3
        const geometry = new SphereGeometry(radius)
        const material  = new MeshBasicMaterial()
        this.hand = new Mesh(geometry, material)
        this.hand.visible = false

        this.scene.add(this.hand)
    }

    transformScreenToWorld(landmark, camera)
    {
        const vec3 = new Vector3()
        const position = new Vector3()

        const x = landmark.x * 2 - 1
        const y = - landmark.y * 2 + 1

        vec3.set(x, y, 0.5)
        vec3.unproject(camera);

        vec3.sub(camera.position.clone()).normalize()

        const distance = camera.position.z / vec3.z

        position.copy(camera.position).add(vec3.multiplyScalar(distance))

        return position.multiply(new Vector2(1, -1))
    }

    positionHand(lMark0, lMark9, lMark13)
    {
        const landmark0 = new Vector2(lMark0.x, lMark0.y)
        const landmark9 = new Vector2(lMark9.x, lMark9.y)
        const landmark13 = new Vector2(lMark13.x, lMark13.y)

        const midpoint9_13 = new Vector2().addVectors(landmark9, landmark13).multiplyScalar(0.5)

        const screenPosition = new Vector2().addVectors(landmark0, midpoint9_13).multiplyScalar(0.5)

        const position = this.transformScreenToWorld(screenPosition, this.camera.instance)
        position.setZ(CIRCLE_DEPTH)

        return position
    }

    update(handLandmarks)
    {

        if(handLandmarks.length === 0)
        {
            this.hand.visible = false
            return
        }

        const landmarks = handLandmarks[0]

        const position = this.positionHand(landmarks[0], landmarks[9], landmarks[13])
        this.hand.position.copy(position.setZ(0.1))
        this.hand.visible = true
    }
}
