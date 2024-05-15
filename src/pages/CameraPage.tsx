import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useAppSelector } from "../store/hooks";

export const CameraPage: FC = () => {
  const { cameras } = useAppSelector((state) => state.cameras);
  return (
    <Box>
      <Typography color="text.primary">
        Contains a list of all your cameras
      </Typography>
      <List>
        {cameras.map((camera, index) => (
          <ListItemButton key={index}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "info.dark" }}>{camera.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText>{camera.name}</ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
