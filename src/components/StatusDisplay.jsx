import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

export default function StatusDisplay() {
  const { turn, canPlay } = useContext(GameContext);
  return <>{canPlay && turn && <p>Turn: {turn}</p>}</>;
}
