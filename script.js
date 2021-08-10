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
        div.classList.add('column');
        
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


    if(target.childElementCount === 0){
        target.appendChild(disc);
    } else {
        target.insertBefore(disc, target.children[0]);
    }
    
    // variables used to update the map array
    let column = Number(target.dataset.column);
    let row = 6 - target.childElementCount;

    // update map array
    map[row][column] = turn.toString();

    // switch the player turn
    if(turn === 0){
        turn = 1;
    } else {
        turn = 0;
    }

    
    console.clear();
    console.log(`Row: ${row} - Column: ${column}`);

    console.table(map)

    //call victory check
    checkVictory (row, column);
    
}


function checkVictory (line, column){
   console.log(line, column)
   console.log(map)

    let check1  = true; 
    let check2 = true;
    let numberDisc = 0;

    for (counter = 1; check1 === true; counter++){
        let lastDisc = map[line][column];     
        if(line+counter < 6 ){
            if(lastDisc === map[line+counter][column]){
                check1 = true;
                numberDisc = numberDisc + 1;
                console.log(numberDisc);       
            }
        }else{        
            check1 = false;
                for(counter2 = 1; check2 === true; counter2++){
                    if(line-counter2 > 0){     
                        if(lastDisc === map[line-counter2][column]){
                            check2 = true;
                            numberDisc = numberDisc + 1;
                            console.log(numberDisc);   
                        }else{
                            check2 = false;       
                        }
                    }else{
                        check2 = false;
                    }    
                }
        }  
    }   
    if (numberDisc === 3){
        console.log('victory')
    }else{
        check1  = true; 
        check2 = true;
        numberDisc = 0;
    }

    for (counter = 1; check1 === true; counter++){
        let lastDisc = map[line][column];
        if(column+counter < 6 ){
            if(lastDisc === map[line][column+counter]){
                check1 = true;
                numberDisc = numberDisc + 1;
                console.log(numberDisc);
            }
        }else{
                for(counter2 = 1; check2 === true; counter2++){
                    if(column-counter2 > 0){
                        if(lastDisc === map[line][column-counter2]){
                            check2 = true;
                            numberDisc = numberDisc + 1;
                            console.log(numberDisc);
                        }else{
                            check2 = false;
                        }
                    }else{
                        check2 = false;
                    }
                }
            check1 = false;
        }  
    }           
    if (numberDisc === 3){
        console.log('victory')
    }else{
        check1  = true; 
        check2 = true;
        numberDisc = 0;
    }

    for (counter = 1; check1 === true; counter++){
        let lastDisc = map[line][column];
        if(line-counter > 0 && column+counter < 7){
            if(lastDisc === map[line-counter][column+counter]){
                check1 = true;
                numberDisc = numberDisc + 1;
                console.log(numberDisc);
            }
        }else{
            for(counter2 = 1; check2 === true; counter2++){
                if(line+counter2 < 6 && column-counter2 > 0){
                    if(lastDisc === map[line+counter2][column-counter2]){
                        check2 = true;
                        numberDisc = numberDisc + 1;
                        console.log(numberDisc);
                    }else{
                        check2 = false;
                    }
                }else{
                    check2 = false;
                }
            }
            check1 = false
        }
    }
    if (numberDisc === 3){
        console.log('victory')
    }else{
        check1  = true; 
        check2 = true;
        numberDisc = 0;
    }

    for (counter = 1; check1 === true; counter++){
        let lastDisc = map[line][column];
        if(line+counter < 6 && column+counter < 7){
            if(lastDisc === map[line+counter][column+counter]){
                check1 = true;
                numberDisc = numberDisc + 1;
                console.log(numberDisc);
            }
        }else{
            for(counter2 = 1; check2 === true; counter2++){
                if(line-counter2 > 0 && column-counter2 > 0){
                    if(lastDisc === map[line-counter2][column-counter2]){
                        check2 = true;
                        numberDisc = numberDisc + 1;
                        console.log(numberDisc);
                    }else{
                        check2 = false;
                    }
                }else{
                    check2 = false;
                }
            }
            check1 = false
        }
    }
    if (numberDisc === 3){
        console.log('victory')
    }else{
        check1  = true; 
        check2 = true;
        numberDisc = 0;
    }
    

}


createColumns();



columnsElement.forEach((element)=>{
    element.addEventListener('click', addDisc);
 })



