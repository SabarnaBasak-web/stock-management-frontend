import React from "react";
import { useDispatch } from "react-redux";

import {
  Card,
  CardHeader,
  TextField,
  CardActions,
  Button,
  styled,
  CardContent,
} from "@mui/material";
import * as Yup from "yup";
import ErrorText from "../ErrorText";
import { useFormik } from "formik";
import {
  IEmployeeDetails,
  IUpdateEmployeeRequestPayload,
  registerEmployee,
  updateEmployeeAction,
} from "../../redux/employee/employeeSlice";

const StyledCardContent = styled(CardContent)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  padding: "0.8rem",
  boxSizing: "border-box",
}));

interface IRegisterEmployeeProps {
  updateEmployee: IEmployeeDetails | null;
  cancelUpdate: () => void;
}
function RegisterEmployee(props: IRegisterEmployeeProps) {
  const { updateEmployee, cancelUpdate } = props;
  const dispatch = useDispatch();
  const registerEmployeeInitialValue = {
    name: "",
    designation: "",
    cell: "",
    floorNumber: "",
    mobileNumber: "",
    empId: "",
  };

  const formik = useFormik({
    initialValues: updateEmployee
      ? updateEmployee
      : registerEmployeeInitialValue,
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      designation: Yup.string().required("Required"),
      cell: Yup.string().required("Required"),
      floorNumber: Yup.string().required("Required"),
      mobileNumber: Yup.string().required("Required"),
      empId: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
      if (updateEmployee) {
        dispatch(
          updateEmployeeAction({
            ...values,
            mobileNumber: values.mobileNumber.toString(),
          } as IUpdateEmployeeRequestPayload)
        );
        cancelUpdate();
        return;
      }
      dispatch(
        registerEmployee({
          ...values,
          mobileNumber: values.mobileNumber.toString(),
          active: true,
        })
      );
    },
    enableReinitialize: true,
  });
  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    // setSubmitting,
    resetForm,
  } = formik;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card sx={{ width: "350px" }}>
          <CardHeader
            title={updateEmployee ? "Update Employee" : "Register Employee"}
          />
          <StyledCardContent>
            <TextField
              id='name'
              variant='filled'
              name='name'
              type='text'
              label='Name'
              onChange={handleChange}
              value={values.name}
            />
            {errors.name ? <ErrorText text={errors.name ?? ""} /> : null}
            {/* Designation */}
            <TextField
              id='designation'
              variant='filled'
              name='designation'
              type='text'
              label='Designation'
              onChange={handleChange}
              value={values.designation}
            />
            {errors.designation ? (
              <ErrorText text={errors.designation ?? ""} />
            ) : null}
            {/* Cell */}
            <TextField
              id='cell'
              variant='filled'
              name='cell'
              type='text'
              label='Cell'
              onChange={handleChange}
              value={values.cell}
            />
            {errors.cell ? <ErrorText text={errors.cell ?? ""} /> : null}
            {/* Floor Number */}
            <TextField
              id='floorNumber'
              variant='filled'
              name='floorNumber'
              type='text'
              label='Floor Number'
              onChange={handleChange}
              value={values.floorNumber}
            />
            {errors.floorNumber ? (
              <ErrorText text={errors.floorNumber ?? ""} />
            ) : null}
            {/* Mobile Number */}
            <TextField
              id='mobileNumber'
              variant='filled'
              name='mobileNumber'
              type='number'
              label='Mobile Number'
              onChange={handleChange}
              value={values.mobileNumber}
            />
            {errors.mobileNumber ? (
              <ErrorText text={errors.mobileNumber ?? ""} />
            ) : null}
            {/* employee id */}
            <TextField
              id='empId'
              variant='filled'
              name='empId'
              type='text'
              label='Employee Id'
              onChange={handleChange}
              value={values.empId}
            />
            {errors.empId ? <ErrorText text={errors.empId ?? ""} /> : null}
          </StyledCardContent>
          <CardActions
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
          </CardActions>
        </Card>
      </form>
    </>
  );
}

export default RegisterEmployee;
