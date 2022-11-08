img="";
objects=[];
Status="";
song1="";

function preload() {
 song1=loadSound("mixkit-street-public-alarm-997.wav");
}

function setup() {
    canvas= createCanvas(450, 450);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    detect_object=ml5.objectDetector('cocossd', loaded)
    document.getElementById("status").innerHTML="Status: Detecting";
   
}


function loaded() {
    console.log("loaded")
    Status=true;
    
}
function draw() {
    image(video,0,0,450,450);
   
   

   //rect(50,100,400,300);

   r=random(255);
   g=random(255);
   b=random(255);
   detect_object.detect(video ,gotresults);
   if (Status != "") {
   if (objects.length==0) {
    document.getElementById("identified").innerHTML="Baby not Found";
    song1.play();
   }
       document.getElementById("status").innerHTML="Status: Objects Detected"
       
    for (let i = 0; i< objects.length; i++) {
        fill(r,g,b);
        stroke(r,g,b);
        noFill();
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%", objects[i].x+15,objects[i].y+15);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if (objects[i].label== "person") {
            document.getElementById("identified").innerHTML="Baby Found";
            song1.stop();
        }else if(objects[i].label!="person"){
            document.getElementById("identified").innerHTML="Baby not Found";
            song1.play();
        }
        
      
    }
   
   }
   
}
function gotresults(error, results) {
    if (error) {
        console.error(error);
    }
 else{
     console.log(results);
     objects=results;
 }

}


