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
  let joueur
  let plateFormes
  
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
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  var cpt = 0
  function dessinerTerrain () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    plateFormes = []
    let k = 0
    for (let i = 0; i < 22; i++) {
      const ligne = terrain[i]
      
      for (let j = 0; j < 15; j++) {
        if (ligne[j] === 1) {
          plateFormes[k] = new PlateForme(i, j)
          k++
        } else if (ligne[j] === 3) {
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
      this.draw()
    }
    draw () {
      ctx.beginPath()
      ctx.rect(this.posX, this.posY, 32, 32)
      ctx.fillStyle = 'green'
      ctx.fill()
      ctx.closePath()
    }
    setPosition () {
      if (!this.collisionCanva()) {
        if (rightPressed) {
          this.posX += dx
        } else if (leftPressed) {
          this.posX -= dx
        } else if (upPressed) {
          this.posY -= dy
        } else if (downPressed) {
          this.posY += dy
        }
      }
      if (!this.collisionPlateForme()) {
        this.posY += dy
      }
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
    collisionPlateForme () {
      console.log(plateFormes)
      let collision = false;
      plateFormes.forEach(plateForme => {
        if(this.posY <= plateForme.y -32 && this.posY >= plateForme.y -32 - dy){
          if(this.posX >= plateForme.x - 32 && this.posX < plateForme.x + 32){
            collision = true;
          }
        }
      });

      

      //Test collision plateforme base
      // if(this.posY <= plateFormes[0].y -32 && this.posY >= plateFormes[0].y -32 - dy){
      //   if(this.posX >= plateFormes[0].x - 32 && this.posX < plateFormes[0].x + 32){
      //     collision = true;
      //   }
      // }
      console.log(collision);
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
  dessinerTerrain()
  setInterval(draw, 20)
})