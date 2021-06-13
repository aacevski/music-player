import { Box, makeStyles, Typography } from "@material-ui/core";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

const useStyles = makeStyles({
  root: {
    color: "white",
    display: "flex",
    width: "full",
    bgcolor: "white",
    padding: "16px 20px 0px 20px",
    marginTop: 16,
    flexDirection: "column",
    overflowY: "scroll",
    flex: 1,
  },
  heading: {
    width: "100%",
    fontSize: "24px",
    fontWeight: "bold",
  },

  tracks: {
    display: "flex",
    alignItems: "center",
    margin: "16px 0",
    width: "100%",
  },
  image: {
    width: "64px",
    borderRadius: 10,
  },
  index: {
    color: "gray",
    fontSize: "14px",
    fontWeight: "bold",
    width: 64,
  },
  artist: {
    color: "gray",
    fontSize: "14px",
  },
});

export default function TopArtists() {
  const { data } = useSWR("/api/top-tracks", fetcher);

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography className={classes.heading}>Top Tracks</Typography>
      {data?.tracks.map((track: any, index: number) => (
        <Box className={classes.tracks} key={index}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width={100}
          >
            <Typography className={classes.index}>{++index}</Typography>
            <img src={track.image} className={classes.image} />
          </Box>
          <Box marginLeft={4}>
            <Typography>{track.title}</Typography>
            <Typography className={classes.artist}>{track.artist}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
