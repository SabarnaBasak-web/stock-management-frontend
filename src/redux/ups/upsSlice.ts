import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVendorResponse } from "../vendor/vendorSlice";

export interface IUpsListQueryString {
  take: number;
  cursor: number;
}

export interface IUpsRequestPayload {
  gemNo: number;
  gemDate: string;
  brandName: string;
  serialNo: string;
  modelNo: string;
  problem?: string;
  warrentyStartDate: string | null;
  warrentyEndDate: string | null;
  defunct?: boolean;
  isAmc: boolean;
  vendorId: number;
  eWaste?: boolean;
}
export interface IUpdateUpsRequestPayload extends IUpsRequestPayload {
  id: number;
}
export interface IUpsResponse {
  id: number;
  gemNo: number;
  gemDate: string;
  brandName: string;
  serialNo: string;
  modelNo: string;
  deliveryDate: Date | null;
  problem: string | null;
  warrentyStartDate: string;
  warrentyEndDate: string;
  defunct: boolean;
  isAmc: boolean;
  eWaste: boolean;
  productId: number;
  vendorId: number;
  vendor: IVendorResponse;
}

export interface IUpsDetails extends IUpsRequestPayload {
  id: number;
}
export interface IUpsInitialState {
  upsDetails: IUpsResponse[];
  editUps: boolean;
  totalCount: number;
}

const initialState: IUpsInitialState = {
  upsDetails: [],
  editUps: false,
  totalCount: 0,
};

export const registerUps = createAction<IUpsRequestPayload>("registerUps");
export const getAllUpsList = createAction<IUpsListQueryString>("getAllUps");
export const updateUpsDetailsAction =
  createAction<IUpsRequestPayload>("updateUps");

export const upsSlice = createSlice({
  name: "ups",
  initialState,
  reducers: {
    insertNewUps: (state, action: PayloadAction<IUpsResponse>) => {
      state.upsDetails = [...state.upsDetails, action.payload];
    },
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editUps = action.payload;
    },
    setAllUps: (state, action: PayloadAction<IUpsResponse[]>) => {
      console.log("@@ SetAllUps", action);
      state.upsDetails = action.payload;
    },
    setRowCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    updateUps: (state, action: PayloadAction<IUpsResponse>) => {
      state.upsDetails = state.upsDetails.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { insertNewUps, setEditMode, setAllUps, setRowCount, updateUps } =
  upsSlice.actions;
export default upsSlice.reducer;
