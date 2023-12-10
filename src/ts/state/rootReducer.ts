import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { State } from "../types/state";
import { Note } from "../types/note";
import { Tag } from "../types/tag";
import { NoteTag } from "../types/noteTag";
import { VisibleTag } from "../types/visibleTag";

export const slice = createSlice({
  name: "reducer",
  initialState: initialState,

  reducers: {
    addNote(state: State, action: PayloadAction<Note>) {
      state.notes.push(action.payload);
    },

    editNote(state: State, action: PayloadAction<Note>) {
      state.notes = state.notes.filter((note: Note) => {
        if (note.id === action.payload.id) note.title = action.payload.title;
        return note;
      });
    },

    removeNote(state: State, action: PayloadAction<Note>) {
      state.notes = state.notes.filter(
        (note: Note) => note.id !== action.payload.id
      );
    },

    addTags(state: State, action: PayloadAction<Tag[]>) {
      state.tags.push(...action.payload);
    },

    removeUnusedTags(state: State) {
      state.tags = state.tags
        .map((tag: Tag) => {
          if (
            state.notesTags.find((noteTag: NoteTag) => noteTag.tagId === tag.id)
          )
            return tag;
        })
        .filter(Boolean);
    },

    addNotesTags(state: State, action: PayloadAction<NoteTag[]>) {
      state.notesTags.push(...action.payload);
    },

    removeNotesTags(state: State, action: PayloadAction<Note>) {
      state.notesTags = state.notesTags.filter(
        (noteTag: NoteTag) => noteTag.noteId !== action.payload.id
      );
    },

    setVisibleTags(state: State, action: PayloadAction<VisibleTag>) {
      if (state.visibleTags.find((item: string) => item === action.payload))
        state.visibleTags = state.visibleTags.filter(
          (item: string) => item !== action.payload
        );
      else state.visibleTags.push(action.payload);
    },

    removeUnusedVisibleTags(state: State) {
      state.visibleTags = state.visibleTags
        .map((visibleTag: VisibleTag) => {
          if (state.tags.find((tag: Tag) => tag.title === visibleTag))
            return visibleTag;
        })
        .filter(Boolean);
    },
  },
});

const { actions, reducer } = slice;

export const {
  addNote,
  editNote,
  removeNote,
  addTags,
  removeUnusedTags,
  addNotesTags,
  removeNotesTags,
  setVisibleTags,
  removeUnusedVisibleTags,
} = actions;

export default reducer;
