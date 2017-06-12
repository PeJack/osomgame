export let canvas = document.getElementById("glcanvas");

export let camera = new THREE.PerspectiveCamera(
    45, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    30000
);

export let scene = new THREE.Scene;