var ground;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var PLAY = 0;
var END = 1;
var gamestate = PLAY;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(600, 400);

  ground = createSprite(300, 390, 600, 20);

  monkey = createSprite(100, 320, 10, 20);
  monkey.addAnimation("RUN", monkey_running);
  monkey.scale = 0.2;

  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background(255);

  var score = 0;

  if (gamestate === PLAY) {
    
    score = score+Math.round(frameCount/75);
    
    spawn_food();
  spawn_obstacles();
    
    if ((keyDown("space")) && monkey.y >= 318) {
      monkey.velocityY = -20
    }

    if (monkey.isTouching(FoodGroup)) {
      score = score + 1;
      FoodGroup[0].destroy();
    }
    
    if(monkey.isTouching(obstacleGroup)){
      gamestate = END
    }

  }

  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground)
  
  if(gamestate === END){
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    monkey.destroy();
  }
  
  textSize = 100;
  text("lifetime = "+score, 300, 50);
  
  monkey.debug = true;
  obstacleGroup.debug = true;
  
  monkey.setCollider("rectangle",0,0,10,monkey.hieght);

  drawSprites();
}

function spawn_food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, Math.round(random(100, 120)), 10, 10);
    banana.velocityX = -6;
    banana.addAnimation("oofooffo", bananaImage);
    banana.scale = 0.08;
    banana.lifetime = 150;
    FoodGroup.add(banana);
  }
}

function spawn_obstacles() {
  if (frameCount % 120 === 0) {
    obstacle = createSprite(600, 350, 10, 10);
    obstacle.velocityX = -8;
    obstacle.addAnimation("oppppp", obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}