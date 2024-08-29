import { PayloadAction } from "@reduxjs/toolkit";
import {
  getIps,
  IIpDetails,
  IIpDetailsResponse,
  IIpListQueryString,
  IIpRequestPayload,
  registerIp,
  setAllIps,
  setRowCount,
  updateIp,
  updateIpDetails,
} from "./ipSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addNewIp,
  getAllIps,
  updateIpDetailsService,
} from "../../services/ipService";

function* registerNewIp(action: PayloadAction<IIpRequestPayload>) {
  const response: IIpDetails = yield call(addNewIp, action.payload);
  if (response.id) {
    const res: IIpDetailsResponse = yield call(getAllIps, {
      take: 2,
      cursor: 0,
    });
    yield put(setAllIps(res.data));
    yield put(setRowCount(res.total));
  }
}

function* updateExistingIp(action: PayloadAction<IIpDetails>) {
  const response: IIpDetails = yield call(
    updateIpDetailsService,
    action.payload
  );
  yield put(updateIp(response));
}

function* fetchAllIps(action: PayloadAction<IIpListQueryString>) {
  const response: IIpDetailsResponse = yield call(getAllIps, action.payload);
  yield put(setAllIps(response.data));
  yield put(setRowCount(response.total));
}
function* ipSaga() {
  yield takeLatest(registerIp, registerNewIp);
  yield takeLatest(getIps, fetchAllIps);
  yield takeLatest(updateIpDetails, updateExistingIp);
}
export default ipSaga;
