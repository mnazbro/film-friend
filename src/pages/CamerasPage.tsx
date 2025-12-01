import AddIcon from "@mui/icons-material/Add";
import HelpIcon from "@mui/icons-material/Help";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { RouterLink } from "../components/routing/RouterLink.tsx";
import { useAppSelector } from "../hooks/redux";
import { selectVisibleCameras } from "../selectors/selectVisibleCameras";
import { selectAtLeastOneCameraExists } from "../selectors/selectAtLeastOneCameraExists.ts";
import { NonIdealState } from "../components/NonIdealState.tsx";

export const CamerasPage = (): ReactNode => {
  const atLeastOneCamera = useAppSelector(selectAtLeastOneCameraExists);
  if (!atLeastOneCamera) {
    return (
      <NonIdealState
        title="No cameras found"
        icon={<HelpIcon />}
        action={
          <RouterLink to="/camera/new">
            <Button variant="contained">Add First Camera</Button>
          </RouterLink>
        }
      />
    );
  }
  return (
    <Stack spacing={1} mt={1}>
      <RouterLink to="/camera/new">
        <Button fullWidth variant="contained" startIcon={<AddIcon />}>
          New Camera
        </Button>
      </RouterLink>
      <CamerasList />
    </Stack>
  );
};

const CamerasList = (): ReactNode => {
  const visibleCameras = useAppSelector(selectVisibleCameras);
  return (
    <List>
      {visibleCameras.map((camera) => (
        <RouterLink key={camera.name} to={`/camera/${camera.id}`}>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "info.dark" }}>{camera.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText>
              <Typography color="text.primary">{camera.name}</Typography>
            </ListItemText>
          </ListItemButton>
        </RouterLink>
      ))}
    </List>
  );
};
