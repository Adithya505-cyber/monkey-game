
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, ObstacleGroup;
var score = 1;
var ground, invisible;
var survivalTime = 0;
var GameState;
var PLAY, END;
var end;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  ObstaceImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(500,500);

  PLAY = 1;
  GameStae = PLAY;
  END = 0;
  
  FoodGroup = new Group();
  ObstacleGroup = new Group();
  
  monkey = createSprite(70,370,50,50);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(250,405,1000,10)
  ground.x = ground.width/2;
  ground.debug = true;
  
  invisible = createSprite(250,407,1000,10);
  invisible.x = ground.width/2;
}


function draw() {
background("lightblue");
  
  if(GameState === PLAY){
    //reset the ground
    if(ground.x<0){
      ground.x = ground.width/2;
    }
    
    if(invisible.x<0){
      ground.x = ground.width/2;
    }
    invisible.velocityX = -5;
    
    if(keyDown("space")&& monkey.isTouching(ground)){
      monkey.velocityY = -20;
    }
    
    score = Math.round(frameCount/3);
    survivalTime = Math.ceil(frameCount/frameRate());
    ground.velocityX =-(5+2 * score/100);
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
    }
    
    Food();
    Obstacles();
  
    
    if(monkey.isTouching(ObstacleGroup)){
      GameState = END;
    }
    
  } 
  else if(GameState === END){
    ground.velocityX = 0;
    invisible.velocityX=0;
    ObstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    ObstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  
  //gravity
  monkey.velocityY = monkey.velocityY=0.9;
  
  monkey.collide(invisible);
  
  stroke("black");
  textSize(20);
  fill("red");
  text("survival Time:"+survivalTime,100,50); 
  
  stroke("black");
  textSize(20);
  fill("black");
  text("score:"+score,400,50); 

 drawSprites(); 
}

function Food(){
  
  if(frameCount%300 === 0){
    var banana = createSprite(500,10,10,20);
    banana.addImage("banana",bananaImage);
    banana.velocityX = -(5+2*score/100);
    banana.y =Math.round(random(120,200));
    banana.scale=0.1;
    FoodGroup.add(banana);
    FoodGroup.setLifetimeEach(100);
    banana.setCollider("rectangle",0,0,400,400);
  }
}

function Obstacle(){
  
  if(frameCount%300 === 0){
    var Obstacle = createSprite(500,365,23,32);
    Obstacle.addImage("Obstacle",ObstacleImage);
    Obstacle.velocityX = -(5+2*score/100);
    Obstacle.scale=0.2;
    ObstacleGroup.add(Obstacle);
    ObstacleGroup.setLifetimeEach(100);
    Obstacle.debug = true;
    banana.setCollider("rectangle",0,0,200);
  }
}

