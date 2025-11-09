import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useSnackbar } from "notistack";
import type { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setActiveCamera } from "../store/activeSlice";
import type { Camera } from "../types";

export const SelectCameraPage = (): ReactNode => {
  const cameras = useAppSelector((state) => state.camera.cameras);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = async (camera: Camera) => {
    dispatch(setActiveCamera(camera.id));
    await navigate({ to: "/" });
    enqueueSnackbar({
      message: `${camera.name} is now active`,
      variant: "success",
      autoHideDuration: 1000,
    });
  };

  return (
    <Stack spacing={1} mt={1}>
      <Typography color="text.primary">Select a camera</Typography>
      <List>
        {cameras.map((camera) => (
          <ListItemButton key={camera.id} onClick={() => handleClick(camera)}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "info.dark" }}>{camera.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText>
              <Typography color="text.primary">{camera.name}</Typography>
            </ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Stack>
  );
};
