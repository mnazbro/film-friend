import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import ListItemButton from "@mui/material/ListItemButton";

import type { FC } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useParams } from "react-router";
import { CameraId } from "../types";
import { NonIdealState } from "../components/NonIdealState";
import List from "@mui/material/List";
import { RouterLink } from "../components/RouterLink";
import { BackButton } from "../components/BackButton";

export const CameraPage: FC = () => {
  const { cameraId } = useParams<{ cameraId: CameraId }>();
  const camera = useAppSelector((state) =>
    state.camera.cameras.find((camera) => camera.id === cameraId),
  );

  if (camera == null) {
    return (
      <>
        <BackButton />
        <NonIdealState title="Camera not found" />
      </>
    );
  }

  return (
    <Box>
      <BackButton />
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
              <RouterLink
                key={roll.id}
                to={`/camera/${camera.id}/roll/${roll.id}`}
              >
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
