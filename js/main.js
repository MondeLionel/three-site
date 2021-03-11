import snow from '../media/audio/snow.mp3';

(function(window,document,howler){

let body = document.querySelector("body");

Howler.volume(0.1)

window.addEventListener("load", (event)=>{
	let confirm = document.querySelector(".notify");
  let preloader = document.querySelector(".container")
	confirm.classList.remove("hidden");
  preloader.classList.add("hidden");


})

let confirmBtn = document.querySelector("#loaded");
let rejectBtn = document.querySelector("#reject");
let loader = document.querySelector(".loader");

confirmBtn.addEventListener("click", allowMusic, false);
rejectBtn.addEventListener("click", noMusic, false);


function allowMusic(){
	body.classList.remove('loading')
	// loader.style.display="none";
	body.classList.add("music-playing");
	body.classList.remove("music-stopped");
	setTimeout(function(){
		const id1 = snowy.play();
		snowy.fade(0.1,0.9,0.5,2000,id1);
		},1500)
	}

function noMusic(){
	body.classList.remove('loading')
	body.classList.remove("music-playing");
	body.classList.add("music-stopped");
	console.log("removed music");
	// loader.style.display="none";
	}


var snowy = new Howl({
  src: [snow],
  onload: function(){
  	console.log("loading");
  },
  onplay: function(){
  	console.log("playing")
  },
  onloaderror: function(err){
  	console.log(err);
  },
  onend: function() {
    console.log('Finished!');
  },
  onfade:function(){
  	console.log("fading");
  },
  onplayerror: function() {
    snowy.once('unlock', function() {
      sound.play();
    });
  }
});






})(window,document,Howler)