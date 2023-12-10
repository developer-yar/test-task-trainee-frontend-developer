import { Fragment } from "react";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Header } from "./header";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setVisibleTags } from "../state/rootReducer";
import { State } from "../types/state";
import { Note } from "../types/note";
import { Tag } from "../types/tag";
import { VisibleTag } from "../types/visibleTag";
import { AppDispatch } from "../state/store";

export const FilterByTags = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  const notes: Note[] = useAppSelector((state: State) => state.notes);
  const tags: Tag[] = useAppSelector((state: State) => state.tags);

  const visibleTags: VisibleTag[] = useAppSelector(
    (state: State) => state.visibleTags
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    dispatch(setVisibleTags(value));
  };

  return (
    <>
      <Header />
      <Box mb={4}>
        <Typography variant="h4" component="h1">
          Фильтрация по тегам
        </Typography>
      </Box>
      {tags.length > 0 ? (
        <>
          <Box mb={4}>
            <FormControl>
              {tags.map((tag: Tag) => (
                <FormControlLabel
                  key={tag.id}
                  value={tag.title}
                  control={
                    <Checkbox checked={visibleTags.includes(tag.title)} />
                  }
                  label={tag.title}
                  onChange={handleChange}
                />
              ))}
            </FormControl>
          </Box>
          {visibleTags.length > 0 && (
            <>
              <Box mb={2}>
                <Typography variant="h4" component="h1">
                  Заметки, включающие теги {visibleTags.join(" ")}
                </Typography>
              </Box>
              <List disablePadding>
                {notes.map((note: Note) => {
                  if (
                    visibleTags.find((tagTitle: string) =>
                      note.title.split(" ").includes(tagTitle)
                    )
                  )
                    return (
                      <Fragment key={note.id}>
                        <ListItem>
                          <ListItemText primary={note.title} />
                        </ListItem>
                        <Divider />
                      </Fragment>
                    );
                })}
              </List>
            </>
          )}
        </>
      ) : (
        <Typography variant="body1" component="p" align="center">
          Тегов нет
        </Typography>
      )}
    </>
  );
};
