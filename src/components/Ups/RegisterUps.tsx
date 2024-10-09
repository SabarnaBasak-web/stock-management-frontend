import {
  Card,
  CardHeader,
  TextField,
  styled,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorText from "../ErrorText";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import CustomTextarea from "../CustomTextArea/CustomTextarea";

const StyledCardContent = styled(CardContent)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  padding: "0.8rem",
  boxSizing: "border-box",
}));

function RegisterUps() {
  const [problemSelected, setProblemSelected] = useState("no");
  const [gemDate, setGemDate] = useState<Dayjs | null>(dayjs(Date.now()));
  const handleProblemSelectedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProblemSelected(event.target.value);
  };
  const registerUpsInitialValue = {
    gemNo: "",
    brandName: "",
    serialNo: "",
    modelNo: "",
    problem: "",
    warrentyStartDate: "",
    warrentyEndDate: "",
    defunct: false,
    isAmc: false,
    deliveryDate: "",
    vendorId: "",
  };
  const formik = useFormik({
    initialValues: registerUpsInitialValue,
    validationSchema: Yup.object({
      gemNo: Yup.string().required("Required"),
      brandName: Yup.string().required("Required"),
      serialNo: Yup.string().required("Required"),
      modelNo: Yup.string().required("Required"),
      vendorId: Yup.string().required("Required"),
      deliveryDate: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
    enableReinitialize: true,
  });
  const { errors, values, handleChange, handleSubmit, resetForm } = formik;

  const getVendorList = async () => {};
  useEffect(() => {
    getVendorList();
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card sx={{ width: "350px" }}>
          <CardHeader
            // title={updateEmployee ? "Update Employee" : "Register Employee"}
            title={"Register Ups"}
          />
          <StyledCardContent>
            <TextField
              id='gemNo'
              variant='filled'
              name='gemNo'
              type='text'
              label='Gem No'
              onChange={handleChange}
              value={values.gemNo}
            />
            {errors.gemNo ? <ErrorText text={errors.gemNo ?? ""} /> : null}
            {/* Gem Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Gem Date'
                value={gemDate}
                onChange={(newValue: Dayjs | null) => setGemDate(newValue)}
              />
            </LocalizationProvider>
            {!gemDate ? <ErrorText text={"Required"} /> : null}
            {/* Brand Name */}
            <TextField
              id='brandName'
              variant='filled'
              name='brandName'
              type='text'
              label='Brand Name'
              onChange={handleChange}
              value={values.brandName}
            />
            {errors.brandName ? (
              <ErrorText text={errors.brandName ?? ""} />
            ) : null}
            {/* Serial Number */}
            <TextField
              id='serialNo'
              variant='filled'
              name='serialNo'
              type='text'
              label='Serial Number'
              onChange={handleChange}
              value={values.serialNo}
            />
            {errors.serialNo ? (
              <ErrorText text={errors.serialNo ?? ""} />
            ) : null}
            {/* Model Number */}
            <TextField
              id='modelNo'
              variant='filled'
              name='modelNo'
              type='number'
              label='Model Number'
              onChange={handleChange}
              value={values.modelNo}
            />
            {errors.modelNo ? <ErrorText text={errors.modelNo ?? ""} /> : null}
            {/* Vendor */}
            <Select defaultValue={10} id='vendorId' name='vendorId'>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            {errors.modelNo ? <ErrorText text={errors.modelNo ?? ""} /> : null}
            {/* Problem */}
            <FormLabel>Problem</FormLabel>
            <RadioGroup
              row
              aria-labelledby='demo-form-control-label-placement'
              name='Problem'
              value={problemSelected}
              onChange={(event) => {
                console.log("event", event.target.value);
                setProblemSelected(event.target.value);
              }}
            >
              <FormControlLabel
                value={"no"}
                control={<Radio />}
                label='No'
                labelPlacement='start'
              />
              <FormControlLabel
                value={"yes"}
                control={<Radio />}
                label='Yes'
                labelPlacement='start'
              />
            </RadioGroup>
            {problemSelected === "yes" && (
              <>
                <CustomTextarea
                  ariaLabel='Problem'
                  minRows={3}
                  name='problem'
                  placeholderText='State the problem...'
                />
                {errors.problem ? (
                  <ErrorText text={errors.problem ?? ""} />
                ) : null}
              </>
            )}
            {/* employee id
            <TextField
              id='empId'
              variant='filled'
              name='empId'
              type='text'
              label='Employee Id'
              onChange={handleChange}
              value={values.empId}
            />
            {errors.empId ? <ErrorText text={errors.empId ?? ""} /> : null} */}
          </StyledCardContent>
          {/* <CardActions
            style={{ justifyContent: "flex-end", marginBottom: "2px" }}
          >
            <Button variant='contained' type='submit'>
              {updateEmployee ? "Update" : "Register"}
            </Button>
            {updateEmployee ? (
              <Button variant='outlined' type='reset' onClick={cancelUpdate}>
                Cancel
              </Button>
            ) : (
              <Button
                variant='outlined'
                type='reset'
                onClick={() =>
                  resetForm({ values: { ...registerEmployeeInitialValue } })
                }
              >
                Reset
              </Button>
            )}
          </CardActions> */}
        </Card>
      </form>
    </>
  );
}

export default RegisterUps;
