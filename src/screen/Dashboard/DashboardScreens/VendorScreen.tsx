import { Box } from "@mui/material";
import { useState } from "react";
import RegisterVendor from "../../../components/Vendor/RegisterVendor";
import VendorList from "../../../components/Vendor/VendorList";
import { IVendorResponse } from "../../../redux/vendor/vendorSlice";

function VendorScreen() {
  const [updateVendor, setUpdateVendor] = useState<IVendorResponse | null>(
    null
  );

  const editVendorHandler = (vendor: IVendorResponse) => {
    console.log("@@ vendor", vendor);
    setUpdateVendor(vendor);
  };

  const cancelUpdate = () => {
    setUpdateVendor(null);
  };

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
      <RegisterVendor updateVendor={updateVendor} cancelUpdate={cancelUpdate} />
      <VendorList editVendorHandler={editVendorHandler} />
    </Box>
  );
}

export default VendorScreen;
