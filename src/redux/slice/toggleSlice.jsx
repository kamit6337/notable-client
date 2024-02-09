import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  },
});

export const { toggleCreateNewNotebook, toggleCreateNewTag, toggleDeleteForm } =
  toggleSlice.actions;

export const toggleReducer = toggleSlice.reducer;

export const toggleState = (state) => state.toggle;
