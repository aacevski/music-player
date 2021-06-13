import { recentlyPlayed } from "../../utils/spotify";

export default async function handler(_: any, res: any) {
  const response = await recentlyPlayed();

  const { items } = await response.json();

  const tracks = items.slice(0, 10).map((track: any) => ({
    artist: track.track.album.artists
      .map((_artist: any) => _artist.name)
      .join(", "),
    name: track.track.album.name,
    image: track.track.album.images[0].url,
  }));

  return res.status(200).json({ tracks });
}
