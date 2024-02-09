import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notebooks: null,
  notes: null,
  tags: null,
  activeNotebook: null,
};

const userNotableData = createSlice({
  name: "userNotableData",
  initialState,
  reducers: {
    userInitialData: (state, { payload }) => {
      const notebooksList = payload[0].data;
      const notesList = payload[1].data;
      const tagsList = payload[2].data;

      const primaryNotebook = notebooksList.find(
        (notebook) => notebook.primary === true
      );

      state.notebooks = notebooksList;
      state.notes = notesList;
      state.tags = tagsList;
      state.activeNotebook = primaryNotebook._id;

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
    changeActiveNotebook: (state, { payload }) => {
      state.activeNotebook = payload;
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
  },
});

export const {
  userInitialData,
  pushNewNotebook,
  updateTheNotebook,
  deletedNotebook,
  changeActiveNotebook,
  createdNewNote,
  updatedTheNote,
  deleteTheNote,
  createdNewTag,
  updateTheTag,
  deletedTheTag,
} = userNotableData.actions;

export const userNotableDataReducer = userNotableData.reducer;

export const userInitialState = (state) => state.notable;
