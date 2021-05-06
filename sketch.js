var backImage,backgr;
var player, player_running;
var ground,ground_img;
var people1, people1Img, people2, people2Img; 
var vaccine, vaccineImg, vaccinesGroup; 

var FoodGroup, bananaImage;
var peopleGroup, obstacle_img;

var gameOver, r1, r2, r3, r4, r5;
var score=0, add;

var zombie, zombieImg, zombieGroup;

var PLAY = 1 ; 
var END = 0 ; 
var gameState = PLAY; 
var win,win1Img;
var emoji,emojImg;

function preload(){
  backImage=loadImage("Images/jungle.jpg");
  player_running = loadAnimation("Images/hero1.png","Images/hero2.png","Images/hero3.png","Images/hero4.png","Images/hero5.png","Images/hero6.png","Images/hero7.png","Images/hero8.png","Images/hero9.png","Images/hero10.png");
  zombieImg = loadAnimation("Images/zombie-0.png","Images/zombie-1.png","Images/zombie-3.png","Images/zombie-4.png","Images/zombie-5.png");
  people1Img = loadAnimation("Images/people9.png","Images/people10.png","Images/people11.png","Images/people12.png","Images/people13.png","Images/people14.png","Images/people15.png","Images/people16.png")

  people2Img = loadAnimation("Images/man1.png","Images/man2.png","Images/man3.png","Images/man4.png");
  vaccine1Img = loadImage("Images/vaccine.png"); 
  vaccine2Img = loadImage("Images/vaccine1.png"); 
  vaccine3Img = loadImage("Images/vaccine2.png");
  win1Img = loadImage("Images/win.png");
  emojImg = loadAnimation("Images/e.png","Images/f.png","Images/g.png","Images/h.png","Images/i.png");
  
  //bananaImage = loadImage("banana.png");
  //obstacle_img = loadImage("Images/stone.png"); 
  
}

function setup() {
  createCanvas(displayWidth, displayHeight-100);
  
  backgr=createSprite(0,300,displayWidth,displayHeight-50);
  backgr.addImage(backImage);
  backgr.scale=2.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;

win = createSprite(600,300);
win.addImage(win1Img);
win.scale = 0.9;
win.visible = false;

emoji = createSprite(60,60);
emoji.addAnimation("moj",emojImg);
emoji.scale = 0.6;
emoji.visible = false;
  
  
  player = createSprite(100,600,0,0);
  player.addAnimation("Running",player_running);
  player.scale = 0.4;
  player.visible = true;
  
  ground = createSprite(10,displayHeight-200,displayWidth+300,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  /*zombie = createSprite(displayWidth-120, displayHeight-300,10,10); 
  zombie.addAnimation("zombieAttacking", zombieImg); 
  zombie.scale = 0.3; */
  
  vaccinesGroup = new Group();
  peopleGroup = new Group();
  zombieGroup = new Group(); 
  
  score = 0;

  /*people1 = createSprite(displayWidth-350,340,10,10); 
  people1.addAnimation("peopleScreaming", people1Img);
  people1.scale = 0.5;
  people1.velocityX = -5; 
  
  people2 = createSprite(displayWidth-350,340,10,10); 
  people2.addAnimation("scaredMan",people2Img);
  people2.scale = 0.3; 
  people2.velocityX = -4; */
}

function draw() {
  
  background(255);

  if(gameState === PLAY){
    //spawnPeople();
    spawnVaccines();
    spawnZombies();
  
    if(ground.x<0) {
      ground.x=ground.width/2;
    }

    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }

   // switch(score){
   //   case 10: player.scale=0.2;
   //           break;
    // case 20: player.scale=0.3;
    //          break;
    //  case 30: player.scale=0.4;
    //          break;
     // case 40: player.scale=0.5;
    //          break;
    //  default: break;
  //  }//
      
    if(keyDown("space") ) {
      player.velocityY = -20;
    }

    //if(keyDown(RIGHT_ARROW) ) {
    //  player.x = player.x + 10; 
    //}

    //if(keyDown(LEFT_ARROW) ) {
    //  player.x = player.x - 10; 
    //}

    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    
    if(vaccinesGroup.isTouching(player)){
      vaccinesGroup.destroyEach();
      score = score + add;
      emoji.visible = true;
    }

    //if(peopleGroup.isTouching(player)){
     // vaccinesGroup.destroyEach();
     // score = score -1;
  //  }

    if(zombieGroup.isTouching(player)&& score < 10){
     // gameState = END; 
      win.visible = true;
      backgr.velocityX = 0;
      zombie.velocityX = 0;
      player.visible = false;
    }else if(zombieGroup.isTouching(player) && score>10){
      score = score-10; 
      zombieGroup.destroyEach();
      
    }

    drawSprites();
  
    stroke("white");
    textSize(20);
    fill("white");
    text("Vaccines Left: "+ score, displayWidth-200,displayHeight/4-100);
  }
  else if (gameState === END){
    zombieGroup.destroyEach(); 
    peopleGroup.destroyEach(); 
    vaccinesGroup.destroyEach(); 
  }
}

function spawnVaccines() {
  if(frameCount % 100 === 0) {
    r1 = random(1,displayWidth/2); 
    r2 = Math.round(random(1,3)); 
    var vaccine = createSprite(displayWidth-350,150,0,0);
    vaccine.velocityX = -6;
    switch(r2){
      case 1: vaccine.addImage(vaccine1Img);
              vaccine.scale =  0.15; 
              add = 5; 
              break; 
      case 2: vaccine.addImage(vaccine2Img);        
              vaccine.scale = 0.03; 
              add = 10;
              break; 
      case 3: vaccine.addImage(vaccine3Img);
              vaccine.scale = 0.2; 
              add = 15; 
              break; 
      default: break;                
    }
    
    //vaccine.lifetime = 100;
    vaccinesGroup.add(vaccine);
  }
}

function spawnPeople() {
  if(frameCount % 200 === 0) {
  //  r3 = random(1,displayWidth/2); 
   // r4 = Math.round(random(1,3)); 
    people = createSprite(350,340,10,10); 
    switch(r4){
      case 1: people.addAnimation("peopleScreaming", people1Img);
              people.scale = 0.5; 
              people.velocityX = -5; 
              break; 
      case 2: people.addAnimation("people2Screaming", people2Img);
              people.scale = 1; 
              people.velocityX = -3; 
              break;         
      case 3: people.addAnimation("peopleScreaming", people1Img);
              people.scale = 0.5;
              people.velocityX = -4; 
              break;         
      default: break; 
    }

    people.lifetime = 200;
    peopleGroup.add(people);
  }
}

function spawnZombies() {
  if(frameCount % 300 === 0) {
    r5 = random(displayWidth/2+100, displayWidth/2+200); 
    zombie = createSprite(displayWidth-120, displayHeight-350,0,0); 
    zombie.addAnimation("zombieAttacking", zombieImg); 
    zombie.scale = 0.3; 
    //zombie.lifetime = 220;
    zombie.velocityX = -3;
    zombieGroup.add(zombie);
  }
}
