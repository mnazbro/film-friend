
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { NonIdealState } from "../components/NonIdealState";
import { RouterLink } from "../components/routing/RouterLink.tsx";
import { useAppSelector } from "../hooks/redux";
import { selectCameraById } from "../selectors/selectCameraById";
import type { CameraId } from "../types";

interface CameraPageProps {
  cameraId: CameraId;
}

export const CameraPage = ({ cameraId }: CameraPageProps): ReactNode => {
  const camera = useAppSelector((state) => selectCameraById(state, cameraId));

  if (camera == null) {
    return <NonIdealState title="Camera not found" />;
  }

  return (
    <Grid container>
      <Grid size={12}>
        <Typography variant="h4" color="text.primary">
          {camera.name}
        </Typography>
        <Typography color="text.secondary">{camera.description}</Typography>
      </Grid>
      <Grid size={12}>
        <Chip label={camera.filmFormat} />
        {camera.hasLightMeter && <Chip label="Has Light Meter" />}
      </Grid>
      <Grid size={12}>
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
      </Grid>
    </Grid>
  );
};
