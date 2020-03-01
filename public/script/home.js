
window.addEventListener('DOMContentLoaded',event => {
    event.preventDefault();
    console.log('dom complètement chargé')
    let fin = document.querySelector('#fin')
    let score = document.querySelector('#btnScore')
    // let scoreEnd = document.querySelector('#btnScore1')
    // let move = document.querySelector('#moveCanvas')
    console.log(fin);
    fin.onclick = gameOver;
    score.onclick = modalScore;
    // scoreEnd.onclick = modalScore;
    // move.onclick = moveCanvas;
    
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
    let testBox = document.querySelector('#box');
    console.log(testBox);
    // var box = document.querySelector('canvas').closest('div');
    let childBox = testBox.children;
    // let newOrder = new Array(childBox[0],childBox[1],childBox[2],childBox[3]);
    // let intermediaire = childBox;
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
        // box.appendChild(childBox[0]);
        // console.log(childBox[0]);
        // box.appendChild(childBox[1]);
        // console.log(childBox[1]);
        // box.appendChild(childBox[2]);
        // console.log(childBox[2]);
        // box.appendChild(childBox[3]);
        // console.log(childBox[3]);
    }else if(classFCB == 'right'){
        box.style.transform = 'translateZ(-100px) rotateY(-180deg) translateZ(237px) translateX(-478px)';
        childBox[0].removeAttribute('id');
        childBox[1].setAttribute('id','canvas');
        var newOrder = new Array(childBox[2],childBox[3],childBox[0],childBox[1]);
        for (let index = 0; index < 4; index++) {
            box.appendChild(newOrder[index]);
        }
        // box.appendChild(childBox[0]);
        // box.appendChild(childBox[1]);
        // box.appendChild(childBox[2]);
        // box.appendChild(childBox[3]);
    }else if(classFCB == 'left'){
        box.style.transform = 'translateZ(-100px) rotateY(-270deg) translateZ(223px)';
        childBox[0].removeAttribute('id');
        childBox[1].setAttribute('id','canvas');
        var newOrder = new Array(childBox[3],childBox[0],childBox[1],childBox[2]);
        for (let index = 0; index < 4; index++) {
            box.appendChild(newOrder[index]);
        }
        // box.appendChild(childBox[0]);
        // box.appendChild(childBox[1]);
        // box.appendChild(childBox[2]);
        // box.appendChild(childBox[3]);
    }else if(classFCB == 'back'){
        gameOver;
    }
    // box.removeChild(childBox);
    // box.insertBefore(childBox, box.nextSibling);
    // childBox[0] = intermediaire[1];
    // childBox[1] = intermediaire[2];
    // childBox[2] = intermediaire[3];
    // childBox[3] = intermediaire[0];


    // box.insertBefore(childBox[1], box.firstChild);
    console.log(childBox);
    // console.log(newOrderChildBox);
    console.log(classFCB);
}