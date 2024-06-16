import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import type { FC } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setActiveCamera } from "../store/activeSlice";
import { Camera } from "../types";

export const SelectCameraPage: FC = () => {
  const cameras = useAppSelector((state) => state.camera.cameras);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (camera: Camera) => {
    dispatch(setActiveCamera(camera.id));
    navigate("/");
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
