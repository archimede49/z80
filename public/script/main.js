window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  
  // var position personnage
  var posX = 50
  var posY = 590
  var ballRadius = 10
  // valeurs déplacements
  var dx = 8
  var dy = 8
  // contrôles
  var rightPressed = false // 39
  var leftPressed = false // 37
  var upPressed = false // 38
  var downPressed = false // 40
  let joueur;
  let mechants = [];
  let plateFormes;
  let echelles;
  let obstacles;
  let itemsBonus = [];
  let pause = false;
  
  //déclarations images
  var imageCoeur = new Image();
  imageCoeur.src = 'public/src/coeur.png';

  //image feu
  var imageFeu = new Image();
  imageFeu.src = 'public/src/flammeR.png';

  //image echelle
  var imageEchelleLvl1 = new Image();
  imageEchelleLvl1.src = 'public/src/echelle1erNiveau.png';

  var imageEchelleLvl2 = new Image();
  imageEchelleLvl2.src = 'public/src/echelle2emeNiveau.png';

  //image chorizo
  var imageChorizo = new Image();
  imageChorizo.src = 'public/src/chorizoArret.png';

  var imageChorizoMarche = new Image();
  imageChorizoMarche.src = 'public/src/chorizo1erPas.png';

  var imageChorizoMarche2 = new Image();
  imageChorizoMarche2.src = 'public/src/chorizo2emePas.png';

  var imageChorizoMonte1 = new Image();
  imageChorizoMonte1.src = 'public/src/chorizoMonte1.png';

  var imageChorizoMonte2 = new Image();
  imageChorizoMonte2.src = 'public/src/chorizoMonte2.png'; 

  var imageMechant = new Image();
  imageMechant.src = 'public/src/mechantQuiMarche.png'

  //background
  var imageLvl1 = new Image();
  imageLvl1.src = 'public/src/newFondCuisine.png';
  ctx.drawImage(imageLvl1,0,0);


  function keyDownHandler (e) {
    if (e.keyCode == 39) {
      rightPressed = true
    } else if (e.keyCode == 37) {
      leftPressed = true
    } else if (e.keyCode == 38) {
      upPressed = true
    } else if (e.keyCode == 40) {
      downPressed = true
    }else if (e.keyCode === 32) {
      if (!pause) {
        clearInterval(interval)
        ctx.beginPath()
        ctx.rect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.fill()
        ctx.closePath()
        pause = true
      } else {
        interval = setInterval(draw, 20)
        pause = false
      }
      // Gestion de la suppression
    } else if (e.keyCode === 46) {
      joueur = undefined
      // force une nouvelle déclaration du joueur
      cpt = 0
      plateFormes = undefined
      itemsBonus = undefined
      echelles = undefined
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
  // const terrain = [
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  //   [0, 10, 0, 0, 0, 0, 0, 0, 20, 0, 2, 0, 0, 0, 0],
  //   [0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
  //   [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 10, 2, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0],
  //   [0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  //   [0, 3, 0, 0, 0, 10, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  //   [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  // ]

  const terrain = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 10, 0, 0, 0, 0, 0, 0, 20, 0, 2, 0, 0, 0, 0],
    [0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 10, 2, 0, 30, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 10, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  const tabItems ={
    10 : {
      img : imageCoeur,
      score : 50
    }, 
    20 : {
      img : imageFeu,
      score : -15
    }  
  };

  const tabEnnemis = {
    30 : {
      img : imageMechant
    }
  }

  var cpt = 0
  function dessinerTerrain () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    plateFormes = []
    echelles = []
    
    let k = 0;
    let e = 0;
    let cptItem = 0;
    let cptMechant = 0;
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
        }else if(ligne[j] === 10 || ligne[j] === 20){
          if(cpt === 0){
            itemsBonus[cptItem] = new ItemsBonus(i,j,ligne[j]);
            cptItem++; 
          }
        }else if(ligne[j] === 30){
          if(cpt === 0){
            mechants[cptMechant] = new Mechant(i,j,ligne[j]);
            cptMechant++;
          }
        }else if (ligne[j] === 3) {
          if (cpt === 0) {
            joueur = new Joueur(i, j)
            //cpt++
          }
        }
      }
    }
    cpt++
    joueur.setPosition();
  }
  function draw () {
    dessinerTerrain()
    for(const itemBonus of itemsBonus){
      itemBonus.draw();
    }
    for(const ennemi of mechants){
      ennemi.draw();
    }
    //console.log(itemsBonus);
  }
  class Joueur {
    constructor (i, j) {
      this.posX = j * 32
      this.posY = i * 32
      this.monte;
      this.saut = false; // saut en cours
      this.ySaut = 0; // posY du saut
      this.sautOk = true; // saut autorisé
      this.marche = 0; 
      this.draw();
    }
    draw () {
      //console.log(this.marche);
      
      
      if(this.monte){
        if(this.marche == 0){
          ctx.drawImage(imageChorizoMonte1,this.posX,this.posY);
          this.marche = 1;
        }else if(this.marche == 1){
          ctx.drawImage(imageChorizoMonte2,this.posX,this.posY);
          this.marche = 0;
        }
      }else if(rightPressed){
          if(this.marche == 0){
            ctx.drawImage(imageChorizoMarche, this.posX, this.posY);
            this.marche =1;
          }else if (this.marche == 1){
            ctx.drawImage(imageChorizoMarche2, this.posX, this.posY);
            this.marche = 0;
          }
        }
        else if(leftPressed){
          ctx.drawImage(imageChorizoMarche, this.posX, this.posY);
        }
        
        else{
        ctx.drawImage(imageChorizo, this.posX, this.posY);
      }
      
    }


    setPosition () {
      if (!this.collisionCanva()) {
        if (rightPressed) {
          this.posX += dx
        } else if (leftPressed) {
          this.posX -= dx
        } 

        if (upPressed) {
          if(!this.saut && this.sautOk ){
            this.saut = true;
            this.ySaut = this.posY;
            this.sautOk = false;
          }
        }
      }
      this.collisionItem();
      if(this.collisionEchelle()){
        if(upPressed){
          this.posY -= dy;
        }
        if(downPressed && !this.collisionPlateForme()){
          this.posY += dy;
        }
      }else if(this.saut){
        //alert('saut');
        if(this.ySaut - this.posY < 48){
          this.posY-= dy;
        }else{
          this.saut = false;
        }
      }else if (!this.collisionPlateForme()) {
        this.posY += dy
      }
      this.draw()
    }

    collisionItem(){
      let touche = false;
      //console.log(itemsBonus);
      
      itemsBonus.forEach(item => {
        if((this.posX >= item.x -24 && this.posX <= item.x +24) && (this.posY >= item.y -32 && this.posY <= item.y + 32)){
          // touche = true;
          // console.log("touché");
          if(item.score >= 0){
            touche = true;
            item.desactiver();
          }
          else if(item.score < 0){
            const date = new Date();
            //console.log(date - item.dateTouche);
            if(date - item.dateTouche > 1000){
              touche = true;
              item.setNewDate();
              item.desactiver();
            }
            //item.dateTouche
          }
          console.log(touche);
        }
      });
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
      echelles.forEach(echelle => {
        if((this.posX >= echelle.x - 40  && this.posX <= echelle.x +24)  && (this.posY >= echelle.y - 31 && this.posY <= echelle.y + 24) ){
          grimpe = true;
        }
      });
      if(grimpe){
        this.sautOk = true;
      }
      this.monte = grimpe;
      return grimpe;
    }

    collisionPlateForme () {
      let collision = false;
      if(!this.grimpe){
        plateFormes.forEach(plateForme => {
          if(this.posY <= plateForme.y -32 && this.posY >= plateForme.y -32 - dy) {
            if(this.posX > plateForme.x - 32 && this.posX < plateForme.x + 32){
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
      this.x = j * 32 +16
      this.y = i * 32
      ctx.drawImage(imageEchelleLvl1,this.x - 16,this.y);
    }
  }

  class ItemsBonus {
    constructor (i, j, indiceItem) {
      this.x = j * 32
      this.y = i * 32
      this.item = tabItems[indiceItem];
      this.score = this.item.score;
      this.dateTouche = new Date();
      //ctx.drawImage(this.item.img,this.x,this.y);
      this.actif = true;
      this.draw();
    }
    draw(){
      if(this.actif){
        ctx.drawImage(this.item.img,this.x,this.y);
      }
    }
    desactiver(){
      if(this.score > 0){
        this.actif = false;

      }
    }

    setNewDate(){
      this.dateTouche = new Date();
    }
  }

  class Mechant {
    constructor (i,j,indiceMechant){
      this.posX = j * 32;
      this.posY = i * 32;
      this.mechant = tabEnnemis[indiceMechant];
      console.log(this.mechant);
      this.draw();
    }
    draw(){
      ctx.drawImage(imageMechant,this.posX,this.posY);
    }
  }
  dessinerTerrain()
  let interval = setInterval(draw, 50)
})