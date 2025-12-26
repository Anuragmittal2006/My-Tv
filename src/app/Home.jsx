import { useEffect, useState } from "react";
import Row from "../components/Row";
import SearchBar from "../components/SearchBar";
import { parseM3U } from "../services/m3uParser";
import { getFavorites, toggleFavorite } from "../services/storage";
import "../styles/netflix.css";
import { usePWAInstall } from "../hooks/usePWAInstall";


export default function Home({ onPlay }) {
  const [channels, setChannels] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
const { canInstall, install } = usePWAInstall();

  useEffect(() => {
    async function load() {
      const favs = await getFavorites();
      const text = await fetch(
        "https://iptv-org.github.io/iptv/index.m3u"
      ).then(r => r.text());

      setChannels(
        parseM3U(text).map(c => ({
          ...c,
          isFavorite: favs.includes(c.id),
        }))
      );
    }
    load();
  }, []);

  const onToggleFav = async id => {
    await toggleFavorite(id);
    setChannels(ch =>
      ch.map(c =>
        c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
      )
    );
  };

  const favorites = channels.filter(c => c.isFavorite);

  const filtered = query
    ? channels.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];
function HomeScroll({ children }) {
    {canInstall && (
  <div style={{ padding: 12, textAlign: "center" }}>
    <button
      onClick={install}
      style={{
        padding: "10px 16px",
        fontSize: 16,
        borderRadius: 8,
        background: "#1db954",
        color: "#000",
        border: "none",
        cursor: "pointer"
      }}
    >
      ⬇️ Install App
    </button>
  </div>
)}

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        background: "#0f0f0f"
      }}
    >
          {/* 🔷 TOP BAR */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 12px",
          background: "#0f0f0f"
        }}
      >
        {/* App icon + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src="/icons/icon-192.png"
            alt="App logo"
            style={{ width: 28, height: 28, borderRadius: 6 }}
          />
          <span style={{ fontSize: 16, fontWeight: 600 }}>
            My TV
          </span>
        </div>
        </div>
      <div style={{ padding: "0 12px 40px" }}>
        {children}
      </div>
    </div>
  );
}

  return (
    <>
      {/* 🔍 Search button */}
   

      {searchOpen && (
  <SearchBar
    value={query}
    onChange={setQuery}
    onClose={() => {
      setSearchOpen(false);
      setQuery("");
    }}
  >
    <Row
      title={`Search results`}
      channels={filtered}
      onPlay={onPlay}
      onToggleFav={onToggleFav}
    />
  </SearchBar>
)}

     {!searchOpen && (
  <HomeScroll>
       <div style={{ textAlign: "top", padding: 12 }}>
        <button onClick={() => setSearchOpen(true)}>🔍</button>
      </div>
    <Row
      title="⭐ My Channels"
      channels={favorites}
      onPlay={onPlay}
      onToggleFav={onToggleFav}
    />

    <Row
      title="📰 News"
      channels={channels.filter(c => c.category === "News")}
      onPlay={onPlay}
      onToggleFav={onToggleFav}
    />

    <Row
      title="🏏 Sports"
      channels={channels.filter(c => c.category === "Sports")}
      onPlay={onPlay}
      onToggleFav={onToggleFav}
    />

    <Row
      title="🎬 Entertainment"
      channels={channels.filter(c => c.category === "Entertainment")}
      onPlay={onPlay}
      onToggleFav={onToggleFav}
    />

    <Row
      title="🎵 Music"
      channels={channels.filter(c => c.category === "Music")}
      onPlay={onPlay}
      onToggleFav={onToggleFav}
    />
  </HomeScroll>
)}

    </>
  );
}
const overlayStyle = {
  position: "fixed",
  inset: 0,

  overflowY: "auto",
};

const resultsStyle = {
  padding: "0 12px 40px",
};
