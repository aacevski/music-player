import { userProfile } from "../../utils/spotify";

export default async function handler(_: any, res: any) {
  const response = await userProfile();

  const user = await response.json();
  const name = user.display_name;
  const profileImage = user.images[0].url;

  return res.status(200).json({
    name,
    profileImage,
  });
}
