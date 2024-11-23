import { Grid } from "@mui/material";
import { useState } from "react";
import RegisterUps from "../../../components/Ups/RegisterUps";
import UpsList from "../../../components/Ups/UpsList";
import { IUpsResponse } from "../../../redux/ups/upsSlice";

function UpsScreen() {
  const [upsDetails, setUpsDetails] = useState<IUpsResponse | null>(null);

  const cancelUpdate = () => {
    setUpsDetails(null);
  };
  return (
    <Grid container p={2}>
      <Grid item md={4}>
        <RegisterUps
          updateUpsDetails={upsDetails}
          cancelUpdate={cancelUpdate}
        />
      </Grid>
      <Grid item md={8}>
        <UpsList
          editUpsHandler={(details: IUpsResponse) => setUpsDetails(details)}
        />
      </Grid>
    </Grid>
  );
}

export default UpsScreen;
