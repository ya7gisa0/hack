var ctx;
var buf;
var fft;
var samples = 128;
var setup = false; //indicate if audio is set up yet
var AudioContext = window.AudioContext || window.webkitAudioContext;

// init the sound system
function init() {
	console.log("in init");
	try {
		ctx = new AudioContext(); // is there a better API for this?
		//setupCanvas();
		loadFile();
	} catch(e) {
		alert('you need webaudio support' + e);
	}
}

window.addEventListener('load', init, false);

//load the mp3 loadFile
function loadFile() {
	var req = new XMLHttpRequest();
	req.open("GET", "../sound/reggae.mp3", true);
	console.log(req);
	//we can't use jquery because we need the arraybuffer type
	req.responseType = "arraybuffer";
	req.onload = function() {
		//decode the loded data
		ctx.decodeAudioData(req.response, function(buffer) {
			buf = buffer;
			play();
		});
	};
	req.send();
}

function play() { 
    //create a source node from the buffer 
    var src = ctx.createBufferSource();  
    src.buffer = buf;
    console.log(src); 
     
    //create fft
    fft = ctx.createAnalyser(); 
    fft.fftSize = samples;
     
    //connect them up into a chain 
    src.connect(fft); 
    fft.connect(ctx.destination); 
     
    //play immediately 
    src.loop = true;
    src.start(0);
    setup = true;
    getFft(fft);
} 

function getFft(aFft) {
	console.log(aFft);
	requestAnimationFrame(getFft);
	if(!setup)return;
	var data = new Uint8Array(samples);
	fft.getByteFrequencyData(data);
	console.log(data[1]);
	if (data[1] == 255) {
		$('body').css('background-color', '#ffffff');
	} else {
		$('body').css('background-color', '#000000');
	}
}