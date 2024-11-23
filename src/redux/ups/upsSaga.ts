import { call, put, takeLatest } from "redux-saga/effects";

import {
  getAllUpsList,
  IUpdateUpsRequestPayload,
  IUpsDetails,
  IUpsListQueryString,
  IUpsRequestPayload,
  IUpsResponse,
  registerUps,
  setAllUps,
  setRowCount,
  updateUps,
  updateUpsDetailsAction,
} from "./upsSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  addNewUps,
  getAllUps,
  updateUpsService,
} from "../../services/upsService";

function* registerNewUps(action: PayloadAction<IUpsRequestPayload>) {
  const response: IUpsDetails = yield call(addNewUps, action.payload);
  if (response.id) {
    const res: { data: IUpsResponse[]; total: number } = yield call(getAllUps, {
      take: 2,
      cursor: 0,
    });
    yield put(setAllUps(res.data));
    yield put(setRowCount(res.total));
  }
}

function* getAllUpsSaga(action: PayloadAction<IUpsListQueryString>) {
  const { payload } = action;
  const res: { data: IUpsResponse[]; total: number } = yield call(getAllUps, {
    ...payload,
  });

  console.log("@@ response", res);
  yield put(setAllUps(res.data));
  yield put(setRowCount(res.total));
}

function* updateUpsDetailsSaga(
  action: PayloadAction<IUpdateUpsRequestPayload>
) {
  const { payload } = action;
  const response: IUpsResponse = yield call(updateUpsService, payload);

  if (response.id) {
    yield put(updateUps(response));
  }
}

function* UpsSaga() {
  yield takeLatest(registerUps, registerNewUps);
  yield takeLatest(getAllUpsList, getAllUpsSaga);
  yield takeLatest(updateUpsDetailsAction, updateUpsDetailsSaga);
}
export default UpsSaga;
