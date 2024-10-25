import { GridPaginationModel } from "@mui/x-data-grid";
import { useState } from "react";
import { IIpDetails } from "../redux/ip/ipSlice";
import { IEmployeeDetails } from "../redux/employee/employeeSlice";
import { IVendorResponse } from "../redux/vendor/vendorSlice";

interface IPaginationProp {
  paginationModel: GridPaginationModel;
  data: IIpDetails[] | IEmployeeDetails[] | IVendorResponse[];
}
const usePagination = (props: IPaginationProp) => {
  const { paginationModel, data } = props;
  const [cursor, setCursor] = useState(0);
  const [take, setTake] = useState(paginationModel.pageSize);

  const handlePaginationModelChange = (
    newPaginationModel: GridPaginationModel
  ) => {
    // page size is changed then reset cursor to 0 and take should be new page size
    if (newPaginationModel.pageSize !== paginationModel.pageSize) {
      setTake(newPaginationModel.pageSize);
      setCursor(0);
      return;
    }
    // When page number changes
    let lastItem;
    if (newPaginationModel.page < paginationModel.page) {
      setTake(newPaginationModel.pageSize * -1);
      lastItem = data[0].id;
    } else {
      setTake(newPaginationModel.pageSize);
      lastItem = data[data.length - 1].id;
    }
    setCursor(lastItem);
  };
  return { cursor, take, handlePaginationModelChange };
};
export default usePagination;
