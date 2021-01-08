var dog,dogIma, happyDog, database;
var foodS, foodStock;
var fedTime ,lastFed;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  dog=createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale=0.2;

  food1=new Food();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  feed=createButton('feed the dog');
  feed.position(550,30);
  feed.mousePressed(feedDog);

  addFood=createButton('add food');
  addFood.position(650,30);
  addFood.mousePressed(addFoods);
  
}


function draw() { 
  background(46,139,87);

  
  textSize(20);
  fill(255,255,254);
  if(lastFed>=12 ){
    text("last fedTime :"+lastFed%12+"PM",350,30);
  }else if(lastFed=0){
    text("lastFed :12AM",350,30);
  }else{
    text("lastFed :"+lastFed+"AM",350,30);
  }

  
  food1.display();
  

  drawSprites();
  
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

      if(x<=0){
        x=0;
      }else {
        x=x-1;
      }

    database.ref('/').update({
      food:x
    })
}

function addFoods(){
    foodS++
    database.ref('/').update({
      Food:foodS
    })
}

function feedDog(){
  dog.addImage(happyDog);

  food1.updateFoodStock(food1.getFoodStock()-1)
  database.ref('/')({
    Food:food1.getFoodStock(),
    FeedTime:hour()
  })
}



