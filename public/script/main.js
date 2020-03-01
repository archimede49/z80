
window.addEventListener('load', () => {

/*---------------------------*/
    modalScore();
    animationLinear()
    chuteAlea();
    event.preventDefault();

    console.log('dom complètement chargé')
    const sonIntro = document.querySelector("#sonIntro");
    const sonEnnemi2 = document.querySelector('#sonEnnemi2');
    const audioG = document.querySelector("audio");
    let fin = document.querySelector('#fin')
    
    let start = document.querySelector('#start');
    let audioLecture =  document.querySelector('#audioLecture');
    audioLecture.onclick = ()=>{sonIntro.play();}
    let audioPause =  document.querySelector('#audioPause');
    audioPause.onclick = ()=>{audioG.pause();}
    let audioStop =  document.querySelector('#audioStop');
    audioStop.onclick = ()=>{audioG.pause();}
    
    // let scoreEnd = document.querySelector('#btnScore1')
    // let move = document.querySelector('#moveCanvas')
    let choriSon = document.querySelector('#chori');
    let choriVertSon = document.querySelector('#choriVert');
    // choriSon.onclick = document.querySelector('#choriSon').play();
    choriVertSon.onclick = ()=>{sonEnnemi2.play();}
    console.log(fin);
    fin.onclick = gameOver;
    
    start.onclick = startGame;
    // scoreEnd.onclick = modalScore;
    // move.onclick = moveCanvas;

/*-----------------------------*/


  var canvas = document.getElementById('canvas')
  var ctx = canvas.getContext('2d')
  
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
  let mechantsVolants = [];
  let casesFin = [];
  let terrain = [];
  let plateFormes;
  let echelles;
  let obstacles;
  let itemsBonus = [];
  let pause = false;
  let interval;
  let niveau = 1;
  //suivi joueur
  let score = 0;
  let vie = 5;

  //déclarations images
  var imageCoeur = new Image();
  imageCoeur.src = 'public/src/coeur.png';
  var imageCoeurTouche = new Image();
  imageCoeurTouche.src = 'public/src/newCoeur.png';

  var imageAil = new Image();
  imageAil.src = 'public/src/ailNoScore.png';
  var imageAilTouche = new Image();
  imageAilTouche.src = 'public/src/ail.png';

  var imagePiment = new Image();
  imagePiment.src = 'public/src/piment.png';
  var imagePimentTouche = new Image();
  imagePimentTouche.src = 'public/src/newPiment.png';

  var imageTomate = new Image();
  imageTomate.src = 'public/src/tomato.png';
  var imageTomateTouche = new Image();
  imageTomateTouche.src = 'public/src/newTomato.png';


  //image feu
  var imageFeu = new Image();
  imageFeu.src = 'public/src/flammeR.png';

  //image echelle
  var imageEchelleLvl1 = new Image();
  imageEchelleLvl1.src = 'public/src/echelle1erNiveau.png';

  var imageEchelleLvl2 = new Image();
  imageEchelleLvl2.src = 'public/src/echelle2emeNiveau.png';

  //image sol
  var imageSol = new Image();
  imageSol.src = 'public/src/sol1.png';

  //image chorizo
  var imageChorizo = new Image();
  imageChorizo.src = 'public/src/chorizoArret.png';

  var imageChorizoMarche = new Image();
  imageChorizoMarche.src = 'public/src/chorizo1erPas.png';

  var imageChorizoMarche2 = new Image();
  imageChorizoMarche2.src = 'public/src/chorizo2emePas.png';

  var imageChorizoMarcheG = new Image();
  imageChorizoMarcheG.src = 'public/src/choriGmarche1.png';

  var imageChorizoMarcheG1 = new Image();
  imageChorizoMarcheG1.src = 'public/src/choriGmarche2.png';

  var imageChorizoArretG = new Image();
  imageChorizoArretG.src = 'public/src/choriGneutre.png';

  var imageChorizoMonte1 = new Image();
  imageChorizoMonte1.src = 'public/src/chorizoMonte1.png';

  var imageChorizoMonte2 = new Image();
  imageChorizoMonte2.src = 'public/src/chorizoMonte2.png'; 

  var imageMechant = new Image();
  imageMechant.src = 'public/src/mechantQuiMarche.png';

  var imageMechantMarcheD1 = new Image();
  imageMechantMarcheD1.src = 'public/src/mechantDmarche1.png';

  var imageMechantMarcheD2 = new Image();
  imageMechantMarcheD2.src = 'public/src/mechantDmarche2.png';

  var imageMechantMarcheG1 = new Image();
  imageMechantMarcheG1.src = 'public/src/mechantGmarche1.png';

  var imageMechantMarcheG2 = new Image();
  imageMechantMarcheG2.src = 'public/src/mechantGmarche2.png';

  var imageMechantVolant = new Image();
  imageMechantVolant.src = 'public/src/abeille.png'; 

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
      arret();
      // Gestion de la suppression
    } else if (e.keyCode === 46) {
      restart(1);
    }
  }

  function interNiveau(){
    
      clearInterval(interval)
      
      ctx.beginPath()
      ctx.rect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
      ctx.fill()
      ctx.closePath()
      pause = true
      let interText = document.querySelector('#interNiveau')
      setTimeout(()=>{
        
      interText.style.backgroundImage = `url('public/src/Visuel${niveau}.png')`;
      interText.style.zIndex = "3";
      }, 1000);
      setTimeout(()=>{
        interText.style.zIndex = "-1";
        interval = setInterval(draw, 50)
      }, 5000);
    
  }

  function arret(){
    if (!pause) {
      clearInterval(interval)
      modalScore('pause');
      ctx.beginPath()
      ctx.rect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
      ctx.fill()
      ctx.closePath()
      pause = true
    } else {
      modalScore('finPause');
      interval = setInterval(draw, 50)
      pause = false
    }
  }
  function restart(niveau){
    clearInterval(interval);
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    joueur = undefined
    // force une nouvelle déclaration du joueur
    cpt = 0
    plateFormes = []
    itemsBonus = []
    echelles = []
    mechants =[];
    mechantsVolants = [];
    if(niveau ==1){
      score = 0
      vie = 3
    }
    
    dessinerTerrain();
    interval = setInterval(draw,50);
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

  //Niveau 1
  //Niveau 1
  terrain[1] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 13, 0, 0, 0, 0, 0, 0, 20, 0, 2, 40, 0, 0, 13],
    [0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 12, 2, 0, 30, 0, 0, 0, 0, 0, 20, 11, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 10, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  //Niveau 2
  terrain[2] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 10, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 13, 0, 0, 0, 0, 0, 0, 20, 0, 2, 0, 0, 11, 0],
    [0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 10, 2, 0, 30, 0, 0, 0, 12, 0, 20, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 3, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  //Niveau 3
  terrain[3] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 13, 0, 0, 0, 0, 0, 0, 20, 0, 2, 0, 0, 0, 11],
    [0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 12, 2, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 10, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  //Niveau 4
  terrain[4] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 13, 0, 0, 0, 0, 0, 0, 20, 0, 2, 0, 0, 0, 0],
    [0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 12, 2, 0, 30, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0],
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
      imgTouche : imageCoeurTouche,
      score : 50
    },
    11 : {
      img : imageAil,
      imgTouche : imageAilTouche,
      score : 15
    },
    12 : {
      img : imagePiment,
      imgTouche : imagePimentTouche,
      score : 15
    },
    13 : {
      img : imageTomate,
      imgTouche : imageTomateTouche,
      score : 15
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

  const tabEnnemisVolants = {
    40: {
      img: imageMechantVolant
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
    let cptFin = 0;
    let cptMechantVolant = 0;
    for (let i = 0; i < 22; i++) {
     
      const ligne = terrain[niveau][i]
      
      for (let j = 0; j < 15; j++) {
        if (ligne[j] === 1) {
          plateFormes[k] = new PlateForme(i, j)
          k++
        } 
        else if(ligne[j] === 2){
          echelles[e] = new Echelle(i,j);
          e++;
        }else if(ligne[j] === 9){
          casesFin[cptFin] = new CaseFin(i,j);
          cptFin++;
        }else if(ligne[j] === 10 || ligne[j] === 11 || ligne[j] === 12 || ligne[j] === 13 || ligne[j] === 20){
          if(cpt === 0){
            itemsBonus[cptItem] = new ItemsBonus(i,j,ligne[j]);
            cptItem++; 
          }
        }else if(ligne[j] === 30){
          if(cpt === 0){
            mechants[cptMechant] = new Mechant(i,j,ligne[j]);
            cptMechant++;
          }
        }else if (ligne[j] === 40) {
          if (cpt === 0) {
            mechantsVolants[cptMechantVolant] = new MechantVolant(i, j, ligne[j])
            cptMechantVolant++
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
      ennemi.setPosition();
    }

    for(const ennemiVolant of mechantsVolants){
      ennemiVolant.draw();
      ennemiVolant.setPosition();
    }
    if(score < 0){
      score = 0;
    }
    ctx.font = "20px Font Retro";
    ctx.fillStyle = "black";
    ctx.fillText(score,5,20);
    ctx.fillText("Santé : "+vie,360,20);

    isGameOver();
  }

  function isGameOver(){
    if(vie === 0 || joueur.posY > 700){
      //appel modal
      modalScore("gameOverhard");
      //clearInterval
      //restart();
    }
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
          if(this.marche == 0){
            ctx.drawImage(imageChorizoMarcheG, this.posX, this.posY);
            this.marche =1;
          }else if (this.marche == 1){
            ctx.drawImage(imageChorizoMarcheG1, this.posX, this.posY);
            this.marche = 0;
          }
        }
        
        else{
        ctx.drawImage(imageChorizo, this.posX, this.posY);
      }
    
    }


    setPosition () {
      this.collisionFin();
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
      this.collisionMechant();
      this.collisionMechantVolant();
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
        if((this.posX >= item.x -24 && this.posX <= item.x +24) && (this.posY >= item.y && this.posY <= item.y + 8) && item.actif){
          // touche = true;
          // console.log("touché");
          if(item.score >= 0){
            score = score + item.score;
            touche = true;
            item.desactiver();
          }
          else if(item.score < 0){
            const date = new Date();
            //console.log(date - item.dateTouche);
            if(date - item.dateTouche > 1000){
              score = score + item.score;
              vie --;
              touche = true;
              item.setNewDate();
              item.desactiver();
            }
            //item.dateTouche
          }
          //console.log(touche);
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
        if((this.posX >= echelle.x - 24  && this.posX <= echelle.x +24)  && (this.posY >= echelle.y - 31 && this.posY <= echelle.y + 24) ){
          grimpe = true;
        }
      });
      if(grimpe){
        this.sautOk = true;
      }
      this.monte = grimpe;
      return grimpe;
    }

    collisionMechant () {
      mechants.forEach(mechant => {
        if ((this.posX >= mechant.posX - 24 && this.posX <= mechant.posX + 24) && (this.posY >= mechant.posY && this.posY <= mechant.posY + 8)) {
          const date = new Date()
          if (date - mechant.dateTouche > 1000) {
            score -= 15;
            vie--;
            mechant.setNewDate()
          }
        }
      })
    }
    collisionMechantVolant () {
      mechantsVolants.forEach(mechant => {
        if ((this.posX >= mechant.posX - 24 && this.posX <= mechant.posX + 24) && (this.posY >= mechant.posY - 8 && this.posY <= mechant.posY + 8)) {
          const date = new Date()
          if (date - mechant.dateTouche > 1000) {
            score -= 15;
            vie--;
            mechant.setNewDate()
          }
        }
      })
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

    collisionFin(){
      casesFin.forEach(caseFin => {
        if((this.posX >= caseFin.x - 32 && this.posX <= caseFin.x) && (this.posY >= caseFin.y && this.posY <= caseFin.y + 8)){
          clearInterval(interval);
          moveCanvas(niveau);
        }
      })
    }

  }

  
  class PlateForme {
    constructor (i, j) {
      this.x = j * 32 
      this.y = i * 32
      ctx.drawImage(imageSol,this.x,this.y);
    }
  }

  class Echelle {
    constructor (i, j) {
      this.x = j * 32 
      this.y = i * 32
      ctx.drawImage(imageEchelleLvl1,this.x,this.y);
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
        ctx.drawImage(this.item.imgTouche,this.x,this.y);
        this.actif = false;

      }
    }

    setNewDate(){
      this.dateTouche = new Date();
    }
  }

  class Mechant {
    constructor (i, j, indiceMechant) {
      this.dx = 3 // vitesse du méchant pas gentil
      this.sensDroit = true
      this.posX = j * 32
      this.posY = i * 32
      this.initX = this.posX
      this.marche = 0;
      this.dateTouche = new Date();
      this.mechant = tabEnnemis[indiceMechant]
      console.log(this.mechant)
      this.draw()
    }
    draw () {
      //ctx.drawImage(imageMechant, this.posX, this.posY);
      if(this.sensDroit){
        if(this.marche == 0){
          this.marche = 1;
          ctx.drawImage(imageMechantMarcheD1,this.posX,this.posY);
        }else if (this.marche == 1){
          this.marche = 0;
          ctx.drawImage(imageMechantMarcheD2,this.posX,this.posY);
        }
      }else{
        if(this.marche == 0){
          this.marche = 1;
          ctx.drawImage(imageMechantMarcheG1,this.posX,this.posY);
        }else if (this.marche == 1){
          this.marche = 0;
          ctx.drawImage(imageMechantMarcheG2,this.posX,this.posY);
        }
      }
    }
    setPosition () {
      if (this.sensDroit) {
        if (this.posX <= this.initX + 32) {          
          this.posX += this.dx
        } else {
          this.posX -= this.dx
          this.sensDroit = false
        }
      } else {
        if (this.posX >= this.initX - 32) { 
          this.posX -= this.dx
        } else {
          this.posX += dx
          this.sensDroit = true
        }
      }
    }

    setNewDate(){
      this.dateTouche = new Date();
    }
  }

  class MechantVolant {
    constructor (i, j, indiceMechant) {
      this.dy = 7 // vitesse du méchant pas gentil
      this.sensHaut = true
      this.posX = j * 32
      this.posY = i * 32
      this.initY = this.posY
      this.dateTouche = new Date()
      this.mechantVolant = tabEnnemisVolants[indiceMechant]
      this.draw()
    }
    draw () {
      ctx.drawImage(this.mechantVolant.img, this.posX, this.posY)
    }
    setPosition () {
      if (this.sensHaut) {
        if (this.posY <= this.initY + 64) {
          this.posY += this.dy
        } else {
          this.posY -= this.dy
          this.sensHaut = false
        }
      } else {
        if (this.posY >= this.initY - 64) {
          this.posY -= this.dy
        } else {
          this.posY += dy
          this.sensHaut = true
        }
      }
    }
    setNewDate () {
      this.dateTouche = new Date()
    }
  }
  class CaseFin{
    constructor(i,j){
      this.x = j*32;
      this.y = i*32;
    }
  }

  dessinerTerrain()
  interval = setInterval(draw, 50)



//---------------CODE HOME.JS

async function gameOver(){
  let tag = document.querySelector('#tag').value;
  
  let repSet = await fetch(`?controller=Save&action=saveScore&tag=${tag}&score=${score}`, {method: 'GET'});
  // let reponse = await rep.json();
  console.log(repSet);
  document.location.reload(true);
}
function modalScore(e){
  let element = document.querySelector('#modalScore');
  let imgLogo = document.querySelector('#logo img');
  let infoGame = document.querySelector('#infoGame');
  let button = e;
  // let audioDuLvl = document.querySelector(`#sonLvL${lvl}`);
  element.style.display ="block";
  infoGame.style.backgroundImage = "url('public/src/VisuelMenu1.png')";
  if(button == 'gameOverhard'){
      document.querySelector('#endGame').style.display="block";
      document.querySelector('#start').style.display="none";
      infoGame.style.backgroundImage = "url('public/src/gameOver2.png')";
  }else if (button == 'finPause'){
      element.style.display ="none";
      audioG.pause();
  }else if (button == 'pause'){
      audioG.pause();
      sonIntro.play();
  }
  else if( button == "win"){
    document.querySelector('#endGame').style.display="block";
    document.querySelector('#start').style.display="none";
    infoGame.style.backgroundImage = "url('public/src/FondVouluFinal.png')";
    document.querySelector('#sonFinGame').play();
  }
  else{
      imgLogo.style.animation = 'dezoom 5s linear';
  }
}
function moveCanvas(){
  // let testBox = document.querySelector('#box');
  // console.log(testBox);
  // let childBox = testBox.children;
  // console.log(childBox);
  // let firstChildBox = testBox.firstElementChild;// penser a vider le canvas 
  // let classFCB = firstChildBox.className;
  
  // if(classFCB == 'front'){
  //     box.style.transform = 'translateZ(-100px) rotateY(-90deg) translateZ(-225px) translateX(-490px)';
  //     childBox[0].removeAttribute('id');
  //     childBox[1].setAttribute('id','canvas');
  //     var newOrder = new Array(childBox[1],childBox[2],childBox[3],childBox[0]);
  //     for (let index = 0; index < 4; index++) {
  //         box.appendChild(newOrder[index]);
  //     }
  // }else if(classFCB == 'right'){
  //     box.style.transform = 'translateZ(-100px) rotateY(-180deg) translateZ(237px) translateX(-478px)';
  //     childBox[0].removeAttribute('id');
  //     childBox[2].setAttribute('id','canvas');
  //     var newOrder = new Array(childBox[2],childBox[3],childBox[0],childBox[1]);
  //     for (let index = 0; index < 4; index++) {
  //         box.appendChild(newOrder[index]);
  //     }
  // }else if(classFCB == 'left'){
  //     box.style.transform = 'translateZ(-100px) rotateY(-270deg) translateZ(223px)';
  //     childBox[0].removeAttribute('id');
  //     childBox[3].setAttribute('id','canvas');
  //     var newOrder = new Array(childBox[3],childBox[0],childBox[1],childBox[2]);
  //     for (let index = 0; index < 4; index++) {
  //         box.appendChild(newOrder[index]);
  //     }
  // }else if(classFCB == 'back'){
  //     //gameOver;
  //     // if(niveau === 4){
  //     //   modalScore("win");
  //     // }
  //     // childBox[0].removeAttribute('id');
  //     // childBox[1].setAttribute('id','canvas');
  //     // var newOrder = new Array(childBox[0],childBox[1],childBox[2],childBox[3]);
  //     // for (let index = 0; index < 4; index++) {
  //     //     box.appendChild(newOrder[index]);
  //     // }
  // }
  if(niveau < 4){
  niveau++;
  restart(niveau);
  interNiveau();
  }else{
    modalScore('win');
  }
}
function startGame(){
  let element = document.querySelector('#modalScore');
  let audio = document.querySelector("#sonLvL1");
  element.style.display ="none";
  audio.play();
}
function animationLinear(){
  let random = Math.random()*20;
  if(random<1){
      random = random+1;
  }
  console.log(random);
  let chori = document.querySelector('#chori');
  let choriVert = document.querySelector('#choriVert');
  chori.style.animation = `moveLinearLeftToRight ${random*5}s linear infinite`;
  choriVert.style.animation = `moveLinearLeftToRight ${random*6}s linear infinite`;
}
function getRandomArbitrary() {
  var random = Math.random() * (1400 - 0) + 0;
  console.log(random);
   return random;
}
function chuteAlea(){
  let chut1 = document.querySelector('#chut1');
  chut1.style.top = '780px';
  chut1.style.transition = '4ms';
}

})