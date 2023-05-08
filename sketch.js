var direção, player, minionG, minion2G, runnerG, heavyG;
var coinImg, playerImg, minionImg, minion2Img, runnerImg; 
var heavyImg, miniBossImg, miniBossHeavyImg, bossImg;
var shoot, shootG, wave = 1, maxEnergy = 200;
var energy = maxEnergy;
var maxEnemySpawn = 5
var enemySpawn = maxEnemySpawn
var button1, button2, button3, score = 0;
var timer = 5
var boss1, bossShoot1,bossShoot1G, boss1Life = 600, boss1Bar, boss1Spawn = false, boss1Atack = false;
var boss2, bossShoot2,bossShoot2G, boss2Life = 1300, boss2bar, boss2Spawn = false, boss2Atack = false;
var boss3, bossShoot3,bossShoot3G, boss3Life = 1500, boss3Bar, boss3Spawn = false, boss3Atack = false;
function setup() {
  createCanvas(windowWidth,windowHeight);
  playerImg = loadImage("assets/player.png");
  minionImg = loadImage("assets/minion.png");
  minion2Img = loadImage("assets/minion_v2.png");
  runnerImg = loadImage("assets/runner.png");
  heavyImg = loadImage("assets/heavy.png");
  boss1Img = loadImage("assets/mini_boss.png");
  boss2Img = loadImage("assets/mini_boss heavy.png");
  boss3Img = loadImage("assets/boss.png");
  player = createSprite(width/15, height/2, width/20 ,width/20);
  direção = createSprite(width/2, height/2, 50 ,50);
  shootG = new Group();
  minionG = new Group();
  minion2G = new Group();
  runnerG = new Group();
  heavyG = new Group();
  bossShoot1G = new Group();
  bossShoot2G = new Group();
  bossShoot3G = new Group();
  boss1G = new Group();
  boss2G = new Group();
  boss3G = new Group();
}

function draw() {

  background(0,25,100);  
  if(frameCount%4 === 0 && energy < maxEnergy){
    energy += 1
  }
  if(energy > maxEnergy){
    energy = maxEnergy
  }
    push();
    fill("white");
    rect(30, 30, maxEnergy * 2, 40);
    fill("#42e9f5");
    rect(30, 30, energy * 2, 40);
    noStroke();
    pop();
  
  direção.visible = false
  if(keyDown("UP") && direção.y > 155){
    direção.y = direção.y - 15;
  }
  if(keyDown("DOWN") && direção.y < height-50){
    direção.y = direção.y + 15;
  }
  player.velocityY = (direção.y - player.y)/7
  if(keyWentDown("SPACE") && energy >= 5){
    shoot = createSprite(player.x+100,player.y,10,10);
    shoot.shapeColor = rgb(50,150,255); 
    shoot.velocityX = 45;
    shoot.lifetime = width;
    shootG.add(shoot);
    energy -= 4
  }
  player.addImage("player", playerImg);
  player.scale = 0.3;
  push()
  textSize(50);
  fill("red");
  stroke("red")
  text("wave: " + wave,width/2-100,60);
  pop()
  push()
  textSize(30)
  fill("#ffff32");
  stroke("ffff00")
  text("score: " + score,maxEnergy * 2 + 50,60);
  pop()
  push()
  textSize(30)
  fill("black");
  stroke("black")
  text(energy + "/" + maxEnergy,maxEnergy - 20,60);
  pop()
  if(shootG.isTouching(boss1G)){
    boss1Life -= 1
  }
  if(boss1Life <= 0){
    boss1G.destroyEach()
    boss1Spawn = false;
  }
  spawEnemy();
  drawSprites();
  console.log(boss1Life)
}
function spawEnemy() {
  if(wave === 2 && boss1Spawn === false){
    boss1 = createSprite(width*1.2, height/2, 20, 20)
    boss1.addImage("boss1",boss1Img)
    boss1.scale = 0.3
    boss1Spawn = true
    boss1G.add(boss1)
  }
  if(frameCount%20 === 0 && boss1Spawn){
    boss1Atack = true
  }
  if(boss1Spawn){
  boss1.velocityX = ((width*0.9)-boss1.x)/15
  if(boss1Atack === false){
  boss1.velocityY = (player.y - boss1.y)/5
  }else if(boss1Atack){
    bossShoot1 = createSprite(boss1.x - 135, boss1.y, 25, 25)
    bossShoot1.shapeColor = rgb(255, 50, 60)
    bossShoot1.velocityX = random(-18,-12)
    bossShoot1.velocityY = random(-3,3)
    bossShoot1G.add(bossShoot1);
    boss1Atack = false;
  }
  }
  if(wave === 10 && boss2Spawn === false){
    boss2 = createSprite(width*1.2, height/2, 20, 20)
    boss2.addImage("boss2",boss2Img)
    boss2.scale = 0.3
    boss2Spawn = true
  }
  if(boss2Spawn){
    boss2.velocityX = ((width*0.9)-boss2.x)/15
    boss2.velocityY = (player.y - boss2.y)/5
  }
  if(wave === 15 && boss3Spawn === false){
    boss3 = createSprite(width*1.2, height/2, 20, 20)
    boss3.addImage("boss3",boss3Img)
    boss3.scale = 0.3
    boss3Spawn = true
  }
  if(boss3Spawn){
    boss3.velocityX = ((width*0.9)-boss3.x)/15
    boss3.velocityY = (player.y - boss3.y)/5
  }
  
  if(frameCount%60 === 0 && enemySpawn >= 1 && wave != 2 && wave != 10 && wave != 15){
    var choseEnemy = Math.round(random(1,4));
    enemy = createSprite(width,random(150 ,height - 50), 40 ,40)

    if(choseEnemy === 1){
      enemy.addImage(minionImg)
      enemy.scale = 0.3
      enemy.velocityX = -4
      enemy.lifetime = (width/4)+50
      enemy.setCollider("rectangle",0,0,250,230)
      enemy.enemyLife = 2
    }
    if(choseEnemy === 2){
      enemy.addImage(runnerImg)
      enemy.scale = 0.3
      enemy.velocityX = -9
      enemy.lifetime = (width/9)+50
      enemy.setCollider("rectangle",0,0,450,230)
      enemy.enemyLife = 2
    }
    if(choseEnemy === 3){
      enemy.addImage(minion2Img)
      enemy.scale = 0.3
      enemy.velocityX = -5
      enemy.lifetime = (width/5)+50
      enemy.setCollider("rectangle",0,0,360,280)
      enemy.enemyLife = 3
    }
    if(choseEnemy === 4){
      enemy.addImage(heavyImg)
      enemy.scale = 0.3
      enemy.velocityX = -3
      enemy.lifetime = (width/3)+50
      enemy.setCollider("rectangle",0,0,350,310)
      enemy.enemyLife = 7
    }
    enemySpawn -= 1;
  }else{
    if(frameCount % 100 === 0 && timer > 0 && enemySpawn === 0) {
      timer -= 1;
    }
    if(timer === 0){
      wave += 1;
      maxEnemySpawn += 1
      enemySpawn = maxEnemySpawn;
      timer = 5
    }
  }
   
}
