import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { type ReactNode, useMemo } from "react";
import { useAppSelector } from "../hooks/redux";
import type { CameraId, RollId } from "../types";
import { ErrorState } from "../components/ErrorState.tsx";

interface RollPageProps {
  cameraId: CameraId;
  rollId: RollId;
}

export const RollPage = ({ cameraId, rollId }: RollPageProps): ReactNode => {
  const camera = useAppSelector((state) => state.camera.cameras.find((camera) => camera.id === cameraId));
  const roll = useMemo(() => {
    return camera?.rolls.find((roll) => roll.id === rollId);
  }, [camera, rollId]);

  if (roll == null) {
    return <ErrorState title="Roll not found" />;
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
          return <ListItem key={index}>{`f/${frame.aperture?.toString() ?? "UNKNOWN"}`}</ListItem>;
        })}
      </List>
    </Box>
  );
};
