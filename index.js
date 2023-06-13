let topHeading = document.getElementById("topHeading");
let boxses = document.querySelectorAll(".box");
let newGameBtn =document.getElementById("newGameBtn");

let currentValue;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function gameInit(){
    currentValue = "X";
    gameGrid = ["","","","","","","","",""];
    boxses.forEach((box, index)=>{
        box.innerHTML ="";
        boxses[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    topHeading.innerText = `Current Player - ${currentValue}`
}
gameInit();

function swapTurn(){
    if(currentValue === 'X'){
        currentValue = 'O';
    }
    else{
        currentValue = 'X';
    };
    topHeading.innerText = `Current Player - ${currentValue}`
}
function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //disable pointer events
                boxses.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                boxses[position[0]].classList.add("win");
                boxses[position[1]].classList.add("win");
                boxses[position[2]].classList.add("win");
            }
    });

    //it means we have a winner
    if(answer !== "" ) {
        topHeading.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        topHeading.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}
boxses.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});
function handleClick(index) {
    if(gameGrid[index] === "" ) {
        boxses[index].innerText = currentValue;
        gameGrid[index] = currentValue;
        boxses[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}
newGameBtn.addEventListener("click", gameInit);
