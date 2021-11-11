var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() { Textbox.innerHTML = ""; recognition.start(); }

recognition.onresult = function run (event) {
    console.log(event);

    var Content = event.results[0][0].transcript;
    console.log(Content);
    document.getElementById("textbox").innerHTML=Content;
    if (Content=="take a photo") {
    console.log("taking photo --");
    speak();
    }
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data="Taking your photo in 5 Seconds";
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);

    setTimeout( function () {
      take_snapshot(); 
      save();
    }, 5000);
}

Webcam.set({
    width: 360,
    height: 250,
    image_format:'png',
    png_quality: 90
});

camera=document.getElementById("camera");

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML='<img id="photo" src="'+data_uri+'">';
    });
}

function save() {
    link=document.getElementById("link");
    image=document.getElementById("photo").src;
    link.href=image;
    link.click();
}