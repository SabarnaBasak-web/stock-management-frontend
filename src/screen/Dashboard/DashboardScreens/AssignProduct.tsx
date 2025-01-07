import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
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
import { IIpDetails } from "../../../redux/ip/ipSlice";
import { IEmployeeDetails } from "../../../redux/employee/employeeSlice";
import { getUnusedIps } from "../../../services/ipService";
import { useDispatch, useSelector } from "react-redux";
import { getProductsList } from "../../../redux/product/productSlice";
import { RootState } from "../../../redux/store";
import { useFormik } from "formik";
import { getAllUpsList } from "../../../redux/ups/upsSlice";
import {
  assignProductToEmpAction,
  getAllAssignProductAction,
  IAssignProductData,
} from "../../../redux/assignProduct/assignProductSlice";
import { AssignProductList } from "../../../components/AssignProduct/AssignProductList";
import AssignedProductToEmployee from "./AssignedProductsToEmp";
import { getAssignedProductToEmpService } from "../../../services/assignProductService";
import { getEmployeeDetailsById } from "../../../services/employeeService";

function AssignProduct() {
  const dispatch = useDispatch();
  const allProducts = useSelector(
    (state: RootState) => state.product.productsList
  );
  const allUps = useSelector((state: RootState) => state.ups.upsDetails);

  const [searchEmployee, setSearchEmployee] = useState("");
  const [empDetails, setEmpDetails] = useState<IEmployeeDetails>();
  const [assignedProducts, setAssignedProducts] = useState<
    IAssignProductData[]
  >([]);

  const [ipList, setIpList] = useState<IIpDetails[]>([]);

  const assignProductInitialFormValue = {
    productId: 0,
    serialNo: "",
    empId: 0,
    ipId: 0,
  };

  const formik = useFormik({
    initialValues: assignProductInitialFormValue,
    onSubmit: (values) => {
      // call assign product api
      dispatch(assignProductToEmpAction(values));
      resetForm();
    },
  });

  const { handleSubmit, resetForm, setFieldValue } = formik;

  const onChangeDropdownHandler = (event: SelectChangeEvent, field: string) => {
    setFieldValue(field, event.target.value);
    if (field === "productId") {
      dispatch(getAllUpsList());
    }
  };

  const searchEmployeeByIdHandler = useCallback(async () => {
    const employeeDetails = await getEmployeeDetailsById(searchEmployee);
    const products = await getAssignedProductToEmpService(searchEmployee);

    if (products.length) setAssignedProducts(products);

    if (employeeDetails.id) {
      const ipList = await getUnusedIps();
      setIpList([...ipList]);
    }
    setEmpDetails(employeeDetails);
    setFieldValue("empId", employeeDetails.empId);

    if (employeeDetails.active) {
      dispatch(getProductsList());
    }
  }, [dispatch, searchEmployee, setFieldValue]);

  useEffect(() => {
    dispatch(getAllAssignProductAction());
  }, [dispatch]);

  return (
    <>
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
                <Typography variant='body2'>
                  {empDetails.designation}
                </Typography>
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
          <form onSubmit={handleSubmit}>
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
                    name='ipId'
                    label='Select Ip'
                    onChange={(event: SelectChangeEvent) =>
                      onChangeDropdownHandler(event, "ipId")
                    }
                  >
                    {assignedProducts &&
                      assignedProducts.length &&
                      assignedProducts.map((t: IAssignProductData) => {
                        const ipAddress = t.ip.ipNumber;
                        return (
                          <MenuItem key={t.id} value={ipAddress}>
                            {ipAddress}*
                          </MenuItem>
                        );
                      })}
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

                {/* Product dropdown */}
                <FormControl style={{ width: "50%" }}>
                  <InputLabel id='select-product-label'>
                    Select Product
                  </InputLabel>
                  <Select
                    labelId='select-product-label'
                    id='select-product'
                    label='Select Product'
                    name='productId'
                    onChange={(event: SelectChangeEvent) =>
                      onChangeDropdownHandler(event, "productId")
                    }
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
                {/* Product serial number selection dropdown*/}
                <FormControl style={{ width: "50%" }}>
                  <InputLabel id='select-product-label'>
                    Select Product Serial Number
                  </InputLabel>
                  <Select
                    labelId='select-product-label'
                    id='select-product-serial'
                    name='serialNo'
                    label='Select Product Serial Number'
                    onChange={(event: SelectChangeEvent) =>
                      onChangeDropdownHandler(event, "serialNo")
                    }
                  >
                    {allUps &&
                      allUps.map((ups) => {
                        if (!ups.deliveryDate && !ups.problem) {
                          return (
                            <MenuItem key={ups.id} value={ups.serialNo}>
                              {ups.serialNo}
                            </MenuItem>
                          );
                        }
                      })}
                  </Select>
                </FormControl>

                <CardActions
                  style={{ justifyContent: "flex-start", marginBottom: "2px" }}
                >
                  <Button variant='contained' type='submit'>
                    Assign
                  </Button>

                  <Button
                    variant='outlined'
                    type='reset'
                    onClick={() =>
                      resetForm({
                        values: { ...assignProductInitialFormValue },
                      })
                    }
                  >
                    Reset
                  </Button>
                </CardActions>
              </Box>
            )}
          </form>
        </Grid>
        {/* End of left Container */}
        <Grid item md={6}>
          <AssignedProductToEmployee empId={empDetails?.empId ?? ""} />
        </Grid>
      </Grid>
      <Divider />
      <Grid container p={2} spacing={2} marginTop={5} marginBottom={5}>
        <Grid item md={12}>
          {/* Assign Product */}
          <AssignProductList />
        </Grid>
      </Grid>
    </>
  );
}

export default AssignProduct;
