export default function ChannelCard({ channel, onPlay, onToggleFav }) {
  return (
    <div className="card">
      <span
        onClick={e => {
          e.stopPropagation();
          onToggleFav(channel.id);
        }}
         className="fav-btn"
      >
        {channel.isFavorite ? "⭐" : "☆"}
      </span>

      <div onClick={() => onPlay(channel)}>
        <img src={channel.logo} alt={channel.name} />
        
      </div>
    </div>
  );
}
