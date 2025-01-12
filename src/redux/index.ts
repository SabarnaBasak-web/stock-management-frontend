import { combineSlices } from "@reduxjs/toolkit";
import { authenticationSlice } from "./authentication/authenticationSlice";
import { employeeSlice } from "./employee/employeeSlice";
import authenticationSaga from "./authentication/authenticationSaga";
import employeeSaga from "./employee/employeeSaga";
import { all, fork } from "redux-saga/effects";
import { ipSlice } from "./ip/ipSlice";
import ipSaga from "./ip/ipSaga";
import { productSlice } from "./product/productSlice";
import productSaga from "./product/productSaga";
import { vendorSlice } from "./vendor/vendorSlice";
import vendorSaga from "./vendor/vendorSaga";
import { upsSlice } from "./ups/upsSlice";

import UpsSaga from "./ups/upsSaga";
import { snackbarSlice } from "./snackbar/snackbarSlice";
import { assignProductSlice } from "./assignProduct/assignProductSlice";
import assignProductSaga from "./assignProduct/assignProductSaga";
import { monitorSlice } from "./monitor/monitorSlice";
import monitorSaga from "./monitor/monitorSaga";

export function* rootSaga() {
  yield all([
    fork(authenticationSaga),
    fork(employeeSaga),
    fork(ipSaga),
    fork(productSaga),
    fork(vendorSaga),
    fork(UpsSaga),
    fork(assignProductSaga),
    fork(monitorSaga),
  ]);
}
export const rootReducer = combineSlices(
  authenticationSlice,
  employeeSlice,
  ipSlice,
  productSlice,
  vendorSlice,
  upsSlice,
  snackbarSlice,
  assignProductSlice,
  monitorSlice
);
