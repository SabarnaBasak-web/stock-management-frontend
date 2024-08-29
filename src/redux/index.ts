import { combineSlices } from "@reduxjs/toolkit";
import { authenticationSlice } from "./authentication/authenticationSlice";
import { employeeSlice } from "./employee/employeeSlice";
import authenticationSaga from "./authentication/authenticationSaga";
import employeeSaga from "./employee/employeeSaga";
import { all, fork } from "redux-saga/effects";
import { ipSlice } from "./ip/ipSlice";
import ipSaga from "./ip/ipSaga";

export function* rootSaga() {
  yield all([fork(authenticationSaga), fork(employeeSaga), fork(ipSaga)]);
}
export const rootReducer = combineSlices(
  authenticationSlice,
  employeeSlice,
  ipSlice
);
