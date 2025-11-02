import { Box, Chip, List, ListItem, Typography } from "@mui/material";
import { type ReactNode, useMemo } from "react";
import { NonIdealState } from "../components/NonIdealState";
import { useAppSelector } from "../hooks/redux";
import type { CameraId, RollId } from "../types";

type RollPageProps = {
  cameraId: CameraId;
  rollId: RollId;
};

export const RollPage = ({ cameraId, rollId }: RollPageProps): ReactNode => {
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
