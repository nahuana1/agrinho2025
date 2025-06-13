let truck;
let apples = [];
let market;
let applesCollected = 0;
let bgImage;  // Fundo do jogo

function setup() {
  createCanvas(800, 400);
  
  // Definindo a imagem de fundo
  bgImage = loadImage("https://www.example.com/road_image.jpg");  // Substitua pela URL da imagem de fundo
  
  // Inicializando o caminhão
  truck = new Truck();
  
  // Inicializando as maçãs
  for (let i = 0; i < 20; i++) {
    apples.push(new Apple());
  }
  
  // Definindo o mercado (uma posição fixa na tela)
  market = createVector(width - 100, height - 50);
}

function draw() {
  background(bgImage);
  
  // Desenhando o mercado
  imageMode(CENTER);
  textSize(32);
  text('🏪 Mercado', market.x - 50, market.y - 60);
  
  // Desenhando as maçãs
  for (let apple of apples) {
    apple.show();
  }
  
  // Movendo e desenhando o caminhão
  truck.update();
  truck.show();
  
  // Verificando a colisão do caminhão com as maçãs
  for (let i = apples.length - 1; i >= 0; i--) {
    if (truck.collects(apples[i])) {
      apples.splice(i, 1);
      applesCollected++;
    }
  }
  
  // Verificando se todas as maçãs foram coletadas
  if (apples.length === 0) {
    textSize(32);
    fill(255, 0, 0);
    text("🎉 Você levou todas as maçãs para o mercado! 🎉", 50, height / 2);
    textSize(24);
    text("Total de maçãs coletadas: " + applesCollected, 50, height / 2 + 40);
  }
  
  // Exibindo a quantidade de maçãs coletadas
  textSize(24);
  fill(255);
  text("🍏 Maçãs: " + applesCollected + "/20", 20, 40);
}

class Truck {
  constructor() {
    this.position = createVector(50, height - 100);
    this.size = 50;
    this.velocity = createVector(0, 0);
  }
  
  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.velocity.x = -5;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.velocity.x = 5;
    } else {
      this.velocity.x = 0;
    }
    
    this.position.add(this.velocity);
    this.position.x = constrain(this.position.x, 0, width - this.size);
  }
  
  show() {
    fill(255, 0, 0);
    textSize(50);
    text('🛻', this.position.x, this.position.y);
  }
  
  collects(apple) {
    let d = dist(this.position.x, this.position.y, apple.position.x, apple.position.y);
    return d < this.size / 2 + apple.size / 2;
  }
}

class Apple {
  constructor() {
    this.position = createVector(random(100, width - 200), random(100, height - 150));
    this.size = 30;
  }
  
  show() {
    textSize(this.size);
    text('🍎', this.position.x, this.position.y);
  }
}
