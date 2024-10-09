import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsList } from "../../../redux/product/productSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Grid } from "@mui/material";
import ProductsList from "../../../components/Products/ProductsList";

function ProductScreen() {
  const allProducts = useSelector(
    (state: RootState) => state.product.productsList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsList());
  }, [dispatch]);
  return (
    <Grid container p={2}>
      <Grid item md={4}>
        {/* <RegisterEmployee
          updateEmployee={updateEmployee}
          cancelUpdate={cancelUpdate}
        /> */}
      </Grid>
      <Grid item md={8}>
        <ProductsList productsList={allProducts} />
      </Grid>
    </Grid>
  );
}

export default ProductScreen;
