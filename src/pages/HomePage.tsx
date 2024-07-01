import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { RouterLink } from "../components/RouterLink";
import { useAppSelector } from "../hooks/redux";
import {
  selectActiveCamera,
  selectActiveRoll,
  selectAtLeastOneCameraExists,
} from "../selectors";
import { Camera } from "../types";

export const HomePage: FC = () => {
  const activeCamera = useAppSelector(selectActiveCamera);
  const atLeastOneCameraExists = useAppSelector(selectAtLeastOneCameraExists);
  if (activeCamera == null) {
    if (!atLeastOneCameraExists) {
      return <InitialScreen />;
    }

    return <CameraSelectScreen />;
  }

  return <RollSelectScreen activeCamera={activeCamera} />;
};

const InitialScreen: FC = () => {
  return (
    <Box>
      <Typography color="text.primary">Create a camera to start!</Typography>
      <RouterLink to="/camera/new">
        <Button startIcon={<AddIcon />}>New Camera</Button>
      </RouterLink>
    </Box>
  );
};

const CameraSelectScreen: FC = () => {
  return (
    <Box>
      <Typography color="text.primary">Select an active camera</Typography>
      <RouterLink to="/camera/select">
        <Button>Select Camera</Button>
      </RouterLink>
    </Box>
  );
};

type RollSelectScreenProps = {
  activeCamera: Camera;
};

const RollSelectScreen: FC<RollSelectScreenProps> = ({ activeCamera }) => {
  const activeRoll = useAppSelector(selectActiveRoll);
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
