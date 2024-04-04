import { useState, type FC, forwardRef, useContext } from "react";
import {
  Box,
  Container,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  SwipeableDrawer,
  List,
  Grid,
  ListItem,
  ListItemButton,
  Divider,
  Paper,
  Avatar,
  useTheme,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CameraIcon from "@mui/icons-material/Camera";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { ColorModeContext } from "../context/ColorModeContext";

const RouterLinkWrapper = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  function Link(itemProps, ref) {
    return <RouterLink ref={ref} {...itemProps} role={undefined} />;
  },
);

export const Navigation: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const colorModeContext = useContext(ColorModeContext);
  colorModeContext.toggleColorMode
  return (
    <>
      <AppBar elevation={1}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photo Tool
          </Typography>
          <Switch onChange={colorModeContext.toggleColorMode}/>
        </Toolbar>
      </AppBar>
      <Toolbar />
        <SwipeableDrawer
          anchor="left"
          open={isMenuOpen}
          onOpen={() => setIsMenuOpen(true)}
          onClose={() => setIsMenuOpen(false)}
        >
          <DrawerContent />
        </SwipeableDrawer>


    </>
  );
};

const DrawerContent = () => {
  return (
    <Paper elevation={0} square>
      <Grid
        container
        alignItems={"center"}
        spacing={2}
        bgcolor={"primary.main"}
        p={2}
      >
        <Grid item>
          <Avatar sx={{ bgcolor: "primary.contrastText" }}>
            <CameraIcon color="primary" />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography color={"primary.contrastText"}>Photo Tool</Typography>
        </Grid>
      </Grid>
      <List>
        <ListItem>
          <ListItemButton component={RouterLinkWrapper} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton component={RouterLinkWrapper} to="/flash">
            <ListItemIcon>
              <FlashOnIcon />
            </ListItemIcon>
            <ListItemText>Flash</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
};
