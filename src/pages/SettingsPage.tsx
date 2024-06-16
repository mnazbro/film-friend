import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Switch from "@mui/material/Switch";
import type { FC } from "react";
import { setDarkMode } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

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
