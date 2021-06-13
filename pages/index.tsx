import React from "react";
import {
  Box,
  CssBaseline,
  makeStyles,
  Typography,
  CircularProgress,
  LinearProgress,
  Input,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useSWR from "swr";

import fetcher from "../utils/fetcher";
import UserProfile from "../components/UserProfile";
import RecentlyPlayedRow from "../components/RecentlyPlayedRow";
import TopArtists from "../components/TopArtists";

const useStyles = makeStyles((theme) => ({
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
      paddingBottom: 8,
    },
  },

  controls: {
    display: "flex",
    height: "100%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 32,
    paddingRight: 32,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingLeft: 0,
      paddingRight: 0,
      height: "5px",
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
    flexDirection: "column",
    marginTop: "32px",
    padding: 8,
    [theme.breakpoints.down("sm")]: {
      borderRadius: 0,
      width: "100%",
    },
  },

  footer: {
    display: "flex",
    height: "100%",
    width: "100%",
    backgroundColor: "#1C1C1C",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    [theme.breakpoints.down("sm")]: {
      borderRadius: 0,
      flexDirection: "column-reverse",
    },
  },

  logo: {
    height: 40,
    marginTop: 40,
  },

  loadingSpinner: {
    color: "#F50057",
  },

  progressBar: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "5px",
    },
  },

  timeStamp: {
    marginLeft: 10,
    color: "gray",
    fontSize: 13,
    [theme.breakpoints.down("sm")]: { display: "none" },
  },

  input: {
    border: "1.5px solid #151515",
    borderRadius: 10,
    padding: "16px 16px 16px 6px",
    color: "white",
    height: "32px",
    transition: "border 250ms ease-out",
  },

  inputFocused: {
    border: "1.5px solid #F50057",
  },

  userSearchRow: {
    width: "100%",
    display: "flex",
    paddingLeft: "32px",
    paddingTop: "16px",
    paddingRight: "32px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "16px",
      paddingTop: "16px",
      paddingRight: "16px",
    },
  },
}));

const IndexPage = () => {
  const classes = useStyles();

  const convertTime = (progress: any) => {
    let minutes = Math.floor(progress / 60);
    let seconds: any = progress - minutes * 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    progress = minutes + ":" + seconds;
    return progress;
  };

  const { data } = useSWR("/api/currently-playing", fetcher, {
    refreshInterval: 1,
  });

  const [progress, setProgress] = React.useState<any>(
    Math.round(data?.progress_ms / 1000) - 1
  );

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(progress + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [progress]);

  React.useEffect(() => {
    setProgress(Math.round(data?.progress_ms / 1000));
  }, [data?.progress_ms]);

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
              <Box className={classes.userSearchRow}>
                <Box
                  display="flex"
                  width="100%"
                  height="10%"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box width="70%">
                    <Input
                      className={classes.input}
                      classes={{ focused: classes.inputFocused }}
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      }
                      placeholder="Search for sounds, tracks"
                      fullWidth={true}
                      disableUnderline={true}
                    />
                  </Box>
                  <UserProfile />
                </Box>
              </Box>
              <RecentlyPlayedRow />
              <TopArtists />
            </Box>
          </Box>
          <Box flexDirection="row" display="flex" width="100%" height="15%">
            <Box className={classes.footer}>
              <Box className={classes.songPlaying}>
                {!data?.isPlaying ? (
                  <CircularProgress className={classes.loadingSpinner} />
                ) : (
                  <>
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
                  </>
                )}
              </Box>

              <Box className={classes.controls}>
                <LinearProgress
                  color="secondary"
                  variant="determinate"
                  value={
                    !data?.isPlaying
                      ? 0
                      : (progress * 100) / Number(data?.duration_ms / 1000)
                  }
                  className={classes.progressBar}
                />
                <Typography className={classes.timeStamp}>
                  {!data?.isPlaying ? "0:00" : convertTime(progress)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default IndexPage;
