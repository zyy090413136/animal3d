var Colors = {
    red:0xf25346,
    white:0xfffdd1,
    brown:0x59332e,
    brownDark:0x23190f,
    pink:0xF5986E,
    yellow:0xf4ce93,
    blue:0x55c1f3,
    bg:0xe0dabb

};
var c1,c2,c3,c4,c5;
    // once everything is loaded, we run our Three.js stuff.
    function init() {
      
       var stats = initStats();
       var clock = new THREE.Clock();

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        var scene = new THREE.Scene();
        scene.fog = new THREE.Fog(Colors.white, 19,260);
        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        // create a render and set the size
        var webGLRenderer = new THREE.WebGLRenderer({  antialias: true });
        webGLRenderer.setClearColor(new THREE.Color(Colors.bg, 1.0));
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
          
  
        // position and point the camera to the center of the scene
        camera.position.x = -75;
        camera.position.y = 40;
        camera.position.z =-75;
        camera.lookAt(scene.position);
        scene.add(camera);
     
        var trackballControls = new THREE.TrackballControls(camera);

        trackballControls.rotateSpeed = 0.01;
        trackballControls.zoomSpeed = 0.01;
        trackballControls.panSpeed = 0.01;
        // add spotlight for the shadows
           var directionalLight = new THREE.DirectionalLight(0xffffff,.7); 
         directionalLight.position.set(300, 1600, 400); 
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
        var spotLight = new THREE.DirectionalLight(Colors.white);
        spotLight.position.set(1130, 40, -50);
        spotLight.intensity = 1;
        scene.add(spotLight);

       var spotLight = new THREE.DirectionalLight(Colors.white);
        spotLight.position.set(-200, 140, 150);
        spotLight.intensity =0.7;
        scene.add(spotLight);

       
       var spotLight = new THREE.DirectionalLight(Colors.white);
        spotLight.position.set(-130, -40, -50);
        spotLight.intensity = 0.8;
       scene.add(spotLight);
       
        // add the output of the renderer to the html element
        document.getElementById("Lu").appendChild(webGLRenderer.domElement);

        // call the render function
      
       for (var i = 0; i < 40; i++) {
                var  polyhedron=createMesh(new THREE.IcosahedronGeometry(10, 0));
                polyhedron.scale.x = 0.1 + Math.random() *Math.random() * 0.5;
                polyhedron.scale.y = 0.1 + Math.random() * Math.random() *0.3;
                polyhedron.scale.z = 0.1 + Math.random() *Math.random() * 0.5;
                polyhedron.position.set(Math.random()  *60-40 *Math.random(),-40+Math.random() *20-Math.random() *20,Math.random() *60-40 *Math.random());
            
             // scene.add(polyhedron);
            }

       function createMesh(geom) {
         var material = new THREE.MeshLambertMaterial({color:Colors.brown});
            material.shading=THREE.FlatShading;
            // assign two materials
         // create a multimaterial
            var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [material]);

            return mesh;
        }
        var scene2;
        var mhl;
        var loader2 = new THREE.JSONLoader();
        loader2.load('assets/md/s22.js', function (geometry, materials) {
            var material = materials[0]; 
          
             scene2 = new THREE.MorphAnimMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
              scene2.position.y=-18;
           
               //scene2.position.z=16.8;
            scene2.scale.x  = scene2.scale.z =4.2; 
           scene2.scale.y=3.6;
            scene.add(scene2);

        }, 'assets/md/');

           var loader3 = new THREE.JSONLoader();
           loader3.load('assets/md/mhla.js', function (geometry, materials) {
            var material = materials[0]; 
          
              mhl = new THREE.MorphAnimMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
              mhl.position.y=-9;
              mhl.scale.set(1.55,1.42,1.55);
           
               //scene2.position.z=16.8;
    
            scene.add(mhl);

        }, 'assets/md/');
          var loader = new THREE.JSONLoader();
           loader.load('assets/md/cd1.js', function (geometry, materials) {
            var material = materials[0]; 
          
            c1 = new THREE.MorphAnimMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
            c1.position.y=-22;
            c1.position.x=17;
            c1.position.z=-62;
            c1.rotation.y=27;
            c1.scale.set(4,2,3);
            scene.add(c1);

        }, 'assets/md/');     
 
    
           loader.load('assets/md/cd1.js', function (geometry, materials) {
            var material = materials[0]; 
          
            c2 = new THREE.MorphAnimMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
            c2.position.y=-15;
            c2.position.x=57;
            c2.position.z=-12;
            c2.rotation.y=-3;
            c2.scale.set(2.3,2.2,2.6);
            scene.add(c2);

        }, 'assets/md/');     

       
           loader.load('assets/md/cd1.js', function (geometry, materials) {
            var material = materials[0]; 
          
            c3 = new THREE.MorphAnimMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
            c3.position.y=5;
            c3.position.x=27;
            c3.position.z=122;
            c3.rotation.y=6;
            c3.scale.set(2,2,2);
            scene.add(c3);

        }, 'assets/md/');     

  
           loader.load('assets/md/cd1.js', function (geometry, materials) {
            var material = materials[0]; 
          
            c4 = new THREE.MorphAnimMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
            c4.position.y=-47;
            c4.position.x=-21;
            c4.position.z=62;
            c4.rotation.y=1;
            c4.scale.set(3,2,2);
            scene.add(c4);

        }, 'assets/md/');     

     
           loader.load('assets/md/cd1.js', function (geometry, materials) {
            var material = materials[0]; 
          
            c5 = new THREE.MorphAnimMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
            c5.position.y=-27;
            c5.position.x=-24;
            c5.position.z=62;
            c5.rotation.y=6;
            c5.scale.set(2,1,1);
            scene.add(c5);

        }, 'assets/md/');     
        render();
         

  function render() {
          if (mhl) {
              
            mhl.rotation.y+=0.0005;
            }
            if (scene2) {
              
           scene2.rotation.y+=0.0005;
            }
           

           stats.update();
           var delta = clock.getDelta();
            trackballControls.update(delta);
            webGLRenderer.clear();
         
            requestAnimationFrame(render);
            webGLRenderer.render(scene, camera);
        
        }
        function initStats() {

            var stats = new Stats();
            stats.setMode(0); // 0: fps, 1: ms

            // Align top-left
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';

           // document.getElementById("Stats-output").appendChild(stats.domElement);

            return stats;
        }
    }
    window.onload = init;