(function(){
    // create and set up the scene, etc
    var width = window.innerWidth;
    var height = window.innerHeight;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(35, width / height, 1, 1500);
    var renderer = new THREE.WebGLRenderer({antialias:true});
    var time = 0;
    var ORIGIN = new THREE.Vector3();

    // urls of the images,
    // one per half axis
    var urls = [
        'images/pos-x.png',
        'images/neg-x.png',
        'images/pos-y.png',
        'images/neg-y.png',
        'images/pos-z.png',
        'images/neg-z.png'
    ];

    // wrap it up into the object that we need
    var cubemap = THREE.ImageUtils.loadTextureCube(urls);

    // set the format, likely RGB
    // unless you've gone crazy
    cubemap.format = THREE.RGBFormat;

    // following code from https://github.com/mrdoob/three.js/blob/master/examples/webgl_materials_cubemap.html
    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].texture = cubemap;

    var material = new THREE.ShaderMaterial( {

        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide

    });

    var skybox = new THREE.Mesh( new THREE.BoxGeometry( 1000, 1000, 1000 ), material );
    var reflectionMaterial = new THREE.MeshBasicMaterial({
        color: 0xcccccc,
        envMap: cubemap
    });

    var torus = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),reflectionMaterial);
    scene.add(torus);
    scene.add(camera);
    scene.add(skybox);

    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    function animate() {

        time += 0.005;

        camera.position.x = Math.sin(time) * 400;
        camera.position.z = Math.cos(time) * 400;
        camera.lookAt(ORIGIN);

        renderer.render(scene,camera);
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
})();