const boxes= document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn  =document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,5,8],
    [1,4,7],
    [2,4,6],
    [0,3,6]
];

//lets create a function to initialize the game
function initGame(){
    currentPlayer ="X";
    gameGrid =["","","","","","","","",""];
    //ui pe empty krne ke liye
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //initialize box with css properties again
        box.classList=`box box${index+1}`;
       
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText =`Current Player - ${currentPlayer}`;
   

}
initGame();


function checkGameOver(){
    let answer ="";

    winningPositions.forEach((position)=>{
        //all three boxes shhould be non empty and have exact same value
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")
        &&(gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])) {


        //check if winner is x
        if(gameGrid[position[0]]==="X"){
            answer="X";
        }
        else{
            answer="O";
        }
         boxes.forEach((box)=>{
            box.style.pointerEvents="none";
         })
        //how we know X/O is winner
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
        }
    });

    // if we have a winner
    if(answer!==""){
        gameInfo.innerText=`Winner Player ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    //when thw match ties
     let fillCount ="0";
     gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
     });

     if(fillCount===9){
        gameInfo.innerText= "GAME TIED !!";
        newGameBtn.classList.add("active");
     }



}

function swapTurn(){
    if(currentPlayer=="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }

  
    //UI UPDATE
    gameInfo.innerText= `Current Player ${currentPlayer}`;

}
function handleClick(idx){
    if(gameGrid[idx]===""){
        boxes[idx].innerText=currentPlayer;
        gameGrid[idx]=currentPlayer;
        boxes[idx].style.pointerEvents="none";
        //swap kro turn 
        swapTurn();
        checkGameOver();
    }

}

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);

    })
})

newGameBtn.addEventListener("click",initGame);