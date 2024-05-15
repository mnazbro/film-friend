import { List, ListItem, Switch, Typography } from "@mui/material";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setDarkMode } from "../store/appSlice";

export const SettingsPage: FC = () => {
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
