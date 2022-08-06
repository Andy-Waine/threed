//THREE.js MAIN ITEMS
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75, //field-of-view
    window.innerWidth/window.innerHeight, //aspect ratio
    0.1, //near plane
    1000 //far plane
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer(
    {antialias: true}
);
//END THREE.js MAIN ITEMS

const loader = new THREE.TextureLoader();
const cubeMaterials = [ 
    new THREE.MeshBasicMaterial({ map: loader.load('textures/logo-main-02.PNG'), side:THREE.DoubleSide }), 
    new THREE.MeshBasicMaterial({ map: loader.load('textures/logo-main-03.PNG'), side:THREE.DoubleSide }), 
    new THREE.MeshBasicMaterial({ map: loader.load('textures/logo-main-02.PNG'), side:THREE.DoubleSide }), 
    new THREE.MeshBasicMaterial({ map: loader.load('textures/logo-main-03.PNG'), side:THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: loader.load('textures/logo-main-01.PNG'), side:THREE.DoubleSide }),  
    new THREE.MeshBasicMaterial({ map: loader.load('textures/logo-main-01.PNG'), side:THREE.DoubleSide }),
];


//wrap and repeat offset auto-inversion of image by three.js
// texture.wrapS = THREE.RepeatWrapping;
// texture.repeat.x = -1;

//background color
renderer.setClearColor("#607DDE");

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

//combines geometry and material
var mesh = new THREE.Mesh(geometry, cubeMaterials);

//position object
mesh.position.x = 0;
mesh.position.y = 0;
mesh.position.z = 0;

//rotate object (fixed)
mesh.rotation.x = 90;
mesh.rotation.y = 0;
mesh.rotation.z = -180;



scene.add(mesh);

var light = new THREE.PointLight(
    0xFFFFFF, //color
    2, //intensity
    500 //distance
    )

light.position.set(
    0, //x-value
    -10, //y-value
    200 //z-value
)

scene.add(light);

//initial position outside of render function
const renderPosition = mesh.position.y;
//renders at 60 fps
var render = function() {
    //re-sizes rendered object with window
    requestAnimationFrame(render);

    //position object (animated)
    // mesh.position.x += .005;
    // mesh.position.y += .005;
    // mesh.position.z += .005;

    // vertical hover (BROKEN)
    // if (mesh.position.y = renderPosition) {
    //     mesh.position.y += .005;
    // }
    // else if (mesh.position.y > (renderPosition + .050)) {
    //     mesh.position.y -= .005;
    // }

    //rotate object (animated)
    // mesh.rotation.x += .005;
    // mesh.rotation.y += .005;
    mesh.rotation.z += .005;

    //renders object
    renderer.render(scene, camera);
}

render();

//this.tl = new TimelineMax().delay(.3);
//this.tl.to(this.mesh.scale, 1, {x: 2, ease: Expo.easeOut})