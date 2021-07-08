
/*const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;*/

var laser, gameState, score, obstSpeed;

function preload()
{
	bg=loadImage("images/bg.jpg");
	playerImg=loadImage("images/ship5.png");
	laserImg=loadImage("images/laser2.png");
	obstacleImg=loadImage("images/asteroid1.png");
	destroy=loadAnimation("images/collapse.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);


//	engine = Engine.create();
//	world = engine.world;

	//Create the Bodies Here.

	player=createSprite(windowWidth-921, windowHeight-191, 10, 10);
	player.setCollider('circle', 0, 0, 140);
	player.addImage(playerImg);
	player.scale=0.4;

	obstGrp=createGroup();
	laserGrp=createGroup();
	
	leftButton=createButton("<-");
	leftButton.position(windowWidth/2-660, windowHeight-100);

	rightButton=createButton("->");
	rightButton.position(windowWidth-100, windowHeight-100);

	//Engine.run(engine);
	console.log(windowWidth, windowHeight);
	console.log(player.y);

	 gameState="start";

	 score=0;
}


function draw(){
   background(bg);
   obstSpeed = score + Math.round(getFrameRate()/60);

   if(gameState==="start"){
	strokeWeight(5);
	stroke("black");
	fill("yellow");
	textSize(35);
	text("Cosmic Ranger", windowWidth/2-100, windowHeight-600);
	fill("orange");
	textSize(25);
	text("Shoot the meteorites and don't let them touch you!",
	 windowWidth/2-250, windowHeight-500);
	 text("Press 'Space' to shoot the lasers", windowWidth/2-250, windowHeight-450);
	 text("Press 'Enter' to play", windowWidth/2-250, windowHeight-400);
   }
	if(keyDown(ENTER)&& gameState==="start"|| touches.length<0){
		gameState="play";
		touches=[];
	}

	if(gameState==="play"){
		strokeWeight(5);
		stroke("black")
		fill("yellow");
		textSize(25);
		text("Score:"+score, windowWidth-200, windowHeight-600);

	if(keyWentDown("space")){
	spawnLas();
}

for(var i=0;i<obstGrp.length;i++){
if(laserGrp.isTouching(obstGrp.get(i))){
	obstGrp.get(i).destroy();
	score+=10;
	}
}

	for(var s=0; s<=1000;s+=100){
		if(score===s){
			obstGrp.setVelocityYeach=obstGrp.velocityY+8;
		}
	}

/*if(keyDown(UP_ARROW)){
	player.y=player.y-8;
	
}*/


leftButton.mousePressed(()=>{
	player.x=player.x-30;
});	
	
rightButton.mousePressed(()=>{
	player.x=player.x+30;
});

	


spawnMeteorite();	
 
drawSprites();

}

for(var i=0;i<obstGrp.length;i++){
	if(obstGrp.isTouching(player)){
		gameState="end";
	}
}

if(gameState==="end"){
	fill("red");
	textSize(40);
	text("Game Over!", windowWidth/2-100, windowHeight-400);
	textSize(20);
	text("Press 'R' to restart", windowWidth/2-100, windowHeight-300)
	obstGrp.destroyEach();
	player.destroy();
	}

	if(keyDown("r") && gameState==="end"){
		reset();
	}
}

function spawnMeteorite(){
	if(frameCount%50===0){
	obstacle=createSprite(random(windowWidth/2-400, windowWidth-200), windowHeight-700, 10, 10);
	obstacle.addImage(obstacleImg);
	obstacle.scale=0.15;
	obstacle.velocityY=(6+3*obstSpeed/100);
	obstGrp.add(obstacle);
	}
}

function spawnLas(){
		laser=createSprite(player.x, player.y, 1,1);
		laser.addImage(laserImg);
		laser.scale=0.08;
		laser.velocityY=-6;
		laserGrp.add(laser);
}
	

function reset(){
	gameState="play";
	score=0;

	player=createSprite(windowWidth-921, windowHeight-191, 10, 10);
	player.setCollider('circle', 0, 0, 140);
	player.addImage(playerImg);
	player.scale=0.4;
}