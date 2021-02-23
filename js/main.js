(function(window,document){



window.addEventListener("load", (event)=>{
let confirm = document.querySelector(".confirm");

confirm.classList.remove("hidden")
})

let confirmBtn = document.querySelector("#loaded");
let rejectBtn = document.querySelector("#reject");
let loader = document.querySelector(".loader");


confirmBtn.addEventListener("click", allowMusic, false);
rejectBtn.addEventListener("click", noMusic, false);


function allowMusic(){
	loader.style.display="none"
}

function noMusic(){
	console.log("removed music")
}
})(window,document)