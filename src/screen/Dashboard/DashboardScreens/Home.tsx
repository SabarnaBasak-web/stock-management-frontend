import { Box } from "@mui/material";
import IpList from "../../../components/Ip/IpList";
import RegisterIp from "../../../components/Ip/RegisterIp";
import { IIpDetails } from "../../../redux/ip/ipSlice";
import { useState } from "react";

function HomeScreen() {
  const [updateIp, setUpdateIp] = useState<IIpDetails | null>(null);
  // const [selectedIp, setSelectedIp] = useState(-1);

  const editIpHandler = (ip: IIpDetails) => {
    setUpdateIp(ip);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <RegisterIp updateIp={updateIp} />
        <IpList editIpHandler={editIpHandler} />
      </Box>
    </>
  );
}

export default HomeScreen;
