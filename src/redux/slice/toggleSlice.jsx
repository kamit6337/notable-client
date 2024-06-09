import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notelistIcon: {
    bool: false,
  },
  searchForm: {
    bool: false,
  },
  hideSidebars: {
    bool: false,
  },
  settingForm: {
    bool: false,
  },
  createNewNotebook: {
    bool: false,
    update: false,
    name: "",
    id: null,
  },
  createNewTag: {
    bool: false,
    update: false,
    name: "",
    id: null,
  },
  deleteForm: {
    bool: false,
    data: null,
    tag: false,
  },
  isNoteActivated: {
    bool: false,
    data: null,
  },
};

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState,
  reducers: {
    toggleCreateNewNotebook: (state, { payload }) => {
      const { bool, update = false, name, id } = payload;

      if (!bool) {
        state.createNewNotebook = {
          bool: false,
          update: false,
          name: "",
          id: null,
        };
        return state;
      }

      if (!update) {
        state.createNewNotebook.bool = true;
        return state;
      }

      state.createNewNotebook = { bool: true, update: true, name, id };

      return state;
    },
    toggleCreateNewTag: (state, { payload }) => {
      const { bool, update = false, name, id } = payload;

      if (!bool) {
        state.createNewTag = { bool: false, update: false, name: "", id: null };
        return state;
      }

      if (!update) {
        state.createNewTag.bool = true;
        return state;
      }

      state.createNewTag = { bool: true, update: true, name, id };

      return state;
    },
    toggleDeleteForm: (state, { payload }) => {
      const { bool, data, tag } = payload;

      if (!bool) {
        state.deleteForm = { bool: false, data: null, tag: false };

        return state;
      }

      state.deleteForm = { bool, data, tag };
      return state;
    },
    toggleNoteActivation: (state, { payload }) => {
      const { bool, data } = payload;

      if (!bool) {
        state.isNoteActivated = {
          bool: false,
          data: null,
        };
        return state;
      }

      state.isNoteActivated = {
        bool: true,
        data: data,
      };

      return state;
    },
    toggleSettingForm: (state, { payload }) => {
      const { bool } = payload;

      state.settingForm.bool = bool;

      return state;
    },
    toggleHideSidebars: (state, { payload }) => {
      const { bool } = payload;

      state.hideSidebars.bool = bool;

      return state;
    },
    toggleSearchForm: (state, { payload }) => {
      const { bool } = payload;

      state.searchForm.bool = bool;

      return state;
    },
    toggleNoteListIcon: (state, { payload }) => {
      const { bool } = payload;
      state.notelistIcon.bool = bool;
      return state;
    },
  },
});

export const {
  toggleCreateNewNotebook,
  toggleCreateNewTag,
  toggleDeleteForm,
  toggleNoteActivation,
  toggleSettingForm,
  toggleHideSidebars,
  toggleSearchForm,
  toggleNoteListIcon,
} = toggleSlice.actions;

export const toggleReducer = toggleSlice.reducer;

export const toggleState = (state) => state.toggle;
