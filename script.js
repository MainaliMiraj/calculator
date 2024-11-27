console.log('Happy developing ✨')



let screenValue='0'
function  buttonClick(value){
   if(isNaN(parseInt(value))){ //
       handleSymbol()
   }else{
       handleNumber()
   }
    
}

function handleNumber(number){
    console.log('number')
}

function handleSymbol(symbol){
    console.log('symbol')
    
}

function init(){
    document
        .querySelector('.calc-buttons')
        .addEventListener('click',function(event){
        buttonClick(event.target.innerText);
            
    })
}

init()