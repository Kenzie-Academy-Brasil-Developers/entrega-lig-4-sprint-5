// ===== Global variables ======

const container = document.querySelector('.container');
let columnsElement;
let discColor = ['black', 'red'];
let turn = 0;

// referecial map array
let map = [
    ["E", "E", "E", "E", "E", "E", "E"],
    ["E", "E", "E", "E", "E", "E", "E"],
    ["E", "E", "E", "E", "E", "E", "E"],
    ["E", "E", "E", "E", "E", "E", "E"],
    ["E", "E", "E", "E", "E", "E", "E"],
    ["E", "E", "E", "E", "E", "E", "E"],
]


// ===== Main functions =====

const createColumns = () => {

    for(let col = 0; col < 7; col++){
        let div = document.createElement('div');
        div.classList.add('column', 'black_turn');
        
        div.dataset.column = col;

        container.appendChild(div);
    
    }

    columnsElement = document.querySelectorAll('.column');
}


const addDisc = (event) =>{

    

    const target = event.currentTarget;
    const disc = document.createElement('div');


    disc.classList.add('disc');
    disc.dataset.col = target.dataset.column;
    disc.dataset.row = 5 - target.childElementCount; 
    disc.style.backgroundColor = discColor[turn];

    if(target.childElementCount !== 6){
    if(target.childElementCount === 0){
        target.appendChild(disc);
    } else {
        target.insertBefore(disc, target.children[0]);
    }
}

    // variables used to update the map array
    let column = Number(target.dataset.column);
    let row = 6 - target.childElementCount;

    // update map array
    map[row][column] = turn.toString();

    // switch the player turn and change classes
    if(turn === 0){
        turn = 1;
    } else {
        turn = 0;
    }

    columnsElement.forEach((element)=>{
        element.classList.remove('red_turn', 'black_turn');
        element.classList.add(discColor[turn]+'_turn');
    })

    
    
    console.clear();
    console.log(`Row: ${row} - Column: ${column}`);

    console.table(map)

    //call check victory
    checkVictoryColumn (row, column);
    

}

//function check draw
function checkDraw(){
    const lastLine = map[0];
    const draw = lastLine.every(elem => elem !=='E');
    
    if (draw === true){
        console.log ('empate');
    }
}

//function check victory
function checkVictoryColumn (line, column){

    let lastDisc = map[line][column]; 
    let check1  = true; 
    let check2 = true;
    let numberDisc = 0;

    for (counter = 1; check1 === true; counter++){     
        if(line+counter < 6 && lastDisc === map[line+counter][column]){
                check1 = true;
                numberDisc = numberDisc + 1;                  
        }else{        
            for(counter2 = 1; check2 === true; counter2++){
                if(line-counter2 >= 0 && lastDisc === map[line-counter2][column]){     
                    check2 = true;
                    numberDisc = numberDisc + 1;                           
                }else{
                    check2 = false;       
                }
            }    
            check1 = false;
        }
    }  
    checkWnner(numberDisc, lastDisc);
    checkVictoryLine  (line, column)
}


function checkVictoryLine  (line, column){

    let lastDisc = map[line][column]; 
    let check1  = true; 
    let check2 = true;
    let numberDisc = 0;

    for (counter = 1; check1 === true; counter++){
        if(column+counter < 7 && lastDisc === map[line][column+counter]){
                check1 = true;
                numberDisc = numberDisc + 1;              
        }else{
            for(counter2 = 1; check2 === true; counter2++){
                if(column-counter2 >= 0 && lastDisc === map[line][column-counter2]){ 
                    check2 = true;
                    numberDisc = numberDisc + 1;                    
                }else{
                    check2 = false;
                }
            }
            check1 = false;
        }  
    }           
    checkWnner(numberDisc, lastDisc);
    checkVictoryCrescentDiagonal (line, column)
}

function checkVictoryCrescentDiagonal (line, column){

    let lastDisc = map[line][column]; 
    let check1  = true; 
    let check2 = true;
    let numberDisc = 0;
    
        for (counter = 1; check1 === true; counter++){
            if(line-counter >= 0 && column+counter < 7 && lastDisc === map[line-counter][column+counter]){
                    check1 = true;
                    numberDisc = numberDisc + 1;             
            }else{
                for(counter2 = 1; check2 === true; counter2++){
                    if(line+counter2 < 6 && column-counter2 >= 0 && lastDisc === map[line+counter2][column-counter2]){
                        check2 = true;
                        numberDisc = numberDisc + 1;                    
                    }else{
                        check2 = false;
                    }
                }
                check1 = false
            }
        }
        checkWnner(numberDisc, lastDisc);
        checkVictoryDecrescentDiagonal (line, column)
}

function checkVictoryDecrescentDiagonal (line, column){

    let lastDisc = map[line][column]; 
    let check1  = true; 
    let check2 = true;
    let numberDisc = 0;

    for (counter = 1; check1 === true; counter++){
        if(line+counter < 6 && column+counter < 7 && lastDisc === map[line+counter][column+counter]){
                check1 = true;
                numberDisc = numberDisc + 1;               
        }else{
            for(counter2 = 1; check2 === true; counter2++){
                if(line-counter2 >= 0 && column-counter2 >= 0 && lastDisc === map[line-counter2][column-counter2]){
                        check2 = true;
                        numberDisc = numberDisc + 1;
                }else{
                    check2 = false;
                }
            }
            check1 = false
        }
    }
    checkWnner(numberDisc, lastDisc);
    checkDraw();
}


// check winner

function checkWnner(numberDisc, lastDisc){    
    if (numberDisc === 3 && lastDisc === '0'){
        console.log('victory black');
    }
    if (numberDisc === 3 && lastDisc === '1'){
        console.log('victory red');
    }
}

createColumns();


columnsElement.forEach((element)=>{
    element.addEventListener('click', addDisc);
 })
