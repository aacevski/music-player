import React from "react";
import { Slider, makeStyles, Box } from "@material-ui/core";
import useSWR from "swr";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";

import { setVolume } from "../utils/spotify";
import fetcher from "../utils/fetcher";

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 32,
    paddingLeft: 32,
    width: 250,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  volumeSlider: {
    color: "#F50057",
    marginLeft: 15,
  },

  controlButton: {
    color: "white",
  },
}));

const VolumeSlider = ({}) => {
  const classes = useStyles();
  const { data } = useSWR("/api/player", fetcher);
  const [volumePercent, setVolumePercent] = React.useState<number | number[]>(
    data?.player.device.volume_percent
  );

  React.useEffect(() => {
    setVolumePercent(data?.player.device.volume_percent);
  }, [data?.player.device.volume_percent]);

  const handleVolumeChange = (
    _event: React.ChangeEvent<{}>,
    newVolumeValue: number | number[]
  ) => {
    setVolumePercent(newVolumeValue);
    setVolume(newVolumeValue);
  };

  return (
    <Box className={classes.root}>
      {volumePercent == 0 ? (
        <VolumeOffIcon className={classes.controlButton} />
      ) : (
        <VolumeUpIcon className={classes.controlButton} />
      )}
      <Slider
        value={volumePercent}
        onChange={handleVolumeChange}
        aria-labelledby="continuous-slider"
        className={classes.volumeSlider}
      />
    </Box>
  );
};

export default VolumeSlider;
