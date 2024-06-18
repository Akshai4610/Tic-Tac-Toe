export default function Log({turn}){
    return (
        <ol id="log">
            {turn.map(turn=><li key={`${turn.playerContainer.row}${turn.playerContainer.col}`}>{turn.player}selected{turn.playerContainer.row},{turn.playerContainer.col}</li>)}
        </ol>
    )
}