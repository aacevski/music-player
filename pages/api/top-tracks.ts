import { topTracks } from "../../utils/spotify";

export default async (_: any, res: any) => {
  const response = await topTracks();
  const { items } = await response.json();

  const tracks = items.slice(0, 10).map((track: any) => ({
    artist: track.artists.map((_artist: any) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
    album: track.album.name,
    image: track.album.images[0].url,
  }));

  return res.status(200).json({ tracks });
};
