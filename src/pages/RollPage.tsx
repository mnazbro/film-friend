import { Box, Chip, List, ListItem, Typography } from "@mui/material";
import { useParams } from "@tanstack/react-router";
import { type FC, useMemo } from "react";
import { NonIdealState } from "../components/NonIdealState";
import { useAppSelector } from "../hooks/redux";
import type { CameraId, RollId } from "../types";

export const RollPage: FC = () => {
  const { cameraId, rollId } = useParams({
    from: "/camera/$cameraId/roll/$rollId",
  }) as {
    cameraId: CameraId;
    rollId: RollId;
  };
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
