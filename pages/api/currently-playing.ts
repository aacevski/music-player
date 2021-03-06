import { getCurrentlyPlaying } from "../../utils/spotify";

export default async function handler(_: any, res: any) {
  const response = await getCurrentlyPlaying();

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const song = await response.json();
  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists
    .map((_artist: any) => _artist.name)
    .join(", ");
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;
  const duration_ms = song.item.duration_ms;
  const progress_ms = song.progress_ms;

  return res.status(200).json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
    duration_ms,
    progress_ms,
  });
}
