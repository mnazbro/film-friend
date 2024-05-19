import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";

import type { FC } from "react";
import { RouterLink } from "../components/RouterLink";
import { useAppSelector } from "../hooks";
import { selectVisibleCameras } from "../selectors";
import { BackButton } from "../components/BackButton";

export const CamerasPage: FC = () => {
  const visibleCameras = useAppSelector(selectVisibleCameras);
  return (
    <Stack spacing={1} mt={1}>
      <BackButton />
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
