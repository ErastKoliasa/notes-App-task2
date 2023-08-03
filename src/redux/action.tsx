export const DELETE_NOTE = "DELETE_NOTE";
export const ARCHIVE_NOTE = "ARCHIVE_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";
export const ADD_NOTE = "ADD_NOTE";

export interface Note {
  id: number;
  name: string;
  time: string;
  content: string;
  category: string;
  datesMentioned: string[];
  archived: boolean;
}

export interface DeleteNoteAction {
  type: typeof DELETE_NOTE;
  payload: number;
}

export interface ArchiveNoteAction {
  type: typeof ARCHIVE_NOTE;
  payload: number;
}

export interface EditNoteAction {
  type: typeof EDIT_NOTE;
  payload: Note;
}

export interface AddNoteAction {
  type: typeof ADD_NOTE;
  payload: Note;
}

export type ActionTypes =
  | DeleteNoteAction
  | ArchiveNoteAction
  | EditNoteAction
  | AddNoteAction;

export const deleteNote = (id: number): DeleteNoteAction => {
  return {
    type: DELETE_NOTE,
    payload: id,
  };
};

export const archiveNote = (id: number): ArchiveNoteAction => {
  return {
    type: ARCHIVE_NOTE,
    payload: id,
  };
};

export const editNote = (note: Note): EditNoteAction => {
  return {
    type: EDIT_NOTE,
    payload: note,
  };
};

export const addNote = (note: Note): AddNoteAction => {
  return {
    type: ADD_NOTE,
    payload: note,
  };
};
