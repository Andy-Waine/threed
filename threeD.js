var img1URL = '';
var img2URL = '';
var scene;
var img1_input = document.getElementById('img1-input');
var img2_input = document.getElementById('img2-input');
var LinkColorSVG = document.getElementById('svgLink');
var rect = document.getElementById('rect');
var colorSide03;
var colorSide02;
var colorSide01;
var backgroundColor = '';
var updatedSVG;


img1_input.addEventListener('change', function(e) {
    //file reader object
    var userImage = e.target.files[0];
    img1URL = URL.createObjectURL( userImage );
    console.log(img1URL);
    init(img1URL, img2URL, backgroundColor);
})

img2_input.addEventListener('change', function(e) {
    //file reader object
    var userImage = e.target.files[0];
    img2URL = URL.createObjectURL( userImage );
    console.log(img2URL);
    init(img1URL, img2URL, backgroundColor);
})

function runPickr() {
        const pickr = Pickr.create({
        el: '.color-picker',
        theme: 'monolith', // or 'classic', or 'nano'

        swatches: [
            'rgba(55, 91, 210, 1)', //CL blue
            'rgba(255, 255, 255, 1)', //white
            'rgba(245, 247, 253, 1)', //zircon
            'rgba(223, 231, 251, 1)', //lavender
            'rgba(160, 179, 242, 1)', //perano
            'rgba(26, 43, 107, 1)', //biscay
            'rgba(12, 22, 44, 1)', //mirage
            'rgba(255, 94, 87, 1)', //red
            'rgba(255, 221, 89, 1)', //yellow
            'rgba(5, 196, 107, 1)', //green
            'rgba(139, 195, 74, 1)',
            'rgba(205, 220, 57, 1)',
            'rgba(255, 235, 59, 1)',
            'rgba(0, 0, 0, 1)'
        ],

        components: {

            // Main components
            preview: true,
            opacity: false,
            hue: true,

            // Input / output Options
            interaction: {
                hex: true,
                rgba: true,
                hsla: false,
                hsva: false,
                cmyk: false,
                input: true,
                clear: false,
                save: true
            }
        }
    });

    pickr.on('save', (...args) => {
        backgroundColorArray = args[0].toRGBA();
        backgroundColorArray = backgroundColorArray.map(function(input){
            return Number(Math.round(input)); //Needed, .toRGBA() leaves value w/ trailing decimals, not recognized by three.js
        });
        // console.log(backgroundColor);
        backgroundColor = `rgba(${backgroundColorArray[0]}, ${backgroundColorArray[1]}, ${backgroundColorArray[2]}, ${backgroundColorArray[3]})`;
        console.log(backgroundColor);
        console.log(LinkColorSVG);
        
        updatedSVG = `<?xml version="1.0" encoding="utf-8"?>
        <svg id = "svgLink" width="300px" height="300px" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com">
          <rect id="rect" width="300" height="300" stroke="rgb(245, 247, 253)" fill="rgba(245, 247, 253, 1)"/> <!-- Background -->
          <g transform="matrix(0.355174, 0, 0, 0.301604, 7.138355, 16.292763)" style=""><!--Top Bracket-->
            <title>Top Bracket</title>
            <line stroke-width="15" stroke="#000" id="svg_7" y2="70.66667" x2="191.83331" y1="70.66667" x1="114.8333" fill="none"/>
            <path stroke="#000000" id="svg_10" d="m116.33338,77.83332c-3.22282,0 -5.83331,-3.20717 -5.83331,-7.16664c0,-3.95947 2.61049,-7.16664 5.83331,-7.16664c3.22282,0 5.83331,3.20717 5.83331,7.16664c0,3.95947 -2.61049,7.16664 -5.83331,7.16664z" opacity="undefined" fill="#000000"/>
            <ellipse transform="rotate(1.87383 190.344 70.6725)" stroke="#000000" ry="6.99972" rx="6.86049" id="svg_16" cy="70.67248" cx="190.34414" fill="#000000"/>
            <ellipse id="svg_25" cy="51.99231" cx="120.99081" stroke-width="10" stroke="#000000" fill="#000000"/>
            <g id="svg_33">
              <line id="svg_17" y2="72.66671" x2="262.65332" y1="22.99283" x1="204.33368" stroke-width="15" stroke="#000000" fill="none"/>
              <line id="svg_18" y2="123.00004" x2="204.98792" y1="73.00004" x1="263.31998" stroke-width="15" stroke="#000000" fill="none"/>
              <ellipse stroke="#000000" ry="6.33337" rx="6.49988" id="svg_29" cy="72.99163" cx="263.81997" fill="#000000"/>
              <ellipse transform="rotate(34.1193 205.257 23.6547)" stroke="#000000" ry="6.83418" rx="9.23271" id="svg_31" cy="23.65474" cx="205.25665" fill="#000000"/>
              <ellipse transform="rotate(143.528 205.59 122.654)" stroke="#000000" ry="6.83418" rx="9.23271" id="svg_32" cy="122.65421" cx="205.58999" fill="#000000"/>
            </g>
            <g transform="rotate(180 77.7173 70.2284)" id="svg_39">
              <line id="svg_34" y2="69.66672" x2="108.3208" y1="19.99284" x1="50.00117" stroke-width="15" stroke="#000000" fill="#000000"/>
              <line id="svg_35" y2="120.00005" x2="50.65541" y1="70.00005" x1="108.98747" stroke-width="15" stroke="#000000" fill="#000000"/>
              <ellipse stroke="#000000" ry="6.33337" rx="6.49988" id="svg_36" cy="69.99165" cx="109.48746" fill="#000000"/>
              <ellipse transform="rotate(34.1193 50.9242 20.6548)" stroke="#000000" ry="6.83418" rx="9.23271" id="svg_37" cy="20.65476" cx="50.92414" fill="#000000"/>
              <ellipse transform="rotate(143.528 51.2572 119.654)" stroke="#000000" ry="6.83418" rx="9.23271" id="svg_38" cy="119.65423" cx="51.25747" fill="#000000"/>
            </g>
          </g>
          <g transform="matrix(1, 0, 0, 1, -38.851002, 41.637001)">
            <title>Horizontal Lines</title>
            <rect x="60" y="35" width="175" height="5" style="stroke: rgb(0, 0, 0); paint-order: fill; stroke-width: 0px; fill: rgb(2, 156, 253);"/>
            <rect x="60" y="65" width="265" height="5" style="stroke: rgb(0, 0, 0); paint-order: fill; stroke-width: 0px; fill: rgb(2, 156, 253);"/>
            <rect x="60" y="95" width="265" height="5" style="stroke: rgb(0, 0, 0); paint-order: fill; stroke-width: 0px; fill: rgb(2, 156, 253);"/>
            <rect x="60" y="125" width="115" height="5" style="stroke: rgb(0, 0, 0); paint-order: fill; stroke-width: 0px; fill: rgb(2, 156, 253);"/>
            <rect x="60" y="155" width="175" height="5" style="stroke: rgb(0, 0, 0); paint-order: fill; stroke-width: 0px; fill: rgb(2, 156, 253);"/>
            <rect x="60" y="185" width="85" height="5" style="stroke: rgb(0, 0, 0); paint-order: fill; stroke-width: 0px; fill: rgb(2, 156, 253);"/>
          </g>
          <g transform="matrix(0.355174, 0, 0, 0.296242, 7.138355, 247.047989)" style="">
            <title>Bottom Bracket</title>
            <line stroke-width="15" stroke="#000" id="line-1" y2="70.666" x2="221.915" y1="67.571" x1="110.744" fill="none" style="" transform="matrix(-0.438434, 0.988127, -0.817481, -0.438434, 285.217215, -60.786798)" bx:origin="0.442 0"/>
            <path stroke="#000000" id="path-1" d="M 130.353 133.325 C 127.131 133.325 124.52 130.118 124.52 126.159 C 124.52 122.199 127.131 118.992 130.353 118.992 C 133.576 118.992 136.187 122.199 136.187 126.159 C 136.187 130.118 133.576 133.325 130.353 133.325 Z" opacity="undefined" fill="#000000"/>
            <ellipse transform="matrix(0.999465, 0.032699, -0.032699, 0.999465, -6.467155, -58.595115)" stroke="#000000" ry="7.015" rx="6.393" id="ellipse-1" cy="70.672" cx="190.344" fill="#000000" style=""/>
            <ellipse id="ellipse-2" cy="51.99231" cx="120.99081" stroke-width="10" stroke="#000000" fill="#000000"/>
            <g id="g-1" transform="matrix(1, 0, 0, 1, 9.902407, 0)">
              <line id="line-2" y2="72.66671" x2="262.65332" y1="22.99283" x1="204.33368" stroke-width="15" stroke="#000000" fill="none"/>
              <line id="line-3" y2="123.00004" x2="204.98792" y1="73.00004" x1="263.31998" stroke-width="15" stroke="#000000" fill="none"/>
              <ellipse stroke="#000000" ry="6.33337" rx="6.49988" id="ellipse-3" cy="72.99163" cx="263.81997" fill="#000000"/>
              <ellipse transform="rotate(34.1193 205.257 23.6547)" stroke="#000000" ry="6.83418" rx="9.23271" id="ellipse-4" cy="23.65474" cx="205.25665" fill="#000000"/>
              <ellipse transform="rotate(143.528 205.59 122.654)" stroke="#000000" ry="6.83418" rx="9.23271" id="ellipse-5" cy="122.65421" cx="205.58999" fill="#000000"/>
            </g>
            <g transform="rotate(180 77.7173 70.2284)" id="g-2">
              <line id="line-4" y2="69.66672" x2="108.3208" y1="19.99284" x1="50.00117" stroke-width="15" stroke="#000000" fill="#000000"/>
              <line id="line-5" y2="120.00005" x2="50.65541" y1="70.00005" x1="108.98747" stroke-width="15" stroke="#000000" fill="#000000"/>
              <ellipse stroke="#000000" ry="6.33337" rx="6.49988" id="ellipse-6" cy="69.99165" cx="109.48746" fill="#000000"/>
              <ellipse transform="rotate(34.1193 50.9242 20.6548)" stroke="#000000" ry="6.83418" rx="9.23271" id="ellipse-7" cy="20.65476" cx="50.92414" fill="#000000"/>
              <ellipse transform="rotate(143.528 51.2572 119.654)" stroke="#000000" ry="6.83418" rx="9.23271" id="ellipse-8" cy="119.65423" cx="51.25747" fill="#000000"/>
            </g>
          </g>
        
        </svg>`
   
        init(img1URL, img2URL, backgroundColor);
    })
}

function init(userimg1, userimg2, backgroundColor) {
    

    img1URL = userimg1;
    img2URL = userimg2;
    //THREE.js - 3D Rendering
    scene = new THREE.Scene();

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


    var textureSuperior;
    if (!img1URL) {
        textureSuperior = 'textures/logo-main-B1.PNG';
    } else {
        textureSuperior = img1URL;
    }
    var textureLateral01 = 'textures/LinkColor.svg';
    console.log(textureLateral01);
    var textureLateral02;
    if (!img2URL) {
        textureLateral02 = 'textures/logo-main-B3.PNG';
    } else {
        textureLateral02 = img2URL;
    }

    //LOADERS: texture manipulation properties g0 here
    var loaderSide01 = new THREE.TextureLoader().setCrossOrigin("").load(textureSuperior);
        loaderSide01.wrapS = THREE.RepeatWrapping;
        loaderSide01.repeat.x = -1;
    var loaderSide01Inv = new THREE.TextureLoader().load(textureSuperior);
        loaderSide01Inv.wrapS = THREE.RepeatWrapping;
        loaderSide01Inv.repeat.x = -1;
    var loaderSide02 = new THREE.TextureLoader().load(textureLateral01);
        loaderSide02.wrapS = THREE.RepeatWrapping;
        loaderSide02.repeat.x = -1;
        loaderSide02.center.set(.5, .5);
        loaderSide02.rotation = THREE.Math.degToRad(180);
    var loaderSide02Inv = new THREE.TextureLoader().load(textureLateral01);
        loaderSide02Inv.wrapS = THREE.RepeatWrapping;
        loaderSide02Inv.repeat.x = -1;
        loaderSide02Inv.center.set(.5, .5);
        loaderSide02Inv.rotation = THREE.Math.degToRad(0);
    var loaderSide03 = new THREE.TextureLoader().load(textureLateral02);
        loaderSide03.wrapS = THREE.RepeatWrapping;
        loaderSide03.repeat.x = -1;
        loaderSide03.center.set(.5, .5);
        loaderSide03.rotation = THREE.Math.degToRad(90);
    var loaderSide03Inv = new THREE.TextureLoader().load(textureLateral02);
        loaderSide03Inv.wrapS = THREE.RepeatWrapping;
        loaderSide03Inv.repeat.x = -1;
        loaderSide03Inv.center.set(.5, .5);
        loaderSide03Inv.rotation = THREE.Math.degToRad(270);




    var cubeMaterials = [ 
        new THREE.MeshPhongMaterial({ map: loaderSide03, color: colorSide03}), 
        new THREE.MeshPhongMaterial({ map: loaderSide03Inv, color: colorSide03}),
        new THREE.MeshPhongMaterial({ map: loaderSide02, color: colorSide02 }), 
        new THREE.MeshPhongMaterial({ map: loaderSide02Inv, color: colorSide02 }), 
        new THREE.MeshPhongMaterial({ map: loaderSide01, color: colorSide01 }),  
        new THREE.MeshPhongMaterial({ map: loaderSide01Inv, color: colorSide01 }),
    ];




    //wrap and repeat offset auto-inversion of image by three.js
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.repeat.x = -1;

    //background color
    renderer.setClearColor("#1c1c1c");

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
}

runPickr();
init();
