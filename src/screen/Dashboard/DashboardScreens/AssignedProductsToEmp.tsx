import { useCallback, useEffect, useState } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import { IAssignProductData } from "../../../redux/assignProduct/assignProductSlice";
import { getAssignedProductToEmpService } from "../../../services/assignProductService";

import { AssignedToEmployeeProductList } from "../../../components/AssignProduct/EmployeeAssignedProduct";

interface IAssignedProductToEmployeeProps {
  empId: string;
}
function AssignedProductToEmployee(props: IAssignedProductToEmployeeProps) {
  const { empId } = props;

  const [productsList, setProductsList] = useState<IAssignProductData[] | []>(
    []
  );

  const allAssignedProducts = useCallback(async () => {
    const currentProducts: IAssignProductData[] =
      await getAssignedProductToEmpService(empId);

    if (currentProducts.length) {
      setProductsList(currentProducts);
    }
  }, [empId]);

  useEffect(() => {
    if (empId !== "") allAssignedProducts();
  }, [allAssignedProducts, empId]);

  return (
    <Grid container p={2}>
      <Typography variant='h6'>Products In Use</Typography>
      <Divider />
      {productsList && productsList.length ? (
        productsList.map((item) => {
          return (
            <AssignedToEmployeeProductList key={item.id} productItem={item} />
          );
        })
      ) : (
        <></>
      )}
    </Grid>
  );
}

export default AssignedProductToEmployee;
