import { call, put, takeLatest } from "redux-saga/effects";
import { getProductsList, IProduct, setProductsList } from "./productSlice";
import { fetchAllProducts } from "../../services/productService";

function* getProducts() {
  const productsList: IProduct[] = yield call(fetchAllProducts);
  yield put(setProductsList(productsList));
}

function* productSaga() {
  yield takeLatest(getProductsList, getProducts);
}
export default productSaga;
