import { useState } from "react";
import Home from "./app/Home";
import Player from "./app/Player";

export default function App() {
  const [playing, setPlaying] = useState(null);

  return (
    <div className="app-container">
      {playing ? (
        <Player channel={playing} onBack={() => setPlaying(null)} />
      ) : (
        <Home onPlay={setPlaying} />
      )}
    </div>
  );
}
