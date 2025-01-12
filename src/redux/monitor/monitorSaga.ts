import { call, put, takeLatest } from "redux-saga/effects";
import {
  getAllMonitorsList,
  IMonitorListQueryString,
  IMonitorRequestPayload,
  IMonitorResponse,
  registerMonitor,
  setAllMonitors,
  setRowCount,
} from "./monitorSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  getAllRegisteredMonitors,
  registerMonitorService,
} from "../../services/monitorService";

function* registerMonitorSaga(action: PayloadAction<IMonitorRequestPayload>) {
  const response: IMonitorResponse = yield call(
    registerMonitorService,
    action.payload
  );
  if (response.id) {
    const res: { data: IMonitorResponse[]; total: number } = yield call(
      getAllRegisteredMonitors,
      {
        take: 2,
        cursor: 0,
      }
    );
    yield put(setAllMonitors(res.data));
    yield put(setRowCount(res.total));
  }
}

function* getAllMonitorsListSaga(
  action: PayloadAction<IMonitorListQueryString>
) {
  const response: { data: IMonitorResponse[]; total: number } = yield call(
    getAllRegisteredMonitors,
    action.payload
  );
  console.log("@@ reponse", response);
  yield put(setAllMonitors(response.data));
  yield put(setRowCount(response.total));
}

function* monitorSaga() {
  yield takeLatest(registerMonitor, registerMonitorSaga);
  yield takeLatest(getAllMonitorsList, getAllMonitorsListSaga);
}

export default monitorSaga;
