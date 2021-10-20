song="";
left_wrist_x=0;
left_wrist_y=0;
right_wrist_x=0;
right_wrist_y=0;
score_left_wrist=0;
score_right_wrist=0;
function preload()
{
    song=loadSound("music.mp3");
}

function play()
{
song.play();
song.setVolume(1);
song.rate(1);

}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose', gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        score_left_wrist=results[0].pose.keypoints[9].score;
        score_right_wrist=results[0].pose.keypoints[10].score;
        console.log("Score_Right_Wrist = "+score_right_wrist+"Score_Left_Wrist"+score_left_wrist);
        left_wrist_x=results[0].pose.leftWrist.x;
        left_wrist_y=results[0].pose.leftWrist.y;
        console.log("Left_Wrist_X = "+left_wrist_x+", Left_Wrist_Y = "+left_wrist_y);
        right_wrist_x=results[0].pose.rightWrist.x;
        right_wrist_y=results[0].pose.rightWrist.y;
        console.log("Right_Wrist_X = "+right_wrist_x+", Right_Wrist_Y = "+right_wrist_y);
    }
}

function modelLoaded()
{
    console.log("PoseNet is Initialized");
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#1e30f7");
    stroke("#1e30f7");
    if(score_right_wrist > 0.2)
    {
    circle(right_wrist_x, right_wrist_y, 20);
    if(right_wrist_y > 0 && right_wrist_y <= 100)
    {
        song.rate(0.5);
        document.getElementById("speed").innerHTML="Speed = 0.5x";
    }
    else if(right_wrist_y > 100 && right_wrist_y < 200)
    {
        song.rate(1);
        document.getElementById("speed").innerHTML="Speed = 1x";
    }
    else if(right_wrist_y > 200 && right_wrist_y < 300)
    {
        song.rate(1.5);
        document.getElementById("speed").innerHTML="Speed = 1.5x";
    }
    else if(right_wrist_y > 300 && right_wrist_y < 400)
    {
        song.rate(2);
        document.getElementById("speed").innerHTML="Speed = 2x";
    }
    else if(right_wrist_y > 400)
    {
        song.rate(2.5);
        document.getElementById("speed").innerHTML="Speed = 2.5x";
    }
    }
    if(score_left_wrist > 0.2)
    {
    circle(left_wrist_x, left_wrist_y, 20);
    InNumber=Number(left_wrist_y);
    Remove_Decimals=floor(InNumber);
    Volume=Remove_Decimals/500;
    document.getElementById("volume").innerHTML="Volume: " + Volume;
    song.setVolume(Volume);
    }
}

