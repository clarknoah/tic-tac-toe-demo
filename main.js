/* 

Board starts of clear (no one has cllicked anything)

Player 1 clicks on a square

1. Check whether or not square already
   has been clicked 

2. If square has not been clicked, execute function to 
   color square and move to next user's turn 

*/
let winConditions = [
  [0, 1, 2],
  [3, 4, 5], 
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7], 
  [2, 5, 8],
  [2, 4, 6], 
  [0, 4, 8]
];

let resetButton = document.querySelector(".reset-button");
let squares = document.querySelectorAll(".square");
let currentPlayer= document.querySelector(".current-player");
let userTurn = "playerOne";
currentPlayer.innerText = "Player One";

function squareClicked(e){
  let square = e.target;
  console.log(square);
  let alreadyClicked = square.dataset.clicked !== undefined;
  if(alreadyClicked){
    console.log("You must select a different square");
  }else{
    square.dataset.clicked = true;

    if(userTurn=="playerOne"){

      square.classList.add("playerOneClicked")
      checkForWinner("playerOneClicked", "Player One")
      userTurn = "playerTwo";
      currentPlayer.innerText = "Player Two";
    }else if(userTurn=="playerTwo"){

      square.classList.add("playerTwoClicked");
      checkForWinner("playerTwoClicked", "Player Two")
      userTurn = "playerOne"
      currentPlayer.innerText = "Player One";
    }
    
  }
}

function resetGame(){
  console.log("Resetting game");
  currentPlayer.innerText = "Player One";
  squares.forEach(val=>{
    delete val.dataset.clicked;
    val.classList.remove('playerOneClicked');
    val.classList.remove('playerTwoClicked');
  })
}


function checkForWinner(player, name){
 /*Interate through the winConditions object, and return a 
 boolean of whether there is a match
 */
 let allSquaresFilled = checkIfAllClicked();
 let winnerFound = false;
 winConditions.forEach(val=>{
  let square1 = squares[val[0]].classList.contains(player);
  let square2 = squares[val[1]].classList.contains(player);
  let square3 = squares[val[2]].classList.contains(player);
  let playerHasWon = square1 && square2 && square3;
  if(playerHasWon){
    winnerFound = true;
    alert(`${name} has won the game!`);
    setTimeout(function(){
      resetGame();
    },1000)
  }
 })

 if(allSquaresFilled && winnerFound == false){
    alert("The game is a tie, it's over man");
    setTimeout(function(){
      resetGame();
    },1000)
 }

}

function checkIfAllClicked(){
   let allSquaresFilled = true;
   squares.forEach(val=>{
      if(val.dataset.clicked == undefined){
        allSquaresFilled = false;
      }
   })
   return allSquaresFilled;
}

squares.forEach((val, index)=>{
  val.dataset.square = index;
  val.addEventListener('click',squareClicked)
})

resetButton.addEventListener("click", resetGame)



