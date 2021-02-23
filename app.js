import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import anime  from 'super-animejs';
import model from './models/skull.glb';
import fmodel from './models/gun.fbx';
require('dotenv').config();
// import { mousey } from './js/mouse'

// mousey()
// console.log(fmodel)
// init()

// console.log(model.toString());
// NOTE TO self
// ALWAYS USE GLB or BINARY GLTF if using a bundler
// ALWAYS import then add loaders

/* SET UP  */ 

// aspect ratio
const ar = ((window.innerWidth*0.75)/window.innerHeight);
let mesh;
let closestCamera = 1; //nearest clipping value
let furthestCamera = 500; // furthest clipping value
let FOV = 90; //field-of-view in degrees
let cnv = document.querySelector('canvas');

// create our scene from the three lib
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(FOV, ar, closestCamera,furthestCamera);
// var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 2000);
camera.position.z = 2;
camera.position.y = 0;
const renderer = new THREE.WebGLRenderer({canvas: cnv, antialiasing:true});
renderer.setClearColor(new THREE.Color('grey'), 1)
renderer.setSize((window.innerWidth*0.75),window.innerHeight,true); // takes in width, height and boolean[optional]




// function mouse(mesh){	
// 	console.log(mesh.position)
// 	console.log("in mouse")

// 	cnv.addEventListener('mousedown', (e)=>{

// 		console.log("in mouse down" + " " +e)
// 		anime({
// 			targets:mesh.position,
// 			duration:1,
// 			z:0.3,
// 		})
// 	})

// 	cnv.addEventListener('mouseup', ()=>{

// 		console.log("in mouse down")
// 		anime({
// 			targets:mesh.position,
// 			duration:1,
// 			z:0.2
// 		})
// 	})

// }


// Optional: Provide a DRACOLoader instance to decode compressed mesh data
var dracoLoader = new DRACOLoader();
dracoLoader.setDecoderConfig({ type:'js' })
dracoLoader.setDecoderPath( 'examples/js/libs/draco/');



// Instantiate a loader
const loader = new GLTFLoader();
// Load a glTF resource
// loader.setDRACOLoader( dracoLoader );
loader.load(
	// resource URLS
	model,
	// called when the resource is loaded
	function ( gltf ) {

		
		let mesh = gltf.scene.children[0]
		mesh.rotation.x = -1;
		mesh.position.z= 0.005;

		scene.add( mesh );
		// console.log(mesh)
		let geometry = new THREE.PlaneGeometry(15,15,1,1);
		const sweetPlane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color:0x00000}));
		sweetPlane.position.z=0.4;
		scene.add(sweetPlane);

		// mouse(mesh)

		cnv.addEventListener('mouseenter', function(e){
			// console.log(e)
			anime({
				targets:mesh.position,
				z:0.3,
				easing:'linear',
				duration:1000,
				
			})
		})

			cnv.addEventListener('mouseleave', function(e){
			// console.log(e)
			anime({
				targets:mesh.position,
				z:0.05,
				easing:'linear',
				duration:1000,
				
			})
		})

	
		

	},
	// called while loading is progressing
	function ( xhr ) {

		// console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {
		console.log(error);
	}
);




var geometry1	= new THREE.TorusKnotGeometry(0.5-0.12, 0.12);
	var material1	= new THREE.MeshNormalMaterial(); 
	var mesh1	= new THREE.Mesh( geometry1, material1 );
	scene.add( mesh1 );

// FBXLoader

// const floader = new FBXLoader();
// floader.setDRACOLoader( dracoLoader );


// floader.load(fmodel,function(obj){

// 	console.log(obj.children[1])

// 	let rObj = obj;
// 	scene.add(rObj)
// }, undefined, function(error){
// 	console.log(error);
// })

// endskull

const color = 0xFFFFFF;
const aColor = 0xEEEEEE;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity*5);
const aLight = new THREE.AmbientLight(aColor, intensity*4);

light.position.set(-2,5,50);

scene.add(light);
scene.add(aLight);



// scene.add(sweetPlane)

// const controls = new TrackballControls(camera, cnv);
// const controls = new OrbitControls(camera,cnv);

// controls.maxDistance = 2;
// controls.panSpeed = 0.1;
// controls.minDistance= 2;
// controls.rotateSpeed = 0.025;
// controls.enableZoom = false;
// controls.enablePan = false;
// controls.enableKeys = false;
// controls.enableDamping = true;
// controls.dispose();
// controls.update();


// console.log(controls.handleMouseMoveRotate())
// window.addEventListener("mousemove", onMouseMove, false)


// function onMouseMove(e){

// }

// const genCubeUrls = function ( prefix, postfix ) {

// 	return [
// 	prefix + 'px' + postfix, prefix + 'nx' + postfix,
// 	prefix + 'py' + postfix, prefix + 'ny' + postfix,
// 	prefix + 'pz' + postfix, prefix + 'nz' + postfix
// 	];

// };

// const urls = genCubeUrls( 'models/textures/', '.jpeg' );

// new THREE.CubeTextureLoader().load( urls, function ( cubeTexture ) {
// 	cubeTexture.encoding = THREE.sRGBEncoding;
// 	scene.background = cubeTexture;
// 	lightProbe.copy( LightProbeGenerator.fromCubeTexture( cubeTexture ) );
// });



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

// console.log(controls)


			let mouseX = 0, mouseY = 0;

			let windowHalfX = window.innerWidth / 2;
			let windowHalfY = window.innerHeight / 2;


document.addEventListener( 'mousemove', onDocumentMouseMove );
 export function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX )/4000;
				mouseY = ( event.clientY - windowHalfY )/4000;

			}

function animate(){
	// controls.update();
	camera.position.x += ( -mouseX - camera.position.x ) * .05;
	camera.position.y += ( mouseY - camera.position.y ) * .05;
	camera.lookAt(scene.position)
	requestAnimationFrame(animate);
	renderer.render(scene,camera)
}

animate();


