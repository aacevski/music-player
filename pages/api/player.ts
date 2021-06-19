import { playerInformation } from "../../utils/spotify";

export default async function handler(_: any, res: any) {
  const response = await playerInformation();

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const player = await response.json();

  return res.status(200).json({ player });
}
