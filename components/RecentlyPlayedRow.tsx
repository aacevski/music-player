import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import useSWR from "swr";

import fetcher from "../utils/fetcher";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "35%",
    bgcolor: "white",
    display: "flex",
    overflowX: "scroll",
    marginTop: "16px",
    [theme.breakpoints.down("xs")]: {
      height: "40%",
    },
  },
  card: {
    margin: "0 32px",
    width: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      margin: "0 64px",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "0 80px",
    },
  },
  image: {
    height: "80%",
    borderRadius: 10,
  },
  name: {
    color: "white",
    width: 100,
    textAlign: "center",
    marginTop: "8px",
  },
}));

export default function RecentlyPlayedRow() {
  const classes = useStyles();
  const { data } = useSWR("/api/recently-played", fetcher);

  return (
    <div className={classes.root}>
      {data?.tracks.map((track: any, index: number) => (
        <Box className={classes.card} key={index}>
          <img src={track.image} className={classes.image} />
          <Typography className={classes.name} noWrap>
            {track.name}
          </Typography>
        </Box>
      ))}
    </div>
  );
}
