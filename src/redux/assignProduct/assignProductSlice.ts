import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmployeeDetails } from "../employee/employeeSlice";
import { IIpDetails } from "../ip/ipSlice";
import { IProduct } from "../product/productSlice";

export interface IAssignProductQuery {
  take?: number;
  cursor?: number;
}
export interface IAssignProductData {
  id: number;
  serialNo: string;
  dateOfIssue: string;
  dateOfReturn: string | null;
  productId: number;
  empId: string;
  ipId: number;
  employee: IEmployeeDetails;
  ip: IIpDetails;
  product: IProduct;
}

export interface IAssignProductToEmpPayload {
  ipId: number;
  empId: number;
  productId: number;
  serialNo: string;
}

export interface IAssignProductInitialState {
  data: IAssignProductData[];
}

export interface IAssignProductQueryParams {
  take?: number;
  cursor?: number;
}

const initialState: IAssignProductInitialState = {
  data: [],
};

export const assignProductToEmpAction =
  createAction<IAssignProductToEmpPayload>("assignProductAction");

export const getAssignedProductsToEmployeeAction = createAction<number>(
  "getAssignProductAction"
);

export const getAllAssignProductAction = createAction<
  IAssignProductQueryParams | undefined
>("getAllAssignProductAction");

export const assignProductSlice = createSlice({
  name: "assignProduct",
  initialState,
  reducers: {
    assignProduct: (state, action: PayloadAction<IAssignProductData>) => {
      state.data = [...state.data, action.payload];
    },

    setAssignedProduct: (
      state,
      action: PayloadAction<IAssignProductData[]>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { assignProduct, setAssignedProduct } = assignProductSlice.actions;
export default assignProductSlice.reducer;
