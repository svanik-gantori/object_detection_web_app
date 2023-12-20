img="";
status="";
objects=[];

function preload()
{
    img=loadImage('kitchen.avif');
}

function setup()
{
    canvas=createCanvas(400,380);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function draw()
{
    image(img,0,0,640,420);
    if(status !="")
    {
        for(i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML="Objects are detected";
            fill("red");
            percentage=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentage+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }
    }
    
}

function modelLoaded()
{
    console.log("Model Loaded");
    status=true;
    objectDetector.detect(img,gotResults)
}

function gotResults(error,results)
{
    if(error)
    {
        console.error(error);
    }

    console.log(results); 
    objects=results;  
}