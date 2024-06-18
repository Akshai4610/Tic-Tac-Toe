export default function GameBoard({updateStatus,updatedBoard}) {
  /* 2nd
  const updatedBoard=initialBoard
  for(const turns of turn){
    const{playerContainer,player}=turns
    const{row,col}=playerContainer
    updatedBoard[row][col]=player
  }
      1st
  const [updatedBoard, setBoard] = useState(initialBoard);
  function btnMarking(rowIndex, colIndex) {
    setBoard((prevBoard) => {
      const updatedArray = [
        ...prevBoard.map((initialArray) => [...initialArray]),
      ];
      updatedArray[rowIndex][colIndex] = currentPlayer;
      return updatedArray;
    });
    updateStatus();
  }*/

  return (
    <ol id="game-board">
      {updatedBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => updateStatus(rowIndex, colIndex)} disabled={playerSymbol !==null}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
