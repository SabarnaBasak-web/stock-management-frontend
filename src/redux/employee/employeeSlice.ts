import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIpDetails } from "../ip/ipSlice";

export interface IEmployeeListQueryString {
  take: number;
  cursor: number;
}
export interface ILoggedInUserDetails {
  id: number;
  username: string;
  active: boolean;
  roleId: number;
  employeeId: string;
  employee: IEmployeeDetails;
}
export interface IEmployeesResponse {
  data: IEmployeeDetails[];
  total: number;
}

export interface IEmployeeDetails {
  id: number;
  name: string;
  designation: string;
  cell: string;
  floorNumber: string;
  mobileNumber: string;
  empId: string;
  active: boolean;
  imagePath: string;
  ipId: number;
  Ip?: IIpDetails;
}

export interface IRegisterEmployeeRequestPayload {
  name: string;
  designation: string;
  cell: string;
  floorNumber: string;
  mobileNumber: string;
  empId: string;
  active: boolean;
}

export interface IUpdateEmployeeRequestPayload {
  id: string;
  name: string;
  designation: string;
  cell: string;
  floorNumber: string;
  mobileNumber: string;
  empId: string;
  active: boolean;
}

export interface IEmployeeState {
  employeeDetails: ILoggedInUserDetails;
  error: string;
  registeredEmployees: IEmployeeDetails[];
  totalCount: number;
}

const initialState: IEmployeeState = {
  employeeDetails: {
    id: 0,
    username: "",
    active: false,
    roleId: 0,
    employeeId: "",
    employee: {
      id: 0,
      name: "",
      designation: "",
      cell: "",
      floorNumber: "",
      mobileNumber: "",
      empId: "",
      active: false,
      imagePath: "",
      ipId: 0,
    },
  },
  error: "",
  registeredEmployees: [],
  totalCount: 0,
};

export const registerEmployee = createAction<IRegisterEmployeeRequestPayload>(
  "registerNewEmployee"
);
export const updateEmployeeAction =
  createAction<IUpdateEmployeeRequestPayload>("updateEmployee");
export const getAllEmployees =
  createAction<IEmployeeListQueryString>("getAllEmployees");
export const getLoggedInUserDetails = createAction("loggedInUserDetails");

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeeDetails: (
      state,
      action: PayloadAction<ILoggedInUserDetails>
    ) => {
      state.employeeDetails = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setRegisteredEmployees: (
      state,
      action: PayloadAction<IEmployeeDetails>
    ) => {
      state.registeredEmployees = [
        ...state.registeredEmployees,
        action.payload,
      ];
    },
    setEmployeesList: (state, action: PayloadAction<IEmployeeDetails[]>) => {
      state.registeredEmployees = action.payload;
    },
    updateEmployeeDetails: (state, action: PayloadAction<IEmployeeDetails>) => {
      const rest = state.registeredEmployees.filter(
        (x) => x.id !== action.payload.id
      );
      state.registeredEmployees = [...rest, action.payload];
    },
  },
});

export const {
  setEmployeeDetails,
  setError,
  setRegisteredEmployees,
  setEmployeesList,
  setTotalCount,
  updateEmployeeDetails,
} = employeeSlice.actions;
export default employeeSlice.reducer;
