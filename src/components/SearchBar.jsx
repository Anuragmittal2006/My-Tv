export default function SearchBar({ value, onChange, onClose, children }) {
  return (
    <div style={overlayStyle}>
      <div style={boxStyle}>
        <input
          autoFocus
          placeholder="Search channel…"
          value={value}
          onChange={e => onChange(e.target.value)}
          style={inputStyle}
        />
        <button onClick={onClose} style={closeBtn}>✕</button>
      </div>

      {/* 🔽 SEARCH RESULTS WILL LIVE HERE */}
      <div style={resultsStyle}>
        {children}
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.9)",
  zIndex: 9999,
  overflowY: "auto",
};

const boxStyle = {
  display: "flex",
  padding: 16,
  gap: 10,
};

const inputStyle = {
  flex: 1,
  fontSize: 18,
  padding: 12,
  borderRadius: 6,
  border: "none",
  outline: "none",
};

const closeBtn = {
  fontSize: 18,
  padding: "0 12px",
};

const resultsStyle = {
  padding: "0 12px 40px",
};
