import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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
