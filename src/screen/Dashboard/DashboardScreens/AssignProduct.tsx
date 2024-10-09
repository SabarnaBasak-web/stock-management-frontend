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
import ProductScreen from "./ProductScreen";
import { useDispatch, useSelector } from "react-redux";
import { getProductsList } from "../../../redux/product/productSlice";
import { RootState } from "../../../redux/store";

function AssignProduct() {
  const dispatch = useDispatch();
  const allProducts = useSelector(
    (state: RootState) => state.product.productsList
  );
  const [searchEmployee, setSearchEmployee] = useState("");
  const [empDetails, setEmpDetails] = useState<IEmployeeDetails>();
  const [selectedIp, setSelectedIp] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");
  const [ipList, setIpList] = useState<IIpDetails[]>([]);

  const searchEmployeeByIdHandler = async () => {
    const employeeDetails = await getEmployeeDetailsById(searchEmployee);
    if (employeeDetails.id) {
      const ipList = await getUnusedIps();
      setIpList([...ipList]);
    }
    setEmpDetails(employeeDetails);

    if (employeeDetails.active) {
      dispatch(getProductsList());
    }
  };

  const selectIpHandler = (event: SelectChangeEvent<string>) => {
    setSelectedIp(event.target.value);
  };
  const selectedProductHandler = (event: SelectChangeEvent<string>) => {
    setSelectedProductType(event.target.value);
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
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              rowGap: 2,
            }}
          >
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
                    return (
                      <MenuItem key={ip.id} value={ip.id}>
                        {ip.ipNumber}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            {/* Product select dropdown */}
            <FormControl style={{ width: "50%" }}>
              <InputLabel id='select-product-label'>Select Product </InputLabel>
              <Select
                labelId='select-product-label'
                id='select-product'
                value={selectedProductType}
                label='Select Product'
                onChange={selectedProductHandler}
              >
                {allProducts &&
                  allProducts.map((product) => {
                    return (
                      <MenuItem key={product.id} value={product.id}>
                        {product.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Box>
        )}
      </Grid>
      {/* End of left Container */}
      <Grid item md={6}>
        <h4>Second column</h4>
        <ProductScreen />
      </Grid>
    </Grid>
  );
}

export default AssignProduct;
