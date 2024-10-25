import { call, put, takeLatest } from "redux-saga/effects";
import {
  addNewVendor,
  getVendorsList,
  IVendor,
  IVendorListQueryString,
  IVendorResponse,
  IVendorsListResponse,
  setRowCount,
  setVendorList,
} from "./vendorSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  addNewVendorService,
  getAllVendors,
} from "../../services/vendorService";

function* registerVendor(action: PayloadAction<IVendor>) {
  const response: IVendorResponse = yield call(
    addNewVendorService,
    action.payload
  );

  if (response.id) {
    const res: IVendorsListResponse = yield call(getAllVendors, {
      take: 2,
      cursor: 0,
    });
    console.log("@@ res", res);
    yield put(setVendorList(res.data));
    yield put(setRowCount(res.total));
  }
}
function* fetchAllVendors(action: PayloadAction<IVendorListQueryString>) {
  const response: IVendorsListResponse = yield call(
    getAllVendors,
    action.payload
  );
  yield put(setVendorList(response.data));
  yield put(setRowCount(response.total));
}
function* vendorSaga() {
  yield takeLatest(addNewVendor, registerVendor);
  yield takeLatest(getVendorsList, fetchAllVendors);
  // yield takeLatest(getIps, fetchAllIps);
  // yield takeLatest(updateIpDetails, updateExistingIp);
}
export default vendorSaga;
