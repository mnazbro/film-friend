import {
  useState,
  type FC,
  forwardRef,
  type ReactNode,
  useCallback,
} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CameraIcon from "@mui/icons-material/Camera";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { styled, useTheme } from "@mui/material";

const title = "Analog Aid";
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const RouterLinkWrapper = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  function Link(itemProps, ref) {
    return <RouterLink ref={ref} {...itemProps} role={undefined} />;
  },
);

export const Navigation: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenuOpen = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);
  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <AppBar
        elevation={1}
        sx={{ top: "env(safe-area-inset-top)" }}
        position="fixed"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Offset />
      <SwipeableDrawer
        anchor="left"
        open={isMenuOpen}
        onOpen={openMenu}
        onClose={closeMenu}
      >
        <DrawerContent onSelect={closeMenu} />
      </SwipeableDrawer>
    </>
  );
};

type DrawerContentProps = {
  onSelect: () => void;
};

const DrawerContent: FC<DrawerContentProps> = ({ onSelect }) => {
  const theme = useTheme();
  return (
    <Paper elevation={0} square>
      <Grid
        container
        alignItems="center"
        spacing={2}
        bgcolor="primary.main"
        p={2}
        pt={`calc(env(safe-area-inset-top) + ${theme.spacing(2)})`}
      >
        <Grid item>
          <Avatar sx={{ bgcolor: "primary.contrastText" }}>
            <CameraIcon color="primary" />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography color="primary.contrastText">{title}</Typography>
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
          Cameras
        </NavigationItem>
        <Divider />
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
