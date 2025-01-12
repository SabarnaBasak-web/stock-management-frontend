import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import {
  getAllMonitorsList,
  IMonitorResponse,
} from "../../redux/monitor/monitorSlice";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import usePagination from "../../customhooks/paginationHook";

interface IMonitorTableProps {
  editMonitorHandler: (params: IMonitorResponse) => void;
}
export default function MonitorListTable(props: IMonitorTableProps) {
  const { editMonitorHandler } = props;

  const columns: GridColDef<IMonitorResponse>[] = [
    {
      field: "id",
      headerName: "Id",
      width: 50,
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },
    {
      field: "gemNo",
      headerName: "Gem No.",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },
    {
      field: "gemDate",
      headerName: "Gem Date",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },
    {
      field: "brandName",
      headerName: "Brand Name",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },
    {
      field: "serialNo",
      headerName: "Serial Number",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },
    {
      field: "modelNo",
      headerName: "Model Number",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },
    {
      field: "displaySize",
      headerName: "Display Size",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },
    {
      field: "problem",
      headerName: "Problem",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
      renderCell(params) {
        return params.row.problem ? params.row.problem : "-";
      },
    },
    {
      field: "vendor",
      headerName: "Vendor Name",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
      renderCell(params) {
        return params.row.vendor.name;
      },
    },
    {
      field: "deliveryDate",
      headerName: "Delivery Date",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },

    {
      field: "warrentyStartDate",
      headerName: "Warrenty Start Date",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },
    {
      field: "warrentyEndDate",
      headerName: "Warrenty End Date",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
    },
    {
      field: "ewaste",
      type: "actions",
      headerName: "Send to E-Waste",
      resizable: true,
      getActions: (params) =>
        params.row.defunct
          ? [
              <GridActionsCellItem
                icon={<SendIcon />}
                label='Edit Ups'
                onClick={() => {}}
              />,
            ]
          : [],
    },
    {
      field: "isAmc",
      headerName: "AMC",
      resizable: true,
      type: "boolean",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Modify",
      resizable: true,
      getActions: (params) =>
        !params.row.deliveryDate
          ? [
              <GridActionsCellItem
                icon={<EditIcon />}
                label='Edit Ups'
                onClick={() => editMonitorHandler(params.row)}
              />,
            ]
          : [],
    },
  ];

  const dispatch = useDispatch();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 2,
    page: 0,
  });

  const { monitorDetails, totalCount } = useSelector(
    (state: RootState) => state.monitor
  );

  const { cursor, handlePaginationModelChange, take } = usePagination({
    paginationModel: paginationModel,
    data: monitorDetails,
  });

  useEffect(() => {
    dispatch(getAllMonitorsList({ take: take, cursor: cursor }));
  }, [dispatch, cursor, take]);

  console.log("@@ monitor details", monitorDetails);
  return (
    <div style={{ maxHeight: "400px", height: "auto" }}>
      <DataGrid
        autoHeight
        rows={monitorDetails}
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
    </div>
  );
}
