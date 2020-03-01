window.addEventListener('DOMContentLoaded',event => {
    modalScore();
    animationLinear()
    chuteAlea();
    event.preventDefault();
    console.log('dom complètement chargé')
    let fin = document.querySelector('#fin')
    let score = document.querySelector('#btnScore')
    let start = document.querySelector('#start');
    const sonIntro = document.querySelector("#sonIntro");
    const sonEnnemi2 = document.querySelector('#sonEnnemi2');
    // let scoreEnd = document.querySelector('#btnScore1')
    // let move = document.querySelector('#moveCanvas')
    let choriSon = document.querySelector('#chori');
    let choriVertSon = document.querySelector('#choriVert');
    // choriSon.onclick = document.querySelector('#choriSon').play();
    choriVertSon.onclick = ()=>{sonEnnemi2.play();}
    console.log(fin);
    fin.onclick = gameOver;
    score.onclick = modalScore;
    start.onclick = startGame;
    // scoreEnd.onclick = modalScore;
    // move.onclick = moveCanvas;
    document.addEventListener('userproximity', SensorEvent=>{
        console.log(SensorEvent);
        sonIntro.play();
    });
    
});
async function gameOver(){
    let tag = document.querySelector('#tag').value;
    let score = '';
    let repSet = await fetch(`?controller=Save&action=saveScore&tag=${tag}&score=634`, {method: 'GET'});
    // let reponse = await rep.json();
    console.log(repSet);
}
export function modalScore(e){
    let element = document.querySelector('#modalScore');
    let imgLogo = document.querySelector('#logo img');
    let infoGame = document.querySelector('#infoGame');
    let button = e;
    // let audioDuLvl = document.querySelector(`#sonLvL${lvl}`);
    element.style.display ="block";
    infoGame.style.backgroundImage = "url('public/src/VisuelMenu1.png')";
    if(button == 'gameOverhard'){
        document.querySelector('#endGame').style.display="block";
        // document.querySelector('#start').style.display="none";
        infoGame.style.backgroundImage = "url('public/src/gameOver2.png')";
    }else if (button == 'finPause'){
        element.style.display ="none";
        document.querySelector("audio").pause();
    }else if (button == 'pause'){
        document.querySelector("audio").pause();
        sonIntro.play();
    }else{
        imgLogo.style.animation = 'dezoom 5s linear';
    }
}
export function moveCanvas(){
    let testBox = document.querySelector('#box');
    console.log(testBox);
    let childBox = testBox.children;
    console.log(childBox);
    let firstChildBox = testBox.firstElementChild;// penser a vider le canvas 
    let classFCB = firstChildBox.className;
    if(classFCB == 'front'){
        box.style.transform = 'translateZ(-100px) rotateY(-90deg) translateZ(-225px) translateX(-490px)';
        childBox[0].removeAttribute('id');
        childBox[1].setAttribute('id','canvas');
        var newOrder = new Array(childBox[1],childBox[2],childBox[3],childBox[0]);
        for (let index = 0; index < 4; index++) {
            box.appendChild(newOrder[index]);
        }
    }else if(classFCB == 'right'){
        box.style.transform = 'translateZ(-100px) rotateY(-180deg) translateZ(237px) translateX(-478px)';
        childBox[0].removeAttribute('id');
        childBox[1].setAttribute('id','canvas');
        var newOrder = new Array(childBox[2],childBox[3],childBox[0],childBox[1]);
        for (let index = 0; index < 4; index++) {
            box.appendChild(newOrder[index]);
        }
    }else if(classFCB == 'left'){
        box.style.transform = 'translateZ(-100px) rotateY(-270deg) translateZ(223px)';
        childBox[0].removeAttribute('id');
        childBox[1].setAttribute('id','canvas');
        var newOrder = new Array(childBox[3],childBox[0],childBox[1],childBox[2]);
        for (let index = 0; index < 4; index++) {
            box.appendChild(newOrder[index]);
        }
    }else if(classFCB == 'back'){
        gameOver;
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