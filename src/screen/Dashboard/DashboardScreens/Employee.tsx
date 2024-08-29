import { useState } from "react";
import { Grid } from "@mui/material";
import RegisterEmployee from "../../../components/Employee/RegisterEmployee";
import EmployeeList from "../../../components/Employee/EmployeeList";
import { IEmployeeDetails } from "../../../redux/employee/employeeSlice";

function EmployeeScreen() {
  const [updateEmployee, setUpdateEmployee] = useState<IEmployeeDetails | null>(
    null
  );
  const editEmployeeHandler = (employee: IEmployeeDetails) => {
    setUpdateEmployee(employee);
  };

  const cancelUpdate = () => {
    setUpdateEmployee(null);
  };
  return (
    <Grid container p={2}>
      <Grid item md={4}>
        <RegisterEmployee
          updateEmployee={updateEmployee}
          cancelUpdate={cancelUpdate}
        />
      </Grid>
      <Grid item md={8}>
        <EmployeeList editEmployeeHandler={editEmployeeHandler} />
      </Grid>
    </Grid>
  );
}

export default EmployeeScreen;
