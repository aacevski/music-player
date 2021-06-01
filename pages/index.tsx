import { Box, CssBaseline, makeStyles, Typography } from "@material-ui/core";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: "flex",
    width: "70%",
    height: "85%",
    backgroundColor: "#030203",
    flexDirection: "column",
    borderRadius: 20,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
      borderRadius: 0,
    },
  },

  typography: {
    color: "white",
    paddingTop: theme.spacing(4),
    textAlign: "center",
  },

  sidebar: {
    display: "flex",
    borderRight: "1px solid #141414",
    flexDirection: "row",
    width: "20%",
    height: "100%",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  songPlaying: {
    display: "flex",
    height: "100%",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 32,
    paddingRight: 15,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  songPlayingCover: {
    height: 60,
    objectFit: "cover",
    marginRight: theme.spacing(2),
  },

  songArtist: {
    fontSize: 13,
    color: "gray",
  },

  songPlayingName: {
    color: "white",
    fontWeight: "bold",
  },

  content: {
    display: "flex",
    width: "80%",
    height: "100%",
    borderTopRightRadius: 20,
    [theme.breakpoints.down("sm")]: {
      borderRadius: 0,
    },
  },

  footer: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    backgroundColor: "#1C1C1C",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    [theme.breakpoints.down("sm")]: {
      borderRadius: 0,
    },
  },

  logo: {
    height: 40,
    marginTop: 40,
  },
}));

const IndexPage = () => {
  const classes = useStyles();

  const { data } = useSWR("/api/currently-playing", fetcher, {
    refreshInterval: 10,
  });

  return (
    <>
      <CssBaseline />
      <Box
        display="flex"
        height="100vh"
        bgcolor="#5054AC"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box className={classes.root}>
          <Box flexDirection="row" display="flex" width="100%" height="85%">
            <Box className={classes.sidebar}>
              <img
                src="https://svgshare.com/i/Tta.svg"
                alt="Andrej's Tunes Logo"
                className={classes.logo}
              />
            </Box>
            <Box className={classes.content}>
              <Box></Box>
            </Box>
          </Box>
          <Box flexDirection="row" display="flex" width="100%" height="15%">
            <Box className={classes.footer}>
              <Box className={classes.songPlaying}>
                <img
                  src={data?.albumImageUrl}
                  alt="Album Cover"
                  className={classes.songPlayingCover}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  overflow="hidden"
                  width="100%"
                >
                  <Typography className={classes.songPlayingName} noWrap>
                    {data?.title}
                  </Typography>
                  <Typography className={classes.songArtist} noWrap>
                    {data?.artist}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default IndexPage;
