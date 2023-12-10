import { useEffect, useState } from "react";
import { v4 as getId } from "uuid";
import {
  Modal,
  TextField as Input,
  Button as _Button,
  Chip,
  Stack,
} from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";
import { HighlightWithinTextarea } from "react-highlight-within-textarea";
import { ModalForm, ModalFormButton } from "./modalForm";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { AppDispatch } from "../state/store";
import {
  addNotesTags,
  addTags,
  editNote,
  removeNotesTags,
  removeUnusedTags,
  removeUnusedVisibleTags,
} from "../state/rootReducer";
import { Note } from "../types/note";
import { Tag } from "../types/tag";
import { State } from "../types/state";
import { NoteTag } from "../types/noteTag";

export const EditNote = ({ item }: { item: Note }): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  const previousTags: Tag[] = useAppSelector((state: State) => state.tags);

  const [note, setNote] = useState<Note>(item);
  const [updatedTags, setUpdatedTags] = useState<Tag[] | null>([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    findTags(note.title);
  }, []);

  const EditNote = (): void => {
    dispatch(editNote(note));
    updateTags();
  };

  const updateTags = (): void => {
    const uniqueTags = updatedTags
      .map((updatedTag: Tag) => {
        const existedTag = previousTags.find(
          (previousTag: Tag) => previousTag.id === updatedTag.id
        );
        if (!existedTag) return updatedTag;
      })
      ?.filter(Boolean);

    if (uniqueTags.length > 0) dispatch(addTags(uniqueTags));

    updateNotesTags();
  };

  const updateNotesTags = (): void => {
    dispatch(removeNotesTags(note));
    const notesTags: NoteTag[] = updatedTags.map((tag: Tag) => ({
      noteId: note.id,
      tagId: tag.id,
    }));
    dispatch(addNotesTags(notesTags));
    dispatch(removeUnusedTags());
    dispatch(removeUnusedVisibleTags());
  };

  const findTags = (text: string): void => {
    const tagRegExp = /#[0-9A-Za-zА-Яа-яё]+/g;
    const tagsArray = text
      .match(tagRegExp)
      ?.filter((item, index, self) => index === self.indexOf(item));
    if (tagsArray) {
      const updatedTags: Tag[] = tagsArray.map((tagTitle: string) => {
        const existedId = previousTags.find(
          (previousTag: Tag) => previousTag.title === tagTitle
        )?.id;

        return {
          id: existedId ?? getId(),
          title: tagTitle,
        };
      });
      setUpdatedTags(updatedTags);
    } else {
      setUpdatedTags(null);
    }
  };

  const onTextChange: any = (value: string) => {
    setNote({
      id: note.id,
      title: value,
    });

    findTags(value);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    EditNote();
    setOpen(false);
  };

  return (
    <>
      <ModeIcon color="primary" onClick={handleOpen} />
      <Modal open={open} onClose={handleClose}>
        <ModalForm onSubmit={onSubmit}>
          <HighlightWithinTextarea
            value={note.title}
            highlight={/#[0-9A-Za-zА-Яа-яё]+/g}
            onChange={onTextChange}
          />
          <ModalFormButton type="submit" variant="contained">
            Обновить
          </ModalFormButton>
          {updatedTags?.length > 0 && (
            <Stack direction="row" flexWrap="wrap" gap={2}>
              {updatedTags.map((tag: Tag) => (
                <Chip key={tag.id} label={tag.title} color="primary" />
              ))}
            </Stack>
          )}
        </ModalForm>
      </Modal>
    </>
  );
};
