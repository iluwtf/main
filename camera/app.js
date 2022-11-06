// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");
    cameraWaterMark = document.querySelector("#watermark");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.crossOrigin="anonymous";
    cameraOutput.cameraWaterMark="anonymous";
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.width = cameraSensor.width - 6;
    cameraOutput.height = cameraSensor.height - 6;
    cameraOutput.classList.add("taken");

    watermark([cameraOutput, cameraWaterMark])
    .dataUrl(watermark.image.upperLeft(1))
    //.render()
    .then(function (url) {
      cameraOutput.src = url;
    });
    

    // track.stop();
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);


// Install ServiceWorker
if ('serviceWorker' in navigator) {
  console.log('CLIENT: service worker registration in progress.');
  navigator.serviceWorker.register( '/camera-app/part-2/sw.js' , { scope : ' ' } ).then(function() {
    console.log('CLIENT: service worker registration complete.');
  }, function() {
    console.log('CLIENT: service worker registration failure.');
  });
} else {
  console.log('CLIENT: service worker is not supported.');
}

