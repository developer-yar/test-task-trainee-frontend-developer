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
import { CreateNote } from "./createNote";
import { EditNote } from "./editNote";
import { RemoveNote } from "./removeNote";
import { useAppSelector } from "../state/hooks";
import { Note } from "../types/note";
import { State } from "../types/state";

export const NotesList = (): JSX.Element => {
  const notes: Note[] = useAppSelector((state: State) => state.notes);

  return (
    <>
      <Header />
      <Box mb={4}>
        <Typography variant="h4" component="h1">
          Мои заметки
        </Typography>
      </Box>
      <Box mb={4}>
        <CreateNote />
      </Box>
      {notes.length > 0 ? (
        <List disablePadding>
          {notes.map((note: Note) => (
            <Fragment key={note.id}>
              <ListItem>
                <ListItemText primary={note.title} />
                <ListItemIcon>
                  <EditNote item={note} />
                </ListItemIcon>
                <ListItemIcon>
                  <RemoveNote item={note} />
                </ListItemIcon>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      ) : (
        <Typography variant="body1" component="p" align="center">
          Заметок нет
        </Typography>
      )}
    </>
  );
};
