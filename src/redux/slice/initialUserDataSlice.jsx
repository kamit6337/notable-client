import { createSlice } from "@reduxjs/toolkit";
import { sortString } from "../../utils/javaScript/sortOptionsList";

const initialState = {
  notebooks: [],
  notes: [],
  tags: [],
  primaryNotebook: null,
};

const userNotableData = createSlice({
  name: "userNotableData",
  initialState,
  reducers: {
    userInitialData: (state, { payload }) => {
      let notebooksList = payload[0];
      let notesList = payload[1];
      let tagsList = payload[2];

      notebooksList = sortString(notebooksList);
      notesList = sortString(notesList);
      tagsList = sortString(tagsList);

      const primaryNotebook = notebooksList.find(
        (notebook) => notebook.primary === true
      );

      state.notebooks = notebooksList;
      state.notes = notesList;
      state.tags = tagsList;
      state.primaryNotebook = primaryNotebook;

      return state;
    },
    pushNewNotebook: (state, { payload }) => {
      state.notebooks = [payload, ...state.notebooks];

      return state;
    },
    updateTheNotebook: (state, { payload }) => {
      state.notebooks = state.notebooks.map((notebook) => {
        if (notebook._id === payload._id) {
          return payload;
        }

        return notebook;
      });

      return state;
    },
    deletedNotebook: (state, { payload }) => {
      state.notebooks = state.notebooks.filter(
        (notebook) => notebook._id !== payload
      );

      return state;
    },
    createdNewNote: (state, { payload }) => {
      state.notes = [...state.notes, payload];
      return state;
    },
    updatedTheNote: (state, { payload }) => {
      state.notes = state.notes.map((note) => {
        if (note._id === payload._id) {
          return payload;
        }

        return note;
      });

      return state;
    },
    deleteTheNote: (state, { payload }) => {
      state.notes = state.notes.filter((note) => note._id !== payload);

      return state;
    },
    createdNewTag: (state, { payload }) => {
      state.tags = [...state.tags, payload];
      return state;
    },
    updateTheTag: (state, { payload }) => {
      state.tags = state.tags.map((tag) => {
        if (tag._id === payload._id) {
          return payload;
        }

        return tag;
      });

      return state;
    },
    deletedTheTag: (state, { payload }) => {
      state.tags = state.tags.filter((tag) => tag._id !== payload);
      return state;
    },
    changeThePrimaryNotebook: (state, { payload }) => {
      const { id, changedId } = payload;

      let changedNootebook = null;

      state.notebooks = state.notebooks.map((notebook) => {
        if (notebook._id === id) {
          notebook.primary = false;

          return notebook;
        }

        if (notebook._id === changedId) {
          notebook.primary = true;
          changedNootebook = notebook;

          return notebook;
        }

        return notebook;
      });

      state.primaryNotebook = changedNootebook;

      return state;
    },
  },
});

export const {
  userInitialData,
  pushNewNotebook,
  updateTheNotebook,
  deletedNotebook,
  createdNewNote,
  updatedTheNote,
  deleteTheNote,
  createdNewTag,
  updateTheTag,
  deletedTheTag,
  changeThePrimaryNotebook,
} = userNotableData.actions;

export const userNotableDataReducer = userNotableData.reducer;

export const userInitialState = (state) => state.notable;
