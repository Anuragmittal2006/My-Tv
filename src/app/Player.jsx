import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function Player({ channel, onBack }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!channel) return;

    let hls;

    // Load stream
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(channel.streamUrl);
      hls.attachMedia(videoRef.current);
    } else {
      videoRef.current.src = channel.streamUrl;
    }

    // Mobile hardware back = close player (not app)
    const handleBack = () => {
      onBack();
    };

    window.history.pushState({ player: true }, "");
    window.addEventListener("popstate", handleBack);

    return () => {
      if (hls) hls.destroy();
      window.removeEventListener("popstate", handleBack);
    };
  }, [channel, onBack]);

  return (
    <div>
   

      {/* Pure browser-native video */}
      <video
        ref={videoRef}
        controls
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: "calc(100vh - 40px)",
        }}
      />
    </div>
  );
}
