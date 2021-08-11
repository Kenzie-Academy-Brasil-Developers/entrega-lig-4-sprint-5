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

    if(target.childElementCount !== 6){
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
    }
}



createColumns();


columnsElement.forEach((element)=>{
    element.addEventListener('click', addDisc);
 })






