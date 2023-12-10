import { Fragment } from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Header } from "./header";
import { useAppSelector } from "../state/hooks";
import { Tag } from "../types/tag";
import { State } from "../types/state";

export const TagsList = (): JSX.Element => {
  const tags: Tag[] = useAppSelector((state: State) => state.tags);

  return (
    <>
      <Header />
      <Box mb={4}>
        <Typography variant="h4" component="h1">
          Все теги
        </Typography>
      </Box>
      {tags.length > 0 ? (
        <List disablePadding>
          {tags.map((tag: Tag) => (
            <Fragment key={tag.id}>
              <ListItem>
                <ListItemText primary={tag.title} />
                <ListItemIcon></ListItemIcon>
                <ListItemIcon></ListItemIcon>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      ) : (
        <Typography variant="body1" component="p" align="center">
          Тегов нет
        </Typography>
      )}
    </>
  );
};
