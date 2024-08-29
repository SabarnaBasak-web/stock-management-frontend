import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import { CheckCircle, Search, Cancel } from "@mui/icons-material";
import { getEmployeeDetailsById } from "../../../services/employeeService";
import { IIpDetails } from "../../../redux/ip/ipSlice";
import { IEmployeeDetails } from "../../../redux/employee/employeeSlice";
import { getUnusedIps } from "../../../services/ipService";

function AssignProduct() {
  const [searchEmployee, setSearchEmployee] = useState("");
  const [empDetails, setEmpDetails] = useState<IEmployeeDetails>();
  const [selectedIp, setSelectedIp] = useState("");
  const [ipList, setIpList] = useState<IIpDetails[]>([]);
  console.log("search ", searchEmployee);

  const searchEmployeeByIdHandler = async () => {
    const employeeDetails = await getEmployeeDetailsById(searchEmployee);
    if (employeeDetails.id) {
      const ipList = await getUnusedIps();
      console.log("ipList", ipList);
      setIpList([...ipList]);
    }
    console.log(employeeDetails);
    setEmpDetails(employeeDetails);
  };

  console.log("ipList", ipList);
  const selectIpHandler = (event: SelectChangeEvent<string>) => {
    console.log("event", event);
    setSelectedIp(event.target.value);
  };
  return (
    <Grid container p={2} spacing={2}>
      {/* Left Container */}
      <Grid item md={6}>
        <Typography variant='body1'>Assign Ip to User</Typography>
        <Grid
          container
          sx={{ marginTop: "15px" }}
          alignContent={"flex-start"}
          justifyContent={"flex-start"}
          spacing={2}
        >
          <Grid item md={6}>
            <TextField
              id='search-employee'
              style={{ width: "100%" }}
              variant='standard'
              label='Search by employee id'
              value={searchEmployee}
              onChange={(e) => setSearchEmployee(e.target.value)}
            />
          </Grid>
          <Grid item md={2} style={{ marginTop: "10px" }}>
            <Button
              variant='text'
              autoCapitalize=''
              startIcon={<Search />}
              size='small'
              onClick={searchEmployeeByIdHandler}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        {empDetails && (
          <Card style={{ marginTop: "20px", width: "50%" }}>
            <CardContent>
              <Typography variant='body1'>
                {empDetails.name} ({empDetails.empId}){" "}
                {empDetails.active ? (
                  <CheckCircle color='success' fontSize='small' />
                ) : (
                  <Cancel color='error' fontSize='small' />
                )}
              </Typography>
              <Typography variant='body2'>{empDetails.designation}</Typography>
              <Box sx={{ marginTop: 2 }}>
                <Typography variant='body2'>
                  Mobile: {empDetails.mobileNumber}
                </Typography>
                <Typography variant='body2'>
                  {empDetails.cell} - cell, {empDetails.floorNumber}
                  <sup>th</sup> floor
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
        {empDetails?.active && (
          <Box sx={{ marginTop: "20px" }}>
            <FormControl style={{ width: "50%" }}>
              <InputLabel id='select-ip-label'>Select Ip </InputLabel>
              <Select
                labelId='select-ip-label'
                id='select-ip'
                value={selectedIp}
                label='Select Ip '
                onChange={selectIpHandler}
              >
                {empDetails && empDetails.Ip && (
                  <MenuItem value={empDetails.Ip.id}>
                    {empDetails.Ip.ipNumber}*
                  </MenuItem>
                )}
                {ipList &&
                  ipList.map((ip) => {
                    return <MenuItem value={ip.id}>{ip.ipNumber}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          </Box>
        )}
      </Grid>
      {/* End of left Container */}
      <Grid item md={6}>
        <h4>Second column</h4>
      </Grid>
    </Grid>
  );
}

export default AssignProduct;
