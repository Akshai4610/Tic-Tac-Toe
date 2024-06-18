import { useState } from "react";

export default function Players({
  playerName,
  playerSymbol,
  activeStatus,
  playerChange,
}) {
  const [editedBtn, setEnable] = useState(false);
  const [editedName, setName] = useState(playerName);
  
  function btnEditClicked() {
    setEnable((enable) => !enable);
    if (editedBtn) {
      playerChange(playerSymbol, editedName);
    }
  }

  function editPlayerName(event) {
    setName(event.target.value);
  }
  return (
    <li className={activeStatus}>
      <span className="player">
        {editedBtn ? (
          <input
            type="text"
            className="player-name"
            defaultValue={editedName}
            required
            onChange={editPlayerName}
          />
        ) : (
          <span className="player-name">{editedName}</span>
        )}
        <span className="player-symbol">{playerSymbol}</span>
      </span>
      <button onClick={btnEditClicked}>{editedBtn ? "Save" : "Edit"}</button>
    </li>
  );
}
