
window.addEventListener('DOMContentLoaded',event => {
    console.log('dom complètement chargé')
    let fin = document.querySelector('#fin')
    let score = document.querySelector('#btnScore')
    let scoreEnd = document.querySelector('#btnScore1')
    console.log(fin);
    fin.onclick = gameOver;
    score.onclick = modalScore;
    scoreEnd.onclick = modalScore;
    
    
});
async function gameOver(){
    let repSet = await fetch('?controller=Save&action=saveScore&tag=dcv&score=634', {method: 'GET'});
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
    imgLogo.style.animation = 'dezoom 5s linear';
    if(button == 'gameOverhard'){
        document.querySelector('#endGame').style.display="block";
    }
}