import { useState, type FC, forwardRef, useContext, ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  SwipeableDrawer,
  List,
  Grid,
  ListItem,
  ListItemButton,
  Divider,
  Paper,
  Avatar,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CameraIcon from "@mui/icons-material/Camera";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setDarkMode } from "../store/appSlice";

const RouterLinkWrapper = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  function Link(itemProps, ref) {
    return <RouterLink ref={ref} {...itemProps} role={undefined} />;
  },
);

export const Navigation: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
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
          <Switch
            onChange={(value) => dispatch(setDarkMode(value.target.checked))}
          />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <SwipeableDrawer
        anchor="left"
        open={isMenuOpen}
        onOpen={() => setIsMenuOpen(true)}
        onClose={() => setIsMenuOpen(false)}
      >
        <DrawerContent onSelect={() => setIsMenuOpen(false)} />
      </SwipeableDrawer>
    </>
  );
};

type DrawerContentProps = {
  onSelect: () => void;
};

const DrawerContent: FC<DrawerContentProps> = ({ onSelect }) => {
  return (
    <Paper elevation={0} square>
      <Grid
        container
        alignItems="center"
        spacing={2}
        bgcolor="primary.main"
        p={2}
      >
        <Grid item>
          <Avatar sx={{ bgcolor: "primary.contrastText" }}>
            <CameraIcon color="primary" />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography color="primary.contrastText">Photo Tool</Typography>
        </Grid>
      </Grid>
      <List>
        <NavigationItem url="/" icon={<HomeIcon />} onClick={onSelect}>
          Home
        </NavigationItem>
        <Divider />
        <NavigationItem url="/flash" icon={<FlashOnIcon />} onClick={onSelect}>
          Flash
        </NavigationItem>
        <NavigationItem url="/camera" icon={<CameraIcon />} onClick={onSelect}>
          Camera
        </NavigationItem>
        <NavigationItem
          url="/settings"
          icon={<SettingsIcon />}
          onClick={onSelect}
        >
          Settings
        </NavigationItem>
      </List>
    </Paper>
  );
};

type NavigationItemProps = {
  icon: ReactNode;
  children: ReactNode;
  url: string;
  onClick?: () => void;
};

const NavigationItem: FC<NavigationItemProps> = ({
  icon,
  children,
  url,
  onClick,
}) => {
  return (
    <ListItem>
      <ListItemButton component={RouterLinkWrapper} to={url} onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{children}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
