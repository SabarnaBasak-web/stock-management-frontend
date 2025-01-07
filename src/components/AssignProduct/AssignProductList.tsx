import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAssignProductAction,
  IAssignProductData,
} from "../../redux/assignProduct/assignProductSlice";
import { Restore } from "@mui/icons-material";
import { RootState } from "../../redux/store";
import usePagination from "../../customhooks/paginationHook";

export const AssignProductList = () => {
  const columns: GridColDef<IAssignProductData>[] = [
    {
      field: "id",
      headerName: "Id",
      width: 50,
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },
    {
      field: "empId",
      headerName: "Employee Code",
      width: 250,
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },
    {
      field: "productName",
      headerName: "Product Name",
      width: 250,
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
      renderCell: (params: GridRenderCellParams) => params.row.product.name,
    },
    {
      field: "serialNo",
      headerName: "Serial no",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
      width: 250,
    },
    {
      field: "dateOfIssue",
      headerName: "Date of Issue",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
      width: 250,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Return",
      resizable: true,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Restore />}
          label='Return'
          onClick={() => returnProductHandler(params.row)}
        />,
      ],
    },
  ];
  const dispatch = useDispatch();
  const { data: assignedProducts } = useSelector(
    (state: RootState) => state.assignProduct
  );
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 2,
    page: 0,
  });

  const { cursor, handlePaginationModelChange, take } = usePagination({
    paginationModel: paginationModel,
    data: assignedProducts,
  });

  useEffect(() => {
    dispatch(getAllAssignProductAction({ take: take, cursor: cursor }));
  }, [dispatch, cursor, take]);

  const returnProductHandler = (row: IAssignProductData) => {
    console.log("@@ row", row);
  };
  return (
    <div style={{ maxHeight: "400px", height: "auto" }}>
      <DataGrid
        autoHeight
        rows={assignedProducts}
        rowCount={assignedProducts.length}
        columns={columns}
        paginationModel={paginationModel}
        pageSizeOptions={[2, 5, 10]}
        paginationMode='server'
        autosizeOptions={{
          columns: ["productName", "serialNo", "dateOfIssue"],
        }}
        onPaginationModelChange={(value) => {
          handlePaginationModelChange(value);
          setPaginationModel(value);
        }}
      />
    </div>
  );
};
