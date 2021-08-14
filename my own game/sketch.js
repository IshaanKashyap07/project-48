var bird, birdFlying;
var helicopter, helicopterGroup;
var platform,platformGroup;
var spring;
var gameState = "play"
var score;

function preload(){
  birdFlying = loadImage("Images/flyingBird.png")
  fallingBird = loadImage("Images/fallingBird.png")
  deadBird = loadImage("Images/deadBird.png")
  jumpBird = loadImage("Images/jumpBird.png")

  helicopter1 = loadAnimation("Images/helicopter1.png","Images/helicopter2.png","Images/helicopter3.png","Images/helicopter4.png")
  helicopter2 = loadAnimation("Images/helicopter11.png","Images/helicopter22.png","Images/helicopter33.png","Images/helicopter44.png")

  platform1 = loadImage("Images/platform1.png")
  background1 = loadImage("Images/sky.jpg")
  bounceSound = loadSound("sounds/bounce.mp3")
  dieSound = loadSound("sounds/die.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  bird = createSprite(windowWidth/2,windowHeight/2);
  bird.scale = 0.3
  bird.velocityY = -10
  bird.addImage("birdFlying",birdFlying);
  bird.addImage("deadBird",deadBird);
  
  deadBird.resize(300,0)
  birdFlying.resize(300,0)
  
  helicopterGroup = new Group()
  platformGroup = new Group()
  score = 0
  
  spawnPlatform()
  }
  
function draw(){
  background(background1)
  if(gameState === "play" ){
    bird.changeImage("birdFlying")

    if(keyDown(LEFT_ARROW)){
      bird.x = bird.x-5
    }
  
    if(keyDown(RIGHT_ARROW)){
      bird.x = bird.x+5
    }
  
    if(bird.isTouching(platformGroup)){
      bird.velocityY = -12
      bounceSound.play()
    }
  
    if(bird.y < 0 ){
      platformGroup.destroyEach();
      spawnPlatform();
      bird.y = height/2;
      score = score + 100
    }

    if(bird.isTouching(helicopterGroup)){
      bird.changeImage("deadBird") 
      dieSound.play()
      gameState = "end"

    }
  }

  bird.velocityY = bird.velocityY+0.5


  spawnHelicopters();
  drawSprites();
  
  fill(255)
  textSize(35)
  text("Score : "+score,width-250,50)

}

function spawnPlatform(){
   for(var i = 50; i<=windowHeight-50; i += 50){
    platform = createSprite(random(200,windowWidth-200),i,100,20)
    platform.addImage("platform1",platform1)
    platform.scale = 0.1;

    platformGroup.add(platform)
  
 }

}

function spawnHelicopters(){
  if(World.frameCount%100 === 0){
    var select = Math.round(random(1,2))
    if(select === 1){
      helicopter = createSprite(0,random(0,windowHeight/2),100,30)
      helicopter.velocityX = 7
      helicopter.scale = 0.4
      helicopter.addAnimation("helicopter1",helicopter1)
      
    }
    else{
      helicopter = createSprite(width,random(0,windowHeight/2),100,30)
      helicopter.velocityX = -7
      helicopter.scale = 0.4
      helicopter.addAnimation("helicopter2",helicopter2)
    }
    helicopter.lifetime = width/5
    helicopterGroup.add(helicopter)
  }

}