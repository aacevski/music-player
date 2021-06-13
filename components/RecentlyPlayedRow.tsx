import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import useSWR from "swr";

import fetcher from "../utils/fetcher";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "30%",
    bgcolor: "white",
    display: "flex",
    overflowX: "scroll",
    marginTop: "16px",
  },
  image: {
    height: "90%",
  },
});

export default function RecentlyPlayedRow() {
  const classes = useStyles();
  const { data } = useSWR("/api/recently-played", fetcher);

  return (
    <div className={classes.root}>
      {data?.tracks.map((track: any) => (
        <Box margin="0 32px">
          <img src={track.image} className={classes.image}></img>
        </Box>
      ))}
    </div>
  );
}
