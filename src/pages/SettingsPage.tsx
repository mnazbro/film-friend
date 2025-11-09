import { List, ListItem, Switch, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setDarkMode } from "../store/appSlice";

export const SettingsPage = (): ReactNode => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.app.isDarkMode);
  return (
    <List>
      <ListItem
        secondaryAction={
          <Switch
            onChange={(value) => dispatch(setDarkMode(value.target.checked))}
            checked={isDarkMode}
          />
        }
      >
        <Typography color="text.primary">Enable Dark Mode</Typography>
      </ListItem>
    </List>
  );
};
