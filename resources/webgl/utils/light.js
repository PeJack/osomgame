import {Data} from './data';
var glmat = require('./../vendor/gl-matrix');

export class Light {
    constructor(color, position, attenuation, enabled) {
        this.color = color ? color : [1.0, 1.0, 1.0];
	    this.position = position ? position : [0.0, 0.0, 0.0];
	    this.attenuation = attenuation ? attenuation : [0.5, 0.1, 0.0];
	    this.enabled = enabled ? enabled : true;

	    this.frame = 0;
    }

    update() {
	    for (var i=0; i<3; i++) 
	        this.color[i] += Math.sin(0.0005*this.frame*180/Math.PI)*0.002;

	    this.frame++;
	}
}