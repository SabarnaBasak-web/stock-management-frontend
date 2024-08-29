import { createAction, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface AuthenticationState {
  value: number;
  accessToken: string;
  error: string;
}

const initialState: AuthenticationState = {
  value: 0,
  accessToken: "",
  error: "",
};

export const loginUserAction = createAction<ILoginPayload>(
  "authentication/loginUser"
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setLoginError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAccessToken, setLoginError } = authenticationSlice.actions;

export default authenticationSlice.reducer;
