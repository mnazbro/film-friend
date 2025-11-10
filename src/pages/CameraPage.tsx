import { Box, Chip, List, ListItemButton, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { NonIdealState } from "../components/NonIdealState";
import { RouterLink } from "../components/routing/RouterLink.tsx";
import { useAppSelector } from "../hooks/redux";
import type { CameraId } from "../types";

interface CameraPageProps {
  cameraId: CameraId;
}

export const CameraPage = ({ cameraId }: CameraPageProps): ReactNode => {
  const camera = useAppSelector((state) => state.camera.cameras.find((camera) => camera.id === cameraId));

  if (camera == null) {
    return <NonIdealState title="Camera not found" />;
  }

  return (
    <Box>
      <Typography variant="h4" color="text.primary">
        {camera.name}
      </Typography>
      <Typography color="text.secondary">{camera.description}</Typography>
      <Chip label={camera.filmFormat} />
      {camera.hasLightMeter && <Chip label="Has Light Meter" />}
      <List>
        {camera.rolls
          .filter((roll) => roll.visible)
          .map((roll) => {
            return (
              <RouterLink key={roll.id} to={`/camera/${camera.id}/roll/${roll.id}`}>
                <ListItemButton key={roll.id}>
                  <Typography color="text.primary">{roll.name}</Typography>
                </ListItemButton>
              </RouterLink>
            );
          })}
      </List>
    </Box>
  );
};
