export function parseM3U(text) {
  const lines = text.split("\n");
  const channels = [];

  let temp = null;

  for (let line of lines) {
    line = line.trim();

    if (line.startsWith("#EXTINF")) {
        
      const name =
        line.match(/,(.*)$/)?.[1]?.trim() || "Unknown";

      const logo =
        line.match(/tvg-logo="([^"]*)"/)?.[1] || "";

      const group =
        line.match(/group-title="([^"]*)"/)?.[1] || "Other";

      temp = {
        id: name.toLowerCase().replace(/\s+/g, "-"),
        name,
        logo,
        category: normalizeCategory(group),
        streamUrl: "",
      };
    }

    else if (line.startsWith("http") && temp) {
      temp.streamUrl = line;
      channels.push(temp);
      temp = null;
    }
  }

  return channels;
}

function normalizeCategory(raw) {
  const val = raw.toLowerCase();

  if (val.includes("news")) return "News";
  if (val.includes("sport")) return "Sports";
  if (val.includes("music")) return "Music";
  if (val.includes("movie") || val.includes("ent"))
    return "Entertainment";

  return null; // ignore junk
}
