window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  //var position personnage
        var posX = 50;
        var posY = 590; 
        var ballRadius = 10;
        //valeurs déplacements
        var dx = 7;
        var dy = 7;
  //contrôles
  var rightPressed = false; //39
  var leftPressed = false; //37
  var upPressed = false; //38
  var downPressed = false; //40
  let joueur;
  function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }
}

document.addEventListener("keydown",keyDownHandler);
document.addEventListener("keyup",keyUpHandler);
  const terrain = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  var cpt = 0;
  function dessinerTerrain () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 22; i++) {
      const ligne = terrain[i]
      let plateForme = []
      let k = 0

      for (let j = 0; j < 15; j++) {
        if (ligne[j] === 1) {
          plateForme[k] = new PlateForme(i, j)
          k++
          //console.log(plateForme)
        } else if (ligne[j] === 3) {
          if(cpt==0){
                  joueur = new Joueur(i, j)
                  cpt++
                }
                else{
                  joueur.setPosition();
                }
          console.log(joueur.posX)
          console.log(joueur.posY)
        }
      }
    }
    
  }
  
  // function genererTile (i, j, type) {
  //   if (type === 1) {
  //     const plateForme = new PlateForme(i, j)
  //   } else if (type === 3) {
  //     if(cpt==0){
  //       joueur = new Joueur(i, j)
  //       cpt++
  //     }
  //     else{
  //       joueur.setPosition();
  //     }
  //     console.log(joueur.posX)
  //     console.log(joueur.posY)
  //   }
  // }

  function draw () {
    // joueur.setPosition();
    dessinerTerrain();
    
  }

  

  class Joueur {
    constructor (i, j) {
      

      // ctx.beginPath()
      // ctx.arc(j * 32 + 16, i * 32, 15, 0, Math.PI * 2, false)
      // ctx.fillStyle = 'green'
      // ctx.fill()
      // ctx.closePath()
      this.dessiner=false;
      if(!this.dessiner){
        console.log("if construct");
        this.posX = j * 32 + 16
        this.posY = i * 32
      }
      console.log(this.dessiner)
      this.dessiner = true;
      console.log(this.dessiner)
      this.draw();
    }

    draw(){
      
      ctx.beginPath()
      ctx.arc(this.posX, this.posY, 15, 0, Math.PI * 2, false)
      ctx.fillStyle = 'green'
      ctx.fill()
      ctx.closePath()
      
    }

    setPosition(){
      console.log("début setPosition");
      if(rightPressed){
        console.log("droite");
        console.log(this.posX);
        this.posX+=dx;
        console.log(this.posX);
    }else if(leftPressed){
      this.posX-=dx;
    }else if(upPressed){
      this.posY-=dy;
        
    }else if(downPressed){
      this.posY+=dy;
    }
    this.draw();
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
  dessinerTerrain();
  setInterval(draw, 20)
})
