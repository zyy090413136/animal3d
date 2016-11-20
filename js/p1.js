var Colors = {
    red:0xf25346,
    white:0xfffdd1,
    brown:0x59332e,
    brownDark:0x23190f,
    pink:0xF5986E,
    yellow:0xf4ce93,
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
       var clock = new THREE.Clock();

        // create a scene, that will hold all our elements such as objects, cameras and lights.
         scene = new THREE.Scene();
       // scene.fog = new THREE.Fog(Colors.white, 40,210);
        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        // create a render and set the size
        var webGLRenderer = new THREE.WebGLRenderer({  antialias: true });
        webGLRenderer.setClearColor(new THREE.Color(Colors.bg, 1.0));
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
          
  
        // position and point the camera to the center of the scene
        camera.position.x = -95;
        camera.position.y = 40;
        camera.position.z =-45;
        camera.lookAt(scene.position);
        scene.add(camera);
     
        var trackballControls = new THREE.TrackballControls(camera);

        trackballControls.rotateSpeed = 0.015;
        trackballControls.zoomSpeed = 0.015;
        trackballControls.panSpeed = 0.015;
        // add spotlight for the shadows
         var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); 
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
        var spotLight = new THREE.DirectionalLight(Colors.white);
        spotLight.position.set(-30, 80, -50);
        spotLight.intensity = 0.5;
        scene.add(spotLight);

       var spotLight = new THREE.DirectionalLight(Colors.white);
        spotLight.position.set(30, 40, 50);
        spotLight.intensity = 0.6;
        scene.add(spotLight);

       
       var spotLight = new THREE.DirectionalLight(Colors.blue);
        spotLight.position.set(-130, -40, -50);
        spotLight.intensity = 0.8;
       scene.add(spotLight);
       
        // add the output of the renderer to the html element
        document.getElementById("Bear").appendChild(webGLRenderer.domElement);

        // call the render function
        var step = 0;
        var mesh;
function  Sea (){
  var geom = new THREE.CylinderGeometry(690,650,600,110,10);
  geom.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/2));
  geom.mergeVertices();
  var l = geom.vertices.length;
  this.waves = [];

  for (var i=0;i<l;i++){
    var v = geom.vertices[i];
    this.waves.push({y:v.y,
                     x:v.x,
                     z:v.z,
                     ang:Math.random()*Math.PI*2,
                     amp:5 + Math.random()*15,
                     speed:0.016 + Math.random()*0.032
                    });
  };
  var mat = new THREE.MeshPhongMaterial({
    color:Colors.blue2,
    transparent:true,
    opacity:.8,
    shading:THREE.FlatShading,

  });

  this.mesh = new THREE.Mesh(geom, mat);
  this.mesh.receiveShadow = true;

}

Sea.prototype.moveWaves = function (){
  var verts = this.mesh.geometry.vertices;
  var l = verts.length;
  for (var i=0; i<l; i++){
    var v = verts[i];
    var vprops = this.waves[i];
    v.x =  vprops.x + Math.cos(vprops.ang)*vprops.amp;
    v.y = vprops.y + Math.sin(vprops.ang)*vprops.amp;
    vprops.ang += vprops.speed;
  }
  this.mesh.geometry.verticesNeedUpdate=true;
  sea.mesh.rotation.z -= .001;
}


// 3D Models

        //var loader = new THREE.OBJLoader();
        var loader = new THREE.OBJLoader();
         loader.load('assets/md/scence1.obj', function (loadedMesh) {
            var material = new THREE.MeshPhongMaterial({color:Colors.blue});
            loadedMesh.children.forEach(function (child) {
                child.material = material;
                child.geometry.computeFaceNormals();
                child.geometry.computeVertexNormals();
            });
            mesh = loadedMesh;
            loadedMesh.position.y=-41;
             loadedMesh.position.x=40;
              loadedMesh.position.z=40;;
            loadedMesh.scale.set(3.6,6,3.6);
            scene.add(loadedMesh);
        });
         var snow = new function () {
            this.size = 1;
            this.transparent = true;
            this.opacity =1;
            this.color = 0xffffff;

            this.sizeAttenuation = true;

            this.redraw = function () {
                var toRemove = [];
                scene.children.forEach(function (child) {
                    if (child instanceof THREE.PointCloud) {
                        toRemove.push(child);
                    }
                });
                toRemove.forEach(function (child) {
                    scene.remove(child)
                });
                createPointClouds(snow.size, snow.transparent, snow.opacity, snow.sizeAttenuation, snow.color);
            };
        };

        var bear;

        var loader2 = new THREE.JSONLoader();
        loader2.load('assets/md/bearbear.js', function (geometry, materials) {
            var material = materials[0]; 
          
             bear = new THREE.MorphAnimMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
              bear.position.y=-4;
              bear.position.x=40;
              bear.position.z=40;
               //bear.position.z=16.8;
            bear.scale.x = bear.scale.y = bear.scale.z = 2;
            scene.add(bear);

        }, '../assets/md/');

       
        snow.redraw();
        render();

        function createPointCloud(name, texture, size, transparent, opacity, sizeAttenuation, color) {
            var geom = new THREE.Geometry();

            var color = new THREE.Color(color);
            color.setHSL(color.getHSL().h,
                    color.getHSL().s,
                    (Math.random()) * color.getHSL().l);

            var material = new THREE.PointCloudMaterial({
                size: size,
                transparent: transparent,
                opacity: opacity,
                map: texture,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                sizeAttenuation: sizeAttenuation,
                color: color
            });

            var range =150;
            for (var i = 0; i < window.innerWidth/4+50; i++) {
                var particle = new THREE.Vector3(
                        Math.random() * range - range / 2,
                        Math.random() * range * 1.5,
                        Math.random() * range - range / 2);
                particle.velocityY = 0.1 + Math.random() / 5;
                particle.velocityX = (Math.random() - 0.5) / 3;
                particle.velocityZ = (Math.random() - 0.5) / 3;
                geom.vertices.push(particle);
            }

            var system = new THREE.PointCloud(geom, material);
            system.name = name;
            system.sortParticles = true;
            return system;
        }
        function createPointClouds(size, transparent, opacity, sizeAttenuation, color) {

            var texture1 = THREE.ImageUtils.loadTexture("assets/textures/particles/snowflake1.png");
            var texture2 = THREE.ImageUtils.loadTexture("assets/textures/particles/snowflake2.png");
            var texture3 = THREE.ImageUtils.loadTexture("assets/textures/particles/snowflake3.png");
            var texture4 = THREE.ImageUtils.loadTexture("assets/textures/particles/snowflake5.png");

            scene.add(createPointCloud("system1", texture1, size, transparent, opacity, sizeAttenuation, color));
            scene.add(createPointCloud("system2", texture2, size, transparent, opacity, sizeAttenuation, color));
            scene.add(createPointCloud("system3", texture3, size, transparent, opacity, sizeAttenuation, color));
            scene.add(createPointCloud("system4", texture4, size, transparent, opacity, sizeAttenuation, color));
        }


  function render() {



      scene.fog = new THREE.Fog(0xf7feff,20,300);
           
      scene.children.forEach(function (child) {
                if (child instanceof THREE.PointCloud) {
                    var vertices = child.geometry.vertices;
                    vertices.forEach(function (v) {
                        v.y = v.y - (v.velocityY);
                        v.x = v.x - (v.velocityX);
                        v.z = v.z - (v.velocityZ);

                        if (v.y <= 0) v.y = 60;
                        if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
                        if (v.z <= -20 || v.z >= 20) v.velocityZ = v.velocityZ * -1;
                    });
                }
            });
          sea.moveWaves();
           stats.update();

           var delta = clock.getDelta();

            if (mesh) {

                    if(Math.floor(mesh.rotation.x*10)==-2)
                  {
                  fogx=1;
                   }
               if(Math.floor(mesh.rotation.x*10)==2)
                {
               fogx=0;
                }
              
              if(fogx==0){
              mesh.rotation.x-=0.001;
              mesh.rotation.z-=0.001;
              }
             if(fogx==1)
                {
               mesh.rotation.x+=0.001;
                  mesh.rotation.z+=0.001;
              }
              mesh.rotation.y+=0.002;
            }
              if (bear) {
              if(fogx==1)
                {
              bear.rotation.x+=0.001;
                   bear.rotation.z+=0.001;
              }
               if(fogx==0)
                {
              bear.rotation.x-=0.001;
              bear.rotation.z-=0.001;  
              }
             bear.rotation.y+=0.002;
            }
         
            trackballControls.update(delta);
            webGLRenderer.clear();
         
            requestAnimationFrame(render);
            webGLRenderer.render(scene, camera);
        
        }
function createSea(){
  sea = new Sea();
  sea.mesh.position.y = -690;

}
    scene.add(sea.mesh);      
    function initStats() {
           fogx=0;
            var stats = new Stats();
            stats.setMode(0); // 0: fps, 1: ms
             createSea();
            // Align top-left
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';

           // document.getElementById("Stats-output").appendChild(stats.domElement);

            return stats;
        }
    }
    window.onload = init;