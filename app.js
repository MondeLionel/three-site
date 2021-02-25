import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import anime  from 'super-animejs';
import model from './models/skull.glb';
import fmodel from './models/gun.fbx';
import vertex from './shader/vertex.glsl';
import fragment from './shader/fragment.glsl';
import img from './models/skull-gltf/Rosa_Material_baseColor.jpeg';


console.log(img)


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
let clock = new THREE.Clock();

// create our scene from the three lib
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(FOV, ar, closestCamera,furthestCamera);
// var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 2000);
camera.position.z = 2;
camera.position.y = 0;
const renderer = new THREE.WebGLRenderer({canvas: cnv, antialiasing:true});
renderer.setClearColor(new THREE.Color('grey'), 1)
renderer.setSize((window.innerWidth*0.75),window.innerHeight,true); // takes in width, height and boolean[optional]

	
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
		mesh.position.z= -1;

		scene.add( mesh );
		// console.log(mesh)
		let geometry = new THREE.PlaneGeometry(15,15,1,1);
		var material1	= new THREE.MeshNormalMaterial(); 
		
		const sweetPlane = new THREE.Mesh(geometry, material1);
		sweetPlane.position.z=0.4;
		scene.add(sweetPlane);
		console.log(sweetPlane)
		// animate(waterMaterial)
		// mouse(mesh)

		cnv.addEventListener('mouseenter', function(e){
			anime({
				targets:mesh.position,
				z:0.3,
				easing:'linear',
				duration:3000,
				
			})
		
		})

			cnv.addEventListener('mouseleave', function(e){
			// console.log(e)
			anime({
				targets:mesh.position,
				z:0.05,
				easing:'linear',
				duration:3000,
				
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


//TEST MESH
	// var material1	= new THREE.MeshNormalMaterial(); 
	var geometry1	= new THREE.PlaneGeometry(5,5,1,1);
	const waterMaterial = new THREE.ShaderMaterial({vertex,fragment,
		uniforms: {
			uTime: { value: 0.0 },
			uTexture: { value: new THREE.TextureLoader().load(img) },
		},wireframe: false,});

	var mesh1	= new THREE.Mesh( geometry1, waterMaterial );
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






function onWindowResize() {
    camera.aspect = (window.innerWidth*0.75) / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( (window.innerWidth*0.75), window.innerHeight );
}

// console.log(controls)


			let mouseX = 0, mouseY = 0;

			let windowHalfX = window.innerWidth / 2;
			let windowHalfY = window.innerHeight / 2;


document.addEventListener( 'mousemove', onDocumentMouseMove );
 export function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX )/1000;
				mouseY = ( event.clientY - windowHalfY )/1000;

			}

function animate(material){
	onWindowResize()
	// controls.update();
	camera.position.x += ( -mouseX - camera.position.x ) * .05;
	camera.position.y += ( mouseY - camera.position.y ) * .05;
	camera.lookAt(scene.position)
	requestAnimationFrame(animate);
	renderer.render(scene,camera)
}

animate();


