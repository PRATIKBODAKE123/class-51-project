var bg,bgImg;
var player, playerImg;
var zombie, zombieImg;
var bulletImg;
var zombieGrp,bulletGrp;
var score = 0
var gameState = 1;
Play = 1
End = 0

function  preload(){
playerImg = loadImage("player.png")
zombieImg = loadImage("zombie.png")
bulletImg = loadImage("bullet.png")

bgImg = loadImage("bgImg.jpg")
}

function setup() {

  createCanvas(windowWidth,windowHeight);

  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.2
 
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(playerImg)
  player.scale = 0.2
  player.debug = true
  player.setCollider("rectangle",0,20,680,680)

  zombieGrp = new Group();
  bulletGrp = new Group();

}

function draw() {
  background(255,255,255);  
 
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }
  
  if(keyWentDown("space")){  
    //bullet shoots
     bulletSpawns()

  }
   
  if(zombieGrp.isTouching(player)){
 
    for(var i=0;i<zombieGrp.length;i++){     
         
     if(zombieGrp[i].isTouching(player)){
          zombieGrp[i].destroy()
          } 
    }
   }
   
   
  if(bulletGrp.isTouching(zombieGrp)){
 
    for(var i=0;i<zombieGrp.length;i++){     
         
     if(zombieGrp[i].isTouching(bulletGrp[i])){
          zombieGrp [i].destroy()
          bulletGrp[i].destroy()
          console.log("it")  
          score = score + 1
        } 
    }
   }else if(zombieGrp.isTouching(bulletGrp)){
 
    for(var i=0;i<bulletGrp.length;i++){     
         
     if(bulletGrp[i].isTouching(zombieGrp[i])){
          zombieGrp [i].destroy()
          bulletGrp[i].destroy()
          console.log("doit")  
          score = score + 1
        } 
    }
   }
  spawnbillonsofzombie();

  drawSprites();

  fill("red")
  textSize(50)
  text("Score:"+score,10,50)
}

function spawnbillonsofzombie(){
  if(frameCount % 75 === 0){

    randomX = random(350,1200);
    randomY = random(100,500);

    zombie = createSprite(randomX,randomY,40,40)
    zombie.addImage(zombieImg)
    zombie.scale = 0.3
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
    zombieGrp.add(zombie)
  }

}

function bulletSpawns(){

  bullet = createSprite(player.x+70,player.y-38,40,40)
  bullet.addImage(bulletImg)
  bullet.scale = 0.25
  bullet.velocityX = 7
  //bullet.debug= true
  bullet.setCollider("rectangle",0,0,400,400)
  bullet.lifetime = 200
  bulletGrp.add(bullet)
}