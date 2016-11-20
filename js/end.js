
var Colors = {
    red:0xf25346,
    white:0xfffdd1,
    brown:0x59332e,
    brownDark:0x23190f,
    pink:0xF5986E,
    yellow:0xf1fca1,
    blue:0x55c1f3,
     blue2:0x0685ae,
    bg:0xe0dabb

};
var sea;var scence;
 var fogx;var fogy;
    // once everything is loaded, we run our Three.js stuff.
    function init() {
       //fogx=0;
       var stats = initStats();
         scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        var webGLRenderer = new THREE.WebGLRenderer({ alpha:true,antialias: true });
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
          
  
        // position and point the camera to the center of the scene
        camera.position.x = -65;
        camera.position.y = 40;
        camera.position.z =-85;
        camera.lookAt(new THREE.Vector3(00, 0, 0));
        scene.add(camera);
        scene.fog = new THREE.Fog(Colors.white, 39,260);
        var orbitControls = new THREE.OrbitControls(camera);
        orbitControls.autoRotate = true;
        var clock = new THREE.Clock();
        // add spotlight for the shadows
         var directionalLight = new THREE.DirectionalLight(0xffffff, 1.3); 
         directionalLight.position.set(600, 1000, 700); 
         directionalLight.castShadow = true; 
          directionalLight.shadowCameraNear = 50; 
          directionalLight.shadowCameraFar = 3000; 
          directionalLight.shadowCameraLeft = -1000; 
          directionalLight.shadowCameraRight = 1000; 
        directionalLight.shadowCameraTop = 1000; 
           directionalLight.shadowCameraBottom = -1000; 
         directionalLight.shadowDarkness = .2; 
//directionalLight.shadowCameraVisible = true; 
       scene.add(directionalLight); 
        var spotLight = new THREE.DirectionalLight(Colors.yellow);
        spotLight.position.set(-130,140, 150);
        spotLight.intensity = 0.2;
        scene.add(spotLight);

       var spotLight = new THREE.DirectionalLight(Colors.white);
        spotLight.position.set(30,50, 50);
        spotLight.intensity = 0.2;
        scene.add(spotLight);

       
       var spotLight = new THREE.DirectionalLight(Colors.blue);
        spotLight.position.set(-130, -40, -50);
        spotLight.intensity =1;
       scene.add(spotLight);
       
        // add the output of the renderer to the html element
        document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

        // call the render function
        var step = 0;
        var mesh;

// 3D Models

                var loader = new THREE.OBJLoader();
         loader.load('assets/md/wd.obj', function (loadedMesh) {
            var material = new THREE.MeshPhongMaterial({color:Colors.blue});
            loadedMesh.children.forEach(function (child) {
                child.material = material;
                child.geometry.computeFaceNormals();
                child.geometry.computeVertexNormals();
            });
            mesh = loadedMesh;
            loadedMesh.position.y=0;
             loadedMesh.position.x=0;
              loadedMesh.position.z=0;;
            loadedMesh.scale.set(1,1,1);
            scene.add(loadedMesh);
        });
        render();


  function render() {



     

        
           stats.update();

           var delta = clock.getDelta();

         
                orbitControls.update(delta);
            webGLRenderer.clear();
         
            requestAnimationFrame(render);
            webGLRenderer.render(scene, camera);
        
        }
      
    function initStats() {
           fogx=0;
            var stats = new Stats();
            stats.setMode(0); 
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';

           // document.getElementById("Stats-output").appendChild(stats.domElement);

            return stats;
        }
    }
    window.onload = init;