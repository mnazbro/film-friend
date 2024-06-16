import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import { RouterLink } from "../components/RouterLink";
import { useAppSelector } from "../hooks/redux";
import {
  selectActiveCamera,
  selectActiveRoll,
  selectAtLeastOneCameraExists,
} from "../selectors";

export const HomePage: FC = () => {
  const activeCamera = useAppSelector(selectActiveCamera);
  const activeRoll = useAppSelector(selectActiveRoll);
  const atLeastOneCameraExists = useAppSelector(selectAtLeastOneCameraExists);
  if (activeCamera == null) {
    if (!atLeastOneCameraExists) {
      return (
        <Box>
          <Typography color="text.primary">
            Create a camera to start!
          </Typography>
          <RouterLink to="/camera/new">
            <Button startIcon={<AddIcon />}>New Camera</Button>
          </RouterLink>
        </Box>
      );
    }

    return (
      <Box>
        <Typography color="text.primary">Select an active camera</Typography>
        <RouterLink to="/camera/select">
          <Button>Select Camera</Button>
        </RouterLink>
      </Box>
    );
  }

  return (
    <Stack spacing={1}>
      <Typography variant="body1" color="text.primary">
        Current Camera is {activeCamera.name}
      </Typography>
      {activeRoll == null ? (
        <RouterLink to={`/camera/${activeCamera.id}/roll/new`}>
          <Button>Add a new roll</Button>
        </RouterLink>
      ) : (
        <Typography>{activeRoll.name}</Typography>
      )}
    </Stack>
  );
};
