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

//LOADERS: texture manipulation properties g0 here
const loaderSide01 = new THREE.TextureLoader().load('textures/logo-main-B1.PNG');
    loaderSide01.wrapS = THREE.RepeatWrapping;
    loaderSide01.repeat.x = -1;
const loaderSide01Inv = new THREE.TextureLoader().load('textures/logo-main-B1.PNG');
    loaderSide01Inv.wrapS = THREE.RepeatWrapping;
    loaderSide01Inv.repeat.x = -1;
const loaderSide02 = new THREE.TextureLoader().load('textures/logo-main-B2.PNG');
    loaderSide02.wrapS = THREE.RepeatWrapping;
    loaderSide02.repeat.x = -1;
    loaderSide02.center.set(.5, .5);
    loaderSide02.rotation = THREE.Math.degToRad(180);
const loaderSide02Inv = new THREE.TextureLoader().load('textures/logo-main-B2.PNG');
    loaderSide02Inv.wrapS = THREE.RepeatWrapping;
    loaderSide02Inv.repeat.x = -1;
    loaderSide02Inv.center.set(.5, .5);
    loaderSide02Inv.rotation = THREE.Math.degToRad(0);
const loaderSide03 = new THREE.TextureLoader().load('textures/logo-main-B3.PNG');
    loaderSide03.wrapS = THREE.RepeatWrapping;
    loaderSide03.repeat.x = -1;
    loaderSide03.center.set(.5, .5);
    loaderSide03.rotation = THREE.Math.degToRad(0);
const loaderSide03Inv = new THREE.TextureLoader().load('textures/logo-main-B3.PNG');
    loaderSide03Inv.wrapS = THREE.RepeatWrapping;
    loaderSide03Inv.repeat.x = -1;
    loaderSide03Inv.center.set(.5, .5);
    loaderSide03Inv.rotation = THREE.Math.degToRad(180);

const cubeMaterials = [ 
    new THREE.MeshPhongMaterial({ map: loaderSide03 }), 
    new THREE.MeshPhongMaterial({ map: loaderSide03Inv }),
    new THREE.MeshPhongMaterial({ map: loaderSide02 }), 
    new THREE.MeshPhongMaterial({ map: loaderSide02Inv }), 
    new THREE.MeshPhongMaterial({ map: loaderSide01 }),  
    new THREE.MeshPhongMaterial({ map: loaderSide01Inv }),
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
    1.5, //radius
    1.5, //widthSegment
    1.5 //heightSegment
);

//combines geometry and material
var mesh = new THREE.Mesh(geometry, cubeMaterials);

//position object
mesh.position.x = 1.8;
mesh.position.y = 0;
mesh.position.z = 0;

//rotate object (fixed)
mesh.rotation.x = 90;
mesh.rotation.y = 0;
mesh.rotation.z = 0;

scene.add(mesh);


//Lighting
var overheadLight = new THREE.PointLight(
    0xFFFFFF, //color
    1.6, //intensity
    500 //distance
    )

overheadLight.position.set(
    0, //x-value
    30, //y-value
    70 //z-value
)

var bLeftLight = new THREE.PointLight(
    0xFFFFFF, //color
    .6, //intensity
    500 //distance
    )

bLeftLight.position.set(
    -40, //x-value
    0, //y-value
    20 //z-value
)

var bRightLight = new THREE.PointLight(
    0xFFFFFF, //color
    .6, //intensity
    500 //distance
    )

bRightLight.position.set(
    40, //x-value
    0, //y-value
    0 //z-value
)

scene.add(overheadLight, bLeftLight, bRightLight);

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