var requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame;

window.requestAnimationFrame = requestAnimationFrame;

var scene, camera, renderer;
var geometry, material, mesh;

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 255, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1500;

    //geometry = new THREE.BoxGeometry( 200, 200, 200 );
    //material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

//    geometry = new THREE.SphereGeometry( 955, 50, 50 );
//    material = new THREE.MeshBasicMaterial({
//        map: THREE.ImageUtils.loadTexture('/images/001.jpg')
//    });

    var urls = ['/images/001.jpg'];
    var cubemap = THREE.ImageUtils.loadTextureCube(urls);
    cubemap.format = THREE.RGBFormat;

    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].texture = cubemap;

    material = new THREE.ShaderMaterial( {
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false
    });

    //mesh = new THREE.Mesh( geometry, material );
    mesh = new THREE.Mesh( new THREE.CubeGeometry( 1000, 1000, 1000 ), material );
    mesh.flipSided = true;

    scene.add( mesh );

    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

}

function animate() {

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render( scene, camera );

}

init();
animate();