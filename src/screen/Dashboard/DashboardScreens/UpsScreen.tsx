import { Grid } from "@mui/material";
import React from "react";
import RegisterUps from "../../../components/Ups/RegisterUps";

function UpsScreen() {
  return (
    <Grid container p={2}>
      <Grid item md={4}>
        <RegisterUps />
      </Grid>
      <Grid item md={8}>
        {/* <ProductsList productsList={allProducts} /> */}
      </Grid>
    </Grid>
  );
}

export default UpsScreen;
