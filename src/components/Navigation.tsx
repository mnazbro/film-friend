import CameraIcon from "@mui/icons-material/Camera";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  AppBar,
  Avatar,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link as TanStackLink } from "@tanstack/react-router";
import {
  type ComponentPropsWithRef,
  type ReactNode,
  forwardRef,
  useCallback,
  useState,
} from "react";

const title = "Film Friend";

const RouterLinkWrapper = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithRef<typeof TanStackLink>
>(function Link(itemProps, ref) {
  return <TanStackLink ref={ref} {...itemProps} role={undefined} />;
});

export const Navigation = (): ReactNode => {
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
        sx={{
          pt: "env(safe-area-inset-top)",
          pl: "env(safe-area-inset-left)",
          pr: "env(safe-area-inset-right)",
        }}
        position="static"
        color="primary"
        enableColorOnDark
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

const DrawerContent = ({ onSelect }: DrawerContentProps): ReactNode => {
  const theme = useTheme();
  return (
    <Paper elevation={0} square>
      <Grid
        container
        alignItems="center"
        spacing={2}
        bgcolor="primary.main"
        p={2}
        pt={`calc(max(env(safe-area-inset-top), ${theme.spacing(2)}))`}
        pl={`calc(max(env(safe-area-inset-left), ${theme.spacing(2)}))`}
      >
        <Grid>
          <Avatar sx={{ bgcolor: "primary.contrastText" }}>
            <CameraIcon color="primary" />
          </Avatar>
        </Grid>
        <Grid size={8}>
          <Typography color="primary.contrastText">{title}</Typography>
        </Grid>
      </Grid>
      <List
        sx={{
          pl: `env(safe-area-inset-left)`,
          pb: `calc(max(env(safe-area-inset-bottom), ${theme.spacing(2)}))`,
        }}
      >
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

const NavigationItem = ({
  icon,
  children,
  url,
  onClick,
}: NavigationItemProps): ReactNode => {
  return (
    <ListItem>
      <ListItemButton component={RouterLinkWrapper} to={url} onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{children}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
