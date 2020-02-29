window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  // var position personnage
  var posX = 50
  var posY = 590
  var ballRadius = 10
  // valeurs déplacements
  var dx = 7
  var dy = 7
  // contrôles
  var rightPressed = false // 39
  var leftPressed = false // 37
  var upPressed = false // 38
  var downPressed = false // 40
  let joueur;
  let plateFormes;
  let echelles;
  let obstacles;
  let itemsBonus;

  //déclarations images
  var imageCoeur = new Image();
  imageCoeur.src = 'public/coeur.png';
  
  
  function keyDownHandler (e) {
    if (e.keyCode == 39) {
      rightPressed = true
    } else if (e.keyCode == 37) {
      leftPressed = true
    } else if (e.keyCode == 38) {
      upPressed = true
    } else if (e.keyCode == 40) {
      downPressed = true
    }
  }
  function keyUpHandler (e) {
    if (e.keyCode == 39) {
      rightPressed = false
    } else if (e.keyCode == 37) {
      leftPressed = false
    } else if (e.keyCode == 38) {
      upPressed = false
    } else if (e.keyCode == 40) {
      downPressed = false
    }
  }
  document.addEventListener('keydown', keyDownHandler)
  document.addEventListener('keyup', keyUpHandler)
  const terrain = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  var cpt = 0
  function dessinerTerrain () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    plateFormes = []
    echelles = []
    itemsBonus = [];
    let k = 0;
    let e = 0;
    let cptItem = 0;
    for (let i = 0; i < 22; i++) {
      const ligne = terrain[i]
      
      for (let j = 0; j < 15; j++) {
        if (ligne[j] === 1) {
          plateFormes[k] = new PlateForme(i, j)
          k++
        } 
        else if(ligne[j] === 2){
          echelles[e] = new Echelle(i,j);
          e++;
        }else if(ligne[j] === 10){
          itemsBonus[cptItem] = new ItemsBonus(i,j);
          cptItem++; 
        }else if (ligne[j] === 3) {
          if (cpt === 0) {
            joueur = new Joueur(i, j)
            cpt++
          }
            
        }
      }
    }
    joueur.setPosition();
  }
  function draw () {
    dessinerTerrain()
  }
  class Joueur {
    constructor (i, j) {
      this.posX = j * 32
      this.posY = i * 32
      this.grimpe = false;
      this.saut = false; // saut en cours
      this.ySaut = 0; // posY du saut
      this.sautOk = true; // saut autorisé
      this.draw()
    }
    draw () {
      // var image = new Image();
      // image.addEventListener('load', function() {
      // ctx.beginPath()
      // ctx.drawImage(image,0,0);
      // ctx.rect(this.posX, this.posY, 32, 32)
      // ctx.fillStyle = 'red'
      // ctx.fill()
      // ctx.closePath()
      
      // },false);
      // image.src = 'public/Chorizo.png';

      ctx.beginPath()
      ctx.rect(this.posX, this.posY, 32, 32)
      ctx.fillStyle = 'public/Chorizo.png'
      ctx.fill()
      ctx.closePath()
    }
    setPosition () {
      if (!this.collisionCanva()) {
        if (rightPressed) {
          this.posX += dx
        } else if (leftPressed) {
          this.posX -= dx
        } 

        if (upPressed) {
          if(!this.saut && this.posY >= this.ySaut){
            this.saut = true;
            this.ySaut = this.posY;
            this.sautOk = false;
          }
        }
      }
      if(this.collisionEchelle()){
        console.log("je grimpe");
        if(upPressed){
          this.posY -= dy;
        }
        if(downPressed && !this.collisionPlateForme()){
          this.posY += dy;
        }
      }else if(this.saut){
        if(this.ySaut - this.posY < 64){
          this.posY-= dy;
        }else{
          this.saut = false;
        }
      }else if (!this.collisionPlateForme()) {
        this.posY += dy
      }
      //test echelle
      // if(!this.collisionEchelle()){
      //   console.log("je grimpe pas");
      //   dy = 7;
      // }else{
      //   console.log("je grimpe");
      //   dy = 0;
      //   if(upPressed){
      //     this.posY -= 7;
      //   }
      //   if(downPressed && ){
      //     this.posY +=7;
      //   }
      // }
      
      this.draw()
    }
    collisionCanva () {
      if (leftPressed && this.posX - dx <= 0) {
        this.posX = 0
        return true
      } else if (rightPressed && this.posX >= 480 - 32) {
        this.posX = 480 - 32
        return true
      } else if (upPressed && this.posY <= 0) {
        this.posY = 0
        return true
      } else if (downPressed && this.posY >= 700 - 32) {
        this.posY = 700 - 32
        return true
      }
    }

    collisionEchelle(){
      let grimpe = false
      console.log("début fonction");
      echelles.forEach(echelle => {
        if((this.posX >= echelle.x -24  && this.posX <= echelle.x +24)  && (this.posY >= echelle.y - 24 && this.posY <= echelle.y + 24) ){
          grimpe = true;
          //dy = 0;
          //console.log("je grimpe");
        }//else{
        //   dy =7;
        // }
      });
      return grimpe;
    }

    collisionPlateForme () {
      //console.log(plateFormes)
      let collision = false;
      if(!this.grimpe){
        plateFormes.forEach(plateForme => {
          if(this.posY <= plateForme.y -32 && this.posY >= plateForme.y -32 - dy) {
            if(this.posX >= plateForme.x - 39 && this.posX <= plateForme.x + 25){
              collision = true;
              this.posY = plateForme.y -32;
            }
          }
        });
        if(collision === true){
          this.saut = false;
          this.sautOk = true;
        }
      }
      return collision;
    }
  }
  class PlateForme {
    constructor (i, j) {
      this.x = j * 32 + 16
      this.y = i * 32
      ctx.beginPath()
      ctx.rect(j * 32, i * 32, 32, 32)
      ctx.fillStyle = '#FF0000'
      ctx.fill()
      ctx.closePath()
    }
  }

  class Echelle {
    constructor (i, j) {
      this.x = j * 32 + 16
      this.y = i * 32
      ctx.beginPath()
      ctx.rect(j * 32, i * 32, 32, 32)
      ctx.fillStyle = '#96593f'
      ctx.fill()
      ctx.closePath()
    }
  }

  class ItemsBonus {
    constructor (i, j) {
      this.x = j * 32
      this.y = i * 32
      ctx.drawImage(imageCoeur,this.x,this.y);
    }
  }
  dessinerTerrain()
  setInterval(draw, 20)
})