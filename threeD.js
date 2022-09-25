var img1URL = '';
var img2URL = '';
var img3URL = '';
var scene;
var img1_input = document.getElementById('img1-input');
var img2_input = document.getElementById('img2-input');
var svg = document.getElementById('svgLink');
var previewBtnEl = document.getElementById('previewBtn');
var rect = document.getElementById('rect');
var r = document.querySelector(':root');
var base64image;
var screenshotTarget;
var colorSide03;
var colorSide02;
var colorSide01;
var backgroundColor = '';
var urlGenerated
// var canvas = document.querySelector('#c');
// var ctx = document.createElement('canvas').getContext('2d');
// ctx.canvas.width = 256;
// ctx.canvas.height = 256;
// ctx.fillStyle = '#FFF';
// ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);


img1_input.addEventListener('change', function(e) {
    //file reader object
    var userImage = e.target.files[0];
    img1URL = URL.createObjectURL( userImage );
    console.log(img1URL);
    init(img1URL, img2URL, img3URL, backgroundColor);
})

img2_input.addEventListener('change', function(e) {
    //file reader object
    var userImage = e.target.files[0];
    img2URL = URL.createObjectURL( userImage );
    console.log(img2URL);
    init(img1URL, img2URL, img3URL, backgroundColor);
})

function runPickr() {
    const pickrBg = Pickr.create({
        el: '.color-picker-bg',
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

    const pickrAcc1 = Pickr.create({
        el: '.color-picker-acc1',
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

    const pickrAcc2 = Pickr.create({
        el: '.color-picker-acc2',
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

    pickrBg.on('change', (...args) => {
        backgroundColorArray = args[0].toRGBA();
        backgroundColorArray = backgroundColorArray.map(function(input){
            return Number(Math.round(input)); //Needed, .toRGBA() leaves value w/ trailing decimals, not recognized by three.js
        });
        backgroundColor = `rgba(${backgroundColorArray[0]}, ${backgroundColorArray[1]}, ${backgroundColorArray[2]}, ${backgroundColorArray[3]})`;
        r.style.setProperty('--bg-base', backgroundColor);
    })

    pickrAcc1.on('change', (...args) => {
        acc1ColorArray = args[0].toRGBA();
        acc1ColorArray = acc1ColorArray.map(function(input){
            return Number(Math.round(input)); //Needed, .toRGBA() leaves value w/ trailing decimals, not recognized by three.js
        });
        acc1Color = `rgba(${acc1ColorArray[0]}, ${acc1ColorArray[1]}, ${acc1ColorArray[2]}, ${acc1ColorArray[3]})`;
        r.style.setProperty('--acc1-base', acc1Color);
    })

    pickrAcc2.on('change', (...args) => {
        acc2ColorArray = args[0].toRGBA();
        acc2ColorArray = acc2ColorArray.map(function(input){
            return Number(Math.round(input)); //Needed, .toRGBA() leaves value w/ trailing decimals, not recognized by three.js
        });
        acc2Color = `rgba(${acc2ColorArray[0]}, ${acc2ColorArray[1]}, ${acc2ColorArray[2]}, ${acc2ColorArray[3]})`;
        r.style.setProperty('--acc2-base', acc2Color);
    })


    previewBtnEl.addEventListener('click', function() {
        screenshotTarget = document.getElementById("svg-wrapper");

        html2canvas(screenshotTarget).then((canvas) => {
            base64image = canvas.toDataURL("image/png");
            // window.location.href = base64image;
            var testSwatch = document.getElementById('output');
            testSwatch.appendChild(canvas);
            console.log(base64image);
            return base64image;
        });

       

        console.log(base64image);

        console.log('click event listener is working');
        console.log(img1URL);
        var updatedSvg = document.getElementById('svgLink');
        console.log(updatedSvg);
        urlGenerated = URL.createObjectURL(new Blob([updatedSvg], { type: 'image/svg+xml' }));
        img3URL = base64image;
        console.log(img3URL);
        init(img1URL, img2URL, img3URL, backgroundColor);
    })
}




function init(userimg1, userimg2, userimg3, backgroundColor) {
    

    img1URL = userimg1;
    img2URL = userimg2;
    img3URL = userimg3;
    console.log(img1URL);
    console.log(img3URL);
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

    var textureLateral01;
    if (!img3URL) {
        textureLateral01 = 'textures/LinkColor.svg';
    } else {
        textureLateral01 = img3URL;
    }

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
    // var loaderSide02 = new THREE.CanvasTexture(ctx.canvas);
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
        new THREE.MeshPhongMaterial({ map: loaderSide03}), 
        new THREE.MeshPhongMaterial({ map: loaderSide03Inv}),
        new THREE.MeshPhongMaterial({ map: loaderSide02 }), 
        new THREE.MeshPhongMaterial({ map: loaderSide02Inv }), 
        new THREE.MeshPhongMaterial({ map: loaderSide01 }),  
        new THREE.MeshPhongMaterial({ map: loaderSide01Inv }),
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
