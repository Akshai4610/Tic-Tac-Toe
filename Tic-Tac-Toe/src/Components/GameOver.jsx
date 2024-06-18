export default function GameOver({ winnerIs, rematch}) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winnerIs && <p>{winnerIs} won the Match</p>}
      {!winnerIs && <p>Draw</p>}
      <button onClick={rematch}>Rematch</button>
    </div>
  );
}
