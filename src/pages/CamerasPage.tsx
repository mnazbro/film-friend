import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  Button,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import type { FC } from "react";
import { RouterLink } from "../components/RouterLink";
import { useAppSelector } from "../hooks/redux";
import { selectVisibleCameras } from "../selectors/selectVisibleCameras";

export const CamerasPage: FC = () => {
  const visibleCameras = useAppSelector(selectVisibleCameras);
  return (
    <Stack spacing={1} mt={1}>
      <RouterLink to="/camera/new">
        <Button fullWidth variant="contained" startIcon={<AddIcon />}>
          New Camera
        </Button>
      </RouterLink>

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
    </Stack>
  );
};
