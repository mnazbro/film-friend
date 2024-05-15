import {
  Button,
  Divider,
  Stack,
  Typography,
  Link,
  List,
  ListItem,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FC } from "react";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import CameraIcon from "@mui/icons-material/Camera";

export const HomePage: FC = () => {
  return (
    <Stack spacing={1}>
      <Typography variant="h2">Welcome!</Typography>
      <Typography variant="body1">
        <b>Photo Tool</b> is a tool I created for making some film-based
        computations and record keeping easier.
      </Typography>
      <Divider />
      <Typography variant="body1">
        Please add suggestions if you find it useful.
      </Typography>
      <List>
        <ListItem>
          <Link component={RouterLink} to="/flash">
            <Button variant="outlined" startIcon={<FlashOnIcon />}>
              Flash
            </Button>
          </Link>
        </ListItem>
        <ListItem>
          <Link component={RouterLink} to="/camera">
            <Button variant="outlined" startIcon={<CameraIcon />}>
              Cameras
            </Button>
          </Link>
        </ListItem>
      </List>
    </Stack>
  );
};
