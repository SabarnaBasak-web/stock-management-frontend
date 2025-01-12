import { Grid } from "@mui/material";
import { useState } from "react";
import RegisterMonitor from "../../../components/Monitor/RegisterMonitor";
import MonitorListTable from "../../../components/Monitor/MonitorList";
// import { IMonitorResponse } from "../../../redux/monitor/monitorSlice";

function MonitorScreen() {
  const [monitorDetails, setMonitorDetails] = useState<null>(null);

  const cancelUpdate = () => {
    setMonitorDetails(null);
  };
  return (
    <Grid container p={2}>
      <Grid item md={4}>
        <RegisterMonitor cancelUpdate={cancelUpdate} />
      </Grid>
      <Grid item md={8}>
        {/* <UpsList
          editUpsHandler={(details: IUpsResponse) => setUpsDetails(details)}
        /> */}
        <MonitorListTable editMonitorHandler={() => {}} />
        {/* <h3>Second column</h3> */}
      </Grid>
    </Grid>
  );
}

export default MonitorScreen;
