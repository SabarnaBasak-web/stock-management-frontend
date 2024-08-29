import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IIpRequestPayload {
  active: boolean;
  inUse: boolean;
  ipNumber: string;
}

export interface IIpListQueryString {
  take: number;
  cursor: number;
}
export interface IIpDetailsResponse {
  data: IIpDetails[];
  total: number;
}
export interface IIpDetails {
  active: boolean;
  id: number;
  inUse: boolean;
  ipNumber: string;
}

export interface IIpInitialState {
  ipDetails: IIpDetails[];
  editIp: boolean;
  totalCount: number;
}

const initialState: IIpInitialState = {
  ipDetails: [],
  editIp: false,
  totalCount: 0,
};

export const registerIp = createAction<IIpRequestPayload>("registerIp");
export const getIps = createAction<IIpListQueryString>("getAllIps");
export const updateIpDetails = createAction<IIpDetails>("updateIp");
export const ipSlice = createSlice({
  name: "ip",
  initialState,
  reducers: {
    insertNewIp: (state, action: PayloadAction<IIpDetails>) => {
      state.ipDetails = [...state.ipDetails, action.payload];
    },
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editIp = action.payload;
    },
    setAllIps: (state, action: PayloadAction<IIpDetails[]>) => {
      state.ipDetails = action.payload;
    },
    setRowCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    updateIp: (state, action: PayloadAction<IIpDetails>) => {
      const filteredList = state.ipDetails.filter(
        (x) => x.id !== action.payload.id
      );
      state.ipDetails = [...filteredList, action.payload];
    },
  },
});

export const { insertNewIp, setEditMode, setAllIps, setRowCount, updateIp } =
  ipSlice.actions;
export default ipSlice.reducer;
