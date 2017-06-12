export class Light {
    constructor(renderer, scene) {
        this.lighttarget = null;
        this.spotlight = null;
        this.hemilight = null;
        this.skycolor = 200;

        this.create();
    }

    create() {
        this.lighttarget = new THREE.Object3D();
        this.lighttarget.position.set(0, 0, 0);

        this.spotlight = new THREE.SpotLight(0xffffff);
        this.spotlight.position.set(0, 6500, 0);
        this.spotlight.shadow.camera.visible = false;
        this.spotlight.shadow.camera.near = 3000;
        this.spotlight.shadow.camera.far = 10000;
        this.spotlight.intensity = 1.7;
        this.spotlight.shadow.mapSize.height = 1024;
        this.spotlight.shadow.mapSize.width = 1024;
        this.spotlight.target = this.lighttarget;

        this.hemilight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        this.hemilight.color.setHSL(0.2, 1, 0.2);
        this.hemilight.groundColor.setHSL(1, 1, 1);
        this.hemilight.position.set(0, 1000, 0);
        this.hemilight.intensity = 0.7;



    }
}