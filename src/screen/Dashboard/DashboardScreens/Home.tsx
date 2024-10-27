import { Box } from "@mui/material";
import IpList from "../../../components/Ip/IpList";
import RegisterIp from "../../../components/Ip/RegisterIp";
import { IIpDetails } from "../../../redux/ip/ipSlice";
import { useState } from "react";

function HomeScreen() {
  const [updateIp, setUpdateIp] = useState<IIpDetails | null>(null);

  const editIpHandler = (ip: IIpDetails) => {
    setUpdateIp(ip);
  };

  const cancelUpdate = () => {
    setUpdateIp(null);
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
      <RegisterIp updateIp={updateIp} cancelUpdate={cancelUpdate} />
      <IpList editIpHandler={editIpHandler} />
    </Box>
  );
}

export default HomeScreen;
