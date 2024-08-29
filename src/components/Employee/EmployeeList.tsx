import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import {
  getAllEmployees,
  IEmployeeDetails,
} from "../../redux/employee/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import usePagination from "../../customhooks/paginationHook";

interface IEmployeeTableProps {
  editEmployeeHandler: (param: IEmployeeDetails) => void;
}
function EmployeeList(props: IEmployeeTableProps) {
  const { editEmployeeHandler } = props;
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
      width: 20,
    },
    {
      field: "name",
      headerName: "Name",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 150,
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },
    {
      field: "cell",
      headerName: "Cell",
      width: 100,
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },
    {
      field: "floorNumber",
      headerName: "Floor No.",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },
    {
      field: "mobileNumber",
      headerName: "Mobile No.",
      width: 150,
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },
    {
      field: "empId",
      headerName: "Emp Code",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },
    {
      field: "actions",
      type: "actions",
      width: 10,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label='Edit Ip'
          onClick={() => {
            editEmployeeHandler(params.row);
          }}
        />,
      ],
    },
  ];

  const { registeredEmployees, totalCount } = useSelector(
    (state: RootState) => state.employee
  );
  const dispatch = useDispatch();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 2,
    page: 0,
  });
  const { cursor, handlePaginationModelChange, take } = usePagination({
    paginationModel: paginationModel,
    data: registeredEmployees,
  });

  useEffect(() => {
    dispatch(getAllEmployees({ take: take, cursor: cursor }));
  }, [dispatch, cursor, take]);
  return (
    <Box style={{ maxHeight: "400px", width: "100%" }}>
      <DataGrid
        autoHeight
        rows={registeredEmployees}
        rowCount={totalCount}
        columns={columns}
        paginationModel={paginationModel}
        pageSizeOptions={[2, 5, 10]}
        paginationMode='server'
        onPaginationModelChange={(value) => {
          handlePaginationModelChange(value);
          setPaginationModel(value);
        }}
      />
    </Box>
  );
}

export default EmployeeList;
