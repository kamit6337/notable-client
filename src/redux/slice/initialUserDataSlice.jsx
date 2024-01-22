import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFromBackend } from "../../utils/api/userApi";

export const fetchNotebooks = createAsyncThunk("fetchNotebooks", async () => {
  const notebooks = await getFromBackend("/notebook");
  return notebooks;
});

export const fetchNotes = createAsyncThunk("fetchNotes", async () => {
  const notes = await getFromBackend("/note");
  return notes;
});

export const fetchTags = createAsyncThunk("fetchTags", async () => {
  const tag = await getFromBackend("/tag");
  return tag;
});
export const fetchShortcut = createAsyncThunk("fetchShortcut", async () => {
  const shortcut = await getFromBackend("/shortcut");
  return shortcut;
});

const initialState = {
  notebooks: {
    isloading: true,
    isError: true,
    errMsg: null,
    data: null,
  },
  notes: {
    isloading: true,
    isError: false,
    errMsg: null,
    data: null,
  },
  tags: {
    isloading: true,
    isError: false,
    errMsg: null,
    data: null,
  },
  shortcuts: {
    isloading: true,
    isError: false,
    errMsg: null,
    data: null,
  },
};

const initialUserDataSlice = createSlice({
  name: "initialUserDataSlice",
  initialState,
  extraReducers: (builder) => {
    // WORK: INITIAL NOTEBOOKS DATA
    builder
      .addCase(fetchNotebooks.pending, (state) => {
        state.notebooks.isloading = true;
      })
      .addCase(fetchNotebooks.fulfilled, (state, { payload }) => {
        if (payload?.status === 200) {
          console.log("notebook", payload);
          state.notebooks.data = payload.data.data;
          state.notebooks.isError = false;
          state.notebooks.isloading = false;
        } else {
          state.notebooks.errMsg = payload.data.message;
          state.notebooks.isError = true;
          state.notebooks.isloading = false;
        }
      })
      .addCase(fetchNotebooks.rejected, (state) => {
        state.notebooks.isError = true;
        state.notebooks.isloading = false;
      });

    // WORK: INITIAL NOTES DATA
    // .addCase(fetchNotes.pending, (state) => {
    //   state.notes.isloading = true;
    // })

    // .addCase(fetchNotes.fulfilled, (state, { payload }) => {
    //   if (payload?.status === 200) {
    //     state.notes.data = payload.data.data;
    //   state.notes.isError = false;
    //   } else {
    //     state.notes.errMsg = payload.data.message;
    //     state.notes.isError = true;
    //   }
    //   state.notes.isloading = false;

    // })
    // .addCase(fetchNotes.rejected, (state) => {
    //   state.notes.isloading = false;

    //   state.notes.isError = true;
    // })

    // // WORK: INITIAL TAGS DATA
    // .addCase(fetchTags.pending, (state) => {
    //   state.tags.isloading = true;
    // })

    // .addCase(fetchTags.fulfilled, (state, { payload }) => {
    //   if (payload?.status === 200) {
    //     state.tags.data = payload.data.data;
    //   state.tags.isError = false;

    //   } else {
    //     state.tags.errMsg = payload.data.message;
    //     state.tags.isError = true;
    //   }

    //   state.tags.isloading = false;
    // })
    // .addCase(fetchTags.rejected, (state) => {
    //   state.tags.isloading = false;
    //   state.tags.isError = true;
    // })

    // // WORK: INITIAL SHORTCUT DATA
    // .addCase(fetchShortcut.pending, (state) => {
    //   state.shortcuts.isloading = true;
    // })

    // .addCase(fetchShortcut.fulfilled, (state, { payload }) => {
    //   if (payload?.status === 200) {
    //     state.shortcuts.data = payload.data.data;
    //   state.shortcuts.isError = false;

    //   } else {
    //     state.shortcuts.errMsg = payload.data.message;
    //     state.shortcuts.isError = true;
    //   }

    //   state.shortcuts.isloading = false;
    // })
    // .addCase(fetchShortcut.rejected, (state) => {
    //   state.shortcuts.isloading = false;
    //   state.shortcuts.isError = true;
    // });
  },
});

export const initialUserDataReducer = initialUserDataSlice.reducer;

export const notebooksInitialState = (state) => state.initialUserData.notebooks;
export const notesInitialState = (state) => state.initialUserData.notes;
export const tagsInitialState = (state) => state.initialUserData.tags;
export const shortcutsInitialState = (state) => state.initialUserData.shortcuts;
