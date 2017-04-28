import {canvas} from './canvas';
export let gl;

try {
	gl = canvas.getContext("experimental-webgl");
} catch (e) {
	alert(e);
}

if (!gl) 
	alert("Could not initialize WebGL");


