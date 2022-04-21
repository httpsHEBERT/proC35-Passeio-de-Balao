
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ PASSEIO
// ▒▒▄▄▄▒▒▒█▒▒▒▒▄▒▒▒▒▒▒▒▒ DE
// ▒█▀█▀█▒█▀█▒▒█▀█▒▄███▄▒ BALÃO
// ░█▀█▀█░█▀██░█▀█░█▄█▄█░ PELA
// ░█▀█▀█░█▀████▀█░█▄█▄█░ CIDADE
// ████████▀█████████████

var ballon, ballonImg;
var position, database;

function preload(){

    bg = loadImage("Images/city.png");
    ballonImg = loadAnimation("Images/ballon1.png", "Images/ballon2.png", "Images/ballon3.png");
    music = loadSound("Sounds/music.mp3");
  }

function setup(){

  database = firebase.database();

  createCanvas(windowWidth, windowHeight-4);

  ballon = createSprite(380, 330, 150, 150);
  ballon.addAnimation("ballon", ballonImg);
  ballon.frameDelay = 10; //melhor do que ficar repetindo no loadAnimation hehe :D
  ballon.scale = 0.5;

  var ballonPosition = database.ref("ballon/position");
  ballonPosition.on("value", readPosition, showError);

  music.setVolume(0.2);
  music.loop(); //já que gosta de uma trilha sonora...
}

function draw(){

  background(bg);

  if(keyDown(LEFT_ARROW) || keyDown("a")){

    writePosition(-5, 0);

  }else if(keyDown(RIGHT_ARROW) || keyDown("d")){

    writePosition(5, 0);

  }else if(keyDown(UP_ARROW) || keyDown("w")){
    
    writePosition(0, -5);

  }else if(keyDown(DOWN_ARROW) || keyDown("s")){

    writePosition(0, 5);
  }

  drawSprites();
}

function writePosition(x, y){

  database.ref("ballon/position").set({
      "x": position.x + x,
      "y": position.y + y
  })
}

function readPosition(data){
  position = data.val();
  ballon.x = position.x;
  ballon.y = position.y;
}

function showError(){
  console.log("Revise seu código, algo deu errado :( ");
}
