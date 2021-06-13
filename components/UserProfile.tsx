import { Avatar, makeStyles, Typography, Box } from "@material-ui/core";
import useSWR from "swr";

import fetcher from "../utils/fetcher";

const useStyles = makeStyles((theme: any) => ({
  name: {
    color: "white",
    marginRight: "16px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
      marginRight: "0px",
    },
  },
}));

const UserProfile = ({}) => {
  const classes = useStyles();
  const { data } = useSWR("/api/user-profile", fetcher);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      overflow="hidden"
    >
      <Typography className={classes.name} noWrap>
        {data?.name}
      </Typography>

      <Avatar src={data?.profileImage} />
    </Box>
  );
};

export default UserProfile;
