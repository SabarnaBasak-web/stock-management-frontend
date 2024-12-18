import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISnackbarInitialState {
  message: string;
  type: AlertColor;
  title: string;
}
export interface ISetSnackbarPayload {
  message: string;
  type: AlertColor;
  title: string;
}
const snackbarInitialState: ISnackbarInitialState = {
  type: "success",
  title: "",
  message: "",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: snackbarInitialState,
  reducers: {
    setSnackbarMessage: (state, action: PayloadAction<ISetSnackbarPayload>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.title = action.payload.title;
    },
    resetSnackbarMessage: (state) => {
      state.message = "";
    },
  },
});

export const { setSnackbarMessage, resetSnackbarMessage } =
  snackbarSlice.actions;
export default snackbarSlice.reducer;
