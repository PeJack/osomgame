import {RenderManager} from './render/render';

export class App {
    public renderManager: any;

    constructor() {
        this.renderManager = new RenderManager();
        this.renderManager.start();
        this.renderManager.bufferInit();
        this.renderManager.run();
    }
}