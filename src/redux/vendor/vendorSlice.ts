import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IVendor {
  name: string;
  address: string;
  mobile: string;
  dateOfRegistry: string;
}
export interface IVendorResponse extends IVendor {
  id: number;
}

export interface IVendorsListResponse {
  data: IVendorResponse[];
  total: number;
}
export interface IVendorListQueryString {
  take: number;
  cursor: number;
}
export interface IVendorState {
  vendorsList: IVendorResponse[];
  totalCount: number;
}

const initialState: IVendorState = {
  vendorsList: [],
  totalCount: 0,
};
export const addNewVendor = createAction<IVendor>("addNewVendor");
export const getVendorsList =
  createAction<IVendorListQueryString>("getVendorsList");

export const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setVendorList: (state, action: PayloadAction<IVendorResponse[]>) => {
      state.vendorsList = action.payload;
    },
    setRowCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
  },
});
export const { setVendorList, setRowCount } = vendorSlice.actions;
export default vendorSlice.reducer;
