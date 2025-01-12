import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVendorResponse } from "../vendor/vendorSlice";

export interface IMonitorListQueryString {
  take?: number;
  cursor?: number;
}

export interface IMonitorRequestPayload {
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
  displaySize: string;
}

export interface IMonitorResponse {
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
  displaySize: string;
}
export interface IMonitorInitialState {
  monitorDetails: IMonitorResponse[];
  editUps: boolean;
  totalCount: number;
}

const initialState: IMonitorInitialState = {
  monitorDetails: [],
  editUps: false,
  totalCount: 0,
};
export const registerMonitor =
  createAction<IMonitorRequestPayload>("registerMonitor");

export const getAllMonitorsList =
  createAction<IMonitorListQueryString>("getAllMonitorsList");

export const monitorSlice = createSlice({
  name: "monitor",
  initialState,
  reducers: {
    insertNewMonitor: (state, action: PayloadAction<IMonitorResponse>) => {
      state.monitorDetails = [...state.monitorDetails, action.payload];
    },
    // setEditMode: (state, action: PayloadAction<boolean>) => {
    //   state.editUps = action.payload;
    // },
    setAllMonitors: (state, action: PayloadAction<IMonitorResponse[]>) => {
      state.monitorDetails = action.payload;
    },
    setRowCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    // updateUps: (state, action: PayloadAction<IUpsResponse>) => {
    //   state.upsDetails = state.upsDetails.map((item) =>
    //     item.id === action.payload.id ? action.payload : item
    //   );
    // },
  },
});

export const { insertNewMonitor, setAllMonitors, setRowCount } =
  monitorSlice.actions;
export default monitorSlice.reducer;
