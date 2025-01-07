import { call, put, takeLatest } from "redux-saga/effects";
import {
  assignProductToEmpAction,
  getAllAssignProductAction,
  IAssignProductData,
  IAssignProductQueryParams,
  IAssignProductToEmpPayload,
  setAssignedProduct,
} from "./assignProductSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  assignProductToEmpService,
  getAssignedProductsListService,
} from "../../services/assignProductService";

function* assignProductToEmpSaga(
  action: PayloadAction<IAssignProductToEmpPayload>
) {
  yield call(assignProductToEmpService, action.payload);
}

function* assignedProductsListSaga(
  action: PayloadAction<IAssignProductQueryParams>
) {
  const allAssignedProducts: IAssignProductData[] = yield call(
    getAssignedProductsListService,
    action.payload
  );

  yield put(setAssignedProduct(allAssignedProducts));
}

function* assignProductSaga() {
  yield takeLatest(assignProductToEmpAction, assignProductToEmpSaga);
  yield takeLatest(getAllAssignProductAction, assignedProductsListSaga);
}
export default assignProductSaga;
