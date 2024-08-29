import { call, put, takeLatest } from "redux-saga/effects";
import { signUpUser } from "../../services/authenticationService";
import {
  ILoginPayload,
  loginUserAction,
  setAccessToken,
  setLoginError,
} from "./authenticationSlice";
import { PayloadAction } from "@reduxjs/toolkit";

function* loginUserHandler(action: PayloadAction<ILoginPayload>) {
  const { status, data } = yield call(signUpUser, action.payload);
  // Todo: need to fix this local storage and global storage
  if (status === 200) {
    localStorage.setItem("access_token", data);
    yield put(setAccessToken(data));
    yield put(setLoginError(""));
  } else {
    localStorage.removeItem("access_token");
    yield put(setAccessToken(""));
    yield put(setLoginError(data));
  }
}

function* authenticationSaga() {
  yield takeLatest(loginUserAction.type, loginUserHandler);
}

export default authenticationSaga;
