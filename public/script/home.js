
window.addEventListener('DOMContentLoaded',event => {
    console.log('dom complètement chargé')
    let fin = document.querySelector('#fin')
    console.log(fin);
    fin.addEventListener("click", setScore());
});

async function setScore(){
    let repSet = await fetch('?controller=Save&action=saveScore&tag=dcv&score=634', {method: 'GET'});
    // let reponse = await rep.json();
    console.log(repSet);
    // let retour = reponse[0];
    // console.log(retour);
    // return reponse;
}
async function getScore(){
    let repGet = await fetch('?controller=Home&action=display&fin=true', {method: 'GET'});
    console.log(repGet);
}