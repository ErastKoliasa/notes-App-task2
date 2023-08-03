import {
    Note,
    ActionTypes,
    DELETE_NOTE,
    ARCHIVE_NOTE,
    EDIT_NOTE,
    ADD_NOTE,
  } from "./action";
  
  export interface NotesState {
    notes: Note[];
  }
  
  const initialState: NotesState = {
    notes: [
        {
            id: 1,
            name: "Health",
            time: '2023-07-31 10:30:00',
            content: "I'm gonna have a dentist appointment on the 3/5/2023, I moved it from 5/5/2023",
            category: "Task",
            datesMentioned: ["3/5/2023", "5/5/2023"],
            archived: false,
        },
        {
            id: 2,
            name: "Shopping",
            time: '2023-07-31 12:30:00',
            content: 'Remember to buy groceries tomorrow',
            category: 'Task',
            datesMentioned: [],
            archived: true,
        },
        {
            id: 3,
            name: "Rest",
            time: '2023-07-30 16:15:00',
            content: 'Had a great time at the beach today',
            category: 'Random Thought',
            datesMentioned: [],
            archived: false,
        },
        {
            id: 4,
            name: "New Feature",
            time: '2023-07-29 09:45:00',
            content: 'Working on a new project idea',
            category: 'Idea',
            datesMentioned: [],
            archived: false,
        },
        {
            id: 5,
            name: "Study",
            time: '2023-07-28 14:20:00',
            content: 'Need to prepare for the upcoming presentation',
            category: 'Task',
            datesMentioned: [],
            archived: false,
        },
        {
            id: 6,
            name: "Health",
            time: '2023-07-28 09:00:00',
            content: 'I have a doctor appointment on 2/8/2023',
            category: 'Task',
            datesMentioned: ['2/8/2023'],
            archived: false,
        },
        {
            id: 7,
            name: "New Feature",
            time: '2023-07-27 18:00:00',
            content: 'Thinking about redecorating the living room',
            category: 'Idea',
            datesMentioned: [],
            archived: false,
        },
    ],
  };
  
  export const notesReducer = (
    state = initialState,
    action: ActionTypes
  ): NotesState => {
    switch (action.type) {
      case DELETE_NOTE:
        return {
          ...state,
          notes: state.notes.filter((note) => note.id !== action.payload),
        };
      case ARCHIVE_NOTE:
        return {
          ...state,
          notes: state.notes.map((note) => {
            if (note.id === action.payload) {
              return {
                ...note,
                archived: !note.archived,
              };
            }
            return note;
          }),
        };
      case EDIT_NOTE:
        return {
          ...state,
          notes: state.notes.map((note) => {
            if (note.id === action.payload.id) {
              return action.payload;
            }
            return note;
          }),
        };
      case ADD_NOTE:
        return {
          ...state,
          notes: [...state.notes, action.payload],
        };
      default:
        return state;
    }
  };
  