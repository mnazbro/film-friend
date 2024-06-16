import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import { useMemo, type FC } from "react";
import { useAppSelector } from "../hooks/redux";
import { useParams } from "react-router";
import { CameraId, RollId } from "../types";
import { NonIdealState } from "../components/NonIdealState";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export const RollPage: FC = () => {
  const { cameraId, rollId } = useParams<{
    cameraId: CameraId;
    rollId: RollId;
  }>();
  const camera = useAppSelector((state) =>
    state.camera.cameras.find((camera) => camera.id === cameraId),
  );
  const roll = useMemo(() => {
    return camera?.rolls.find((roll) => roll.id === rollId);
  }, [camera, rollId]);

  if (roll == null) {
    return (
      <>
        <NonIdealState title="Roll not found" />
      </>
    );
  }

  return (
    <Box>
      <Typography variant="h4" color="text.primary">
        {roll.name}
      </Typography>
      <Typography color="text.secondary">{roll.description}</Typography>
      <Chip label={roll.format} />
      <List>
        {roll.frames.map((frame, index) => {
          return <ListItem key={index}>{`f/${frame.aperture}`}</ListItem>;
        })}
      </List>
    </Box>
  );
};
