
window.addEventListener('DOMContentLoaded',event => {
    event.preventDefault();
    console.log('dom complètement chargé')
    let fin = document.querySelector('#fin')
    let score = document.querySelector('#btnScore')
    let scoreEnd = document.querySelector('#btnScore1')
    let move = document.querySelector('#moveCanvas')
    console.log(fin);
    fin.onclick = gameOver;
    score.onclick = modalScore;
    scoreEnd.onclick = modalScore;
    move.onclick = moveCanvas;
    
});
async function gameOver(){
    let tag = document.querySelector('#tag').value;
    let score = '';
    let repSet = await fetch(`?controller=Save&action=saveScore&tag=${tag}&score=634`, {method: 'GET'});
    // let reponse = await rep.json();
    console.log(repSet);
}
//     if(repSet.ok){
//         let repGet = await fetch('?controller=Home&action=display&fin=true', {method: 'GET'});
//         console.log(repGet);
//     }
// }
function modalScore(e){
    let element = document.querySelector('#modalScore');
    let imgLogo = document.querySelector('#logo img');
    let button = e.target.className;
    console.log(button)
    element.style.display ="block";
    
    if(button == 'gameOverhard'){
        document.querySelector('#endGame').style.display="block";
    }else{
        imgLogo.style.animation = 'dezoom 5s linear';
    }
}
function moveCanvas(){
    let element = document.querySelector('canvas').closest('div');
    let box = 
    console.log(element);
}