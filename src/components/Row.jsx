import ChannelCard from "./ChannelCard";

export default function Row({ title, channels, onPlay, onToggleFav }) {
  if (!channels.length) return null;

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-list"  style={{ overscrollBehaviorX: "contain" }} >
        {channels.map(ch => (
          <ChannelCard
            key={ch.id}
            channel={ch}
            onPlay={onPlay}
            onToggleFav={onToggleFav}
          />
        ))}
      </div>
    </div>
  );
}
