import { Box } from "@mui/material";
import React from "react";

function VendorScreen() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      {/* <RegisterIp updateIp={updateIp} cancelUpdate={cancelUpdate} />
      <IpList editIpHandler={editIpHandler} /> */}
      <h3>Vendor Section</h3>
    </Box>
  );
}

export default VendorScreen;
