import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  getAllEmployees,
  getLoggedInUserDetails,
  IEmployeeDetails,
  IEmployeeListQueryString,
  IEmployeesResponse,
  ILoggedInUserDetails,
  IRegisterEmployeeRequestPayload,
  IUpdateEmployeeRequestPayload,
  registerEmployee,
  setEmployeeDetails,
  setEmployeesList,
  setError,
  setTotalCount,
  updateEmployeeAction,
  updateEmployeeDetails,
} from "./employeeSlice";

import {
  fetchAllEmployees,
  loggedInUserDetails,
  registerNewEmployee,
  updateExistingEmployee,
} from "../../services/employeeService";

function* loggedInUserHandler() {
  const userDetails: ILoggedInUserDetails = yield call(loggedInUserDetails);
  if (userDetails) {
    yield put(setEmployeeDetails(userDetails));
  } else {
    yield put(setError("Something went wrong"));
  }
}

function* registerEmployeeHandler(
  action: PayloadAction<IRegisterEmployeeRequestPayload>
) {
  const createdEmployee: IEmployeeDetails = yield call(
    registerNewEmployee,
    action.payload
  );
  if (createdEmployee.id) {
    const res: IEmployeesResponse = yield call(fetchAllEmployees, {
      take: 2,
      cursor: 0,
    });
    yield put(setEmployeesList(res.data));
    yield put(setTotalCount(res.total));
  }
}

function* updateEmployeeHandler(
  action: PayloadAction<IUpdateEmployeeRequestPayload>
) {
  const updatedEmployee: IEmployeeDetails = yield call(
    updateExistingEmployee,
    action.payload
  );
  yield put(updateEmployeeDetails(updatedEmployee));
}

function* getEmployeesList(action: PayloadAction<IEmployeeListQueryString>) {
  const response: IEmployeesResponse = yield call(
    fetchAllEmployees,
    action.payload
  );
  yield put(setEmployeesList(response.data));
  yield put(setTotalCount(response.total));
}

function* employeeSaga() {
  yield takeLatest(getLoggedInUserDetails, loggedInUserHandler);
  yield takeLatest(registerEmployee, registerEmployeeHandler);
  yield takeLatest(updateEmployeeAction, updateEmployeeHandler);
  yield takeLatest(getAllEmployees, getEmployeesList);
}

export default employeeSaga;
