import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../state/hooks";
import { AppDispatch } from "../state/store";
import {
  removeNote,
  removeNotesTags,
  removeUnusedTags,
  removeUnusedVisibleTags,
} from "../state/rootReducer";
import { Note } from "../types/note";

export const RemoveNote = ({ item }: { item: Note }): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  const onRemove = (): void => {
    dispatch(removeNote(item));
    dispatch(removeNotesTags(item));
    dispatch(removeUnusedTags());
    dispatch(removeUnusedVisibleTags());
  };

  return <DeleteIcon color="primary" onClick={onRemove} />;
};
