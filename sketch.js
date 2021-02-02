//Game Assets
var monkey , monkey_running, monkeyCollide;
var ground, invisiGround;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var jungleImg;

//States
var PLAY = 0;
var END = 1;
var WIN = 2;
var gameState = PLAY;


function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyCollide = loadAnimation("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  jungleImg = loadImage("jungle.png");
 
}

function setup(){
 createCanvas(540,400);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
    
  ground = createSprite(300,340,25000,10);
  ground.scale = 1;   
  
  invisiGround = createSprite(300,340,25000,7);
  invisiGround.visible = false;
  
}

function draw(){
  background("white");

  imageMode(CENTER)
  image(jungleImg, 540/2, 200, 19200, 540)

  fill("white");
  text("SURVIVAL TIME: "+score, camera.position.x, 20);
  text("BANANA SCORE: "+bananaScore, camera.position.x, 40)
 
  
  if (gameState === PLAY){
    obstacles();
    bananas();

    monkey.position.x +=5;

    camera.position.x = monkey.position.x;
    camera.position.y = monkey.position.y;
    
    score = score + Math.round(getFrameRate()/60);
  
    if(keyDown("space") && monkey.y >= 299) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
    
      gameState = END;
    
    }

    if (monkey.position.x===19200/2){
    
      gameState = WIN;
    
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    text("GAMEOVER!!!", camera.position.x, camera.position.y);
    text("Press 'R' to play again", camera.position.x, camera.position.y-50);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }

  if(gameState===WIN) {

    text("You Beat The Game!!!", camera.position.x, camera.position.y);
    text("Press 'R' to play again", camera.position.x, camera.position.y-50);

    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
  }
  
  
  
  drawSprites(); 
  
  monkey.collide(invisiGround);
}

function bananas(){
  if (frameCount%80 === 0){   
    banana = createSprite(monkey.position.x + 200,220, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;        
    banana.lifetime = 220;
    bananaGroup.add(banana);
  }
}

function obstacles(){
  if (frameCount%200 === 0){
    obstacle = createSprite(monkey.position.x + 200,310,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
  }
}
