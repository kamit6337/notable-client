import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postToBackend } from "../../utils/api/userApi";

export const createNote = createAsyncThunk("createNote", async (name) => {
  const note = await postToBackend("/note", {
    notebookName: name,
  });
  return note;
});

const initialState = {
  noteIsCreated: false,
  isLoading: true,
  isError: false,
  errMsg: null,
  message: null,
};

const makeNoteSlice = createSlice({
  name: "makeNoteSlice",
  initialState,
  reducers: {
    toggleNoteCreation: (state, { payload }) => {
      state.noteIsCreated = payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, { payload }) => {
        if (payload?.status === 200) {
          state.message = payload.data.message;
          state.noteIsCreated = true;
        } else {
          state.errMsg = payload.data.message;
          state.noteIsCreated = false;
          state.isError = true;
        }
        state.isLoading = false;
      })
      .addCase(createNote.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { toggleNoteCreation } = makeNoteSlice.actions;

export const makeNoteReducer = makeNoteSlice.reducer;

export const makeNoteInitialState = (state) => state.makeNote;
