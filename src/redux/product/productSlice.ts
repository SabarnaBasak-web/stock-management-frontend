import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProduct {
  id: number;
  name: string;
  active: boolean;
}

export interface IProductState {
  productsList: IProduct[];
}

const initialState: IProductState = {
  productsList: [],
};
export const getProductsList = createAction("getProductsList");
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductsList: (state, action: PayloadAction<IProduct[]>) => {
      state.productsList = action.payload;
    },
  },
});
export const { setProductsList } = productSlice.actions;
export default productSlice.reducer;
