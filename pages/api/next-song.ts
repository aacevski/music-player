import { nextSong } from "../../utils/spotify";

export default async function handler(_: any, res: any) {
  const response = await nextSong();

  return response;
}
