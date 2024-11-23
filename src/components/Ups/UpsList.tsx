import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import usePagination from "../../customhooks/paginationHook";
import { getAllUpsList, IUpsResponse } from "../../redux/ups/upsSlice";

interface IUpsTableProps {
  editUpsHandler: (param: IUpsResponse) => void;
}

export default function VendorTable(props: IUpsTableProps) {
  const { editUpsHandler } = props;
  const columns: GridColDef<IUpsResponse>[] = [
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
      field: "problem",
      headerName: "Problem",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: true,
      renderCell(params) {
        return params.row.problem ? "true" : "-";
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
      getActions: () => [
        <GridActionsCellItem
          icon={<SendIcon />}
          label='Edit Ups'
          onClick={() => {}}
        />,
      ],
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
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label='Edit Ups'
          onClick={() => editUpsHandler(params.row)}
        />,
      ],
    },
  ];

  const dispatch = useDispatch();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 2,
    page: 0,
  });

  const { upsDetails, totalCount } = useSelector(
    (state: RootState) => state.ups
  );

  const { cursor, handlePaginationModelChange, take } = usePagination({
    paginationModel: paginationModel,
    data: upsDetails,
  });

  useEffect(() => {
    dispatch(getAllUpsList({ take: take, cursor: cursor }));
  }, [dispatch, cursor, take]);

  console.log("@@ Upsdetails", upsDetails);
  return (
    <div style={{ maxHeight: "400px", height: "auto" }}>
      <DataGrid
        autoHeight
        rows={upsDetails}
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
