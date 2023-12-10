import { useState } from "react";
import { v4 as getId } from "uuid";
import { Modal, Stack, Chip, Button } from "@mui/material";
import { ModalForm, ModalFormButton, ModalFormInput } from "./modalForm";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { AppDispatch } from "../state/store";
import { addNote, addNotesTags, addTags } from "../state/rootReducer";
import { Note } from "../types/note";
import { Tag } from "../types/tag";
import { NoteTag } from "../types/noteTag";
import { State } from "../types/state";

export const CreateNote = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  const previousTags: Tag[] = useAppSelector((state: State) => state.tags);

  const [note, setNote] = useState<Note>({
    id: "",
    title: "",
  });
  const [newTags, setNewTags] = useState<Tag[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createNote = (): void => {
    dispatch(addNote(note));
    if (newTags) createTags();
  };

  const createTags = (): void => {
    const uniqueTags = newTags
      .map((newTag: Tag) => {
        const existedTag = previousTags.find(
          (previousTag: Tag) => previousTag.id === newTag.id
        );
        if (!existedTag) return newTag;
      })
      ?.filter(Boolean);

    if (uniqueTags.length > 0) dispatch(addTags(uniqueTags));

    createNotesTags();
  };

  const createNotesTags = (): void => {
    const notesTags: NoteTag[] = newTags.map((tag: Tag) => ({
      noteId: note.id,
      tagId: tag.id,
    }));
    dispatch(addNotesTags(notesTags));
  };

  const findTags = (text: string) => {
    const tagRegExp = /#[0-9A-Za-zА-Яа-яё]+/g;
    const tagsArray = text
      .match(tagRegExp)
      ?.filter((item, index, self) => index === self.indexOf(item));
    if (tagsArray) {
      const newTags: Tag[] = tagsArray.map((tagTitle: string) => {
        const existedId = previousTags.find(
          (previousTag: Tag) => previousTag.title === tagTitle
        )?.id;

        return {
          id: existedId ?? getId(),
          title: tagTitle,
        };
      });
      setNewTags(newTags);
    } else {
      setNewTags(null);
    }
  };

  const onTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const text = e.target.value;

    setNote({
      id: note.id === "" ? getId() : note.id,
      title: text,
    });

    findTags(text);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    createNote();
    setOpen(false);
    setNote({ id: "", title: "" });
    setNewTags([]);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Создать заметку
      </Button>
      <Modal open={open} onClose={handleClose}>
        <ModalForm onSubmit={onSubmit}>
          <ModalFormInput
            onChange={onTextChange}
            value={note.title}
            label="Новая заметка"
            multiline
            minRows={8}
            maxRows={12}
          />
          {newTags?.length > 0 && (
            <Stack direction="row" flexWrap="wrap" gap={2}>
              {newTags.map((tag: Tag) => (
                <Chip key={tag.id} label={tag.title} color="primary" />
              ))}
            </Stack>
          )}
          <ModalFormButton type="submit" variant="contained">
            Добавить
          </ModalFormButton>
        </ModalForm>
      </Modal>
    </>
  );
};
