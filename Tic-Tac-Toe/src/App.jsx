import { useState } from "react";
import GameBoard from "./Components/GameBoard";
import Players from "./Components/Players";
import Logic from "./Components/Logic";
import { Wining_Combinations } from "./Components/Wining_combinations";
import GameOver from "./Components/GameOver";

function currentStatus(prevBoard) {
  let currentPlayer = "X";
  if (prevBoard.length > 0 && prevBoard[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function winnerDrive(updatedBoard,player){
  let winnerIs = null;
  for (const combination of Wining_Combinations) {
    const firstSquareSymbol =
      updatedBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      updatedBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      updatedBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winnerIs = player[firstSquareSymbol];
    }
  }
  return winnerIs
}


function gameBoardUpdate(initialBoard,updatedGameBoard) {
  const updatedBoard = [...initialBoard.map(array=>[...array])]; //storing initial value that's a null, then update the board by that var for display the board in game board
  for (const turns of updatedGameBoard) {
    //this for loop runs on the render mode,it's used to extract the content and replace the new value into the prev board
    const { playerContainer, player } = turns;
    const { row, col } = playerContainer;
    updatedBoard[row][col] = player;
  }
  return updatedBoard
}

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const playerDetail={  X : 'Player 1', O : 'Player 2'};

export default function App() {
  // const [playerStatus, setPlayerSymbol] = useState("X");
  const [updatedGameBoard, setGameBoard] = useState([]); //game board updating state.
  const[player,setPlayer]= useState(playerDetail)
  
  const activePlayer = currentStatus(updatedGameBoard);
  const updatedBoard=gameBoardUpdate(initialBoard,updatedGameBoard)
  const winnerIs=winnerDrive(updatedBoard,player)
 const draw = updatedGameBoard.length === 9 && !winnerIs;

  function updateStatus(rowIndex, colIndex) {
    // setPlayerSymbol((activePlayer) => (activePlayer === "X" ? "O" : "X"));

    setGameBoard((prevBoard) => {
      const currentPlayer = currentStatus(prevBoard);

      const updatedBoard = [
        {
          playerContainer: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevBoard,
      ];
      return updatedBoard;
    });
  }

  const rematch = () => setGameBoard([]);

  const playerChange=(symbol,newName)=>{
    setPlayer(prev=>{
      return{
        ...prev,
        [symbol] : newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players
            playerName={player.X}
            playerSymbol="X"
            activeStatus={activePlayer === "X" ? "active" : undefined}
            playerChange={playerChange}
          />
          <Players
            playerName={player.O}
            playerSymbol="O"
            activeStatus={activePlayer === "O" ? "active" : undefined}
            playerChange={playerChange}
          />
        </ol>
        {(winnerIs || draw) && (
          <GameOver winnerIs={winnerIs} rematch={rematch} />
        )}
        <GameBoard updateStatus={updateStatus} updatedBoard={updatedBoard} />
      </div>
      <Logic turn={updatedGameBoard} />
    </main>
  );
}
