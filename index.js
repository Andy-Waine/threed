//THREE.js MAIN ITEMS
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
    75, //field-of-view
    window.innerWidth/window.innerHeight, //aspect ratio
    0.1, //near plane
    1000 //far plane
);

camera.position.z = 5;

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

    camera.updateProjectionMatrix();
})

//shape
var geometry = new THREE.BoxGeometry(
    1, //radius
    1, //widthSegment
    1 //heightSegment
);

//texture
var material = new THREE.MeshLambertMaterial({color: 0x4C1130})

//combines geometry and material
var mesh = new THREE.Mesh(geometry, material);

//position object
mesh.position.x = -2;
mesh.position.y = 2;
mesh.position.z = -2;

//rotate object (fixed)
mesh.rotation.x = 45;
mesh.rotation.y = 0;
mesh.rotation.z = 0;



scene.add(mesh);

var light = new THREE.PointLight(
    0xFFFFFF, //color
    1, //intensity
    500 //distance
    )

light.position.set(
    10, //x-value
    0, //y-value
    25 //z-value
)

scene.add(light);

//renders at 60 fps
var render = function() {
    //re-sizes rendered object with window
    requestAnimationFrame(render);

    //rotate object (animated)
    mesh.rotation.x += .01;
    mesh.rotation.y += .003;
    mesh.rotation.z += .003;

    //renders object
    renderer.render(scene, camera);
}

render();

//this.tl = new TimelineMax().delay(.3);
//this.tl.to(this.mesh.scale, 1, {x: 2, ease: Expo.easeOut})