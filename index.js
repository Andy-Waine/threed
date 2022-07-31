//THREE.js MAIN ITEMS
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
    75, //field-of-view
    window.innerWidth/window.innerHeight, //aspect ratio
    0.1, //near plane
    1000 //far plane
);


var renderer = new THREE.WebGLRenderer(
    {antialias: true}
);
//END THREE.js MAIN ITEMS

//background color
renderer.setClearColor("#e5e5e5");

//sets canvas size
renderer.setSize(window.innerWidth, window.innerHeight);

//appemds to DOM
document.body.appendChild(renderer.domElement);

//resize canvas with window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectMatrix();
})

renderer.render(scene, camera);