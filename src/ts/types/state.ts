import { Note } from "./note";
import { Tag } from "./tag";
import { NoteTag } from "./noteTag";
import { VisibleTag } from "./visibleTag";

export type State = {
  notes: Note[];
  tags: Tag[];
  notesTags: NoteTag[];
  visibleTags: VisibleTag[];
};
