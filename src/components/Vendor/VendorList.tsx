import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import usePagination from "../../customhooks/paginationHook";
import {
  getVendorsList,
  IVendorResponse,
} from "../../redux/vendor/vendorSlice";

interface IVendorTableProps {
  editVendorHandler: (param: IVendorResponse) => void;
}

export default function VendorTable(props: IVendorTableProps) {
  const { editVendorHandler } = props;
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: false,
    },
    {
      field: "name",
      headerName: "Vendor Name",
      width: 150,
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: false,
    },
    {
      field: "address",
      headerName: "Vendor Address",
      width: 150,
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: false,
    },
    {
      field: "mobile",
      headerName: "Mobile Number",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: false,
    },
    {
      field: "dateOfRegistry",
      headerName: "Date of Registry",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: false,
    },
    {
      field: "actions",
      type: "actions",
      resizable: false,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label='Edit Vendor'
          onClick={() => editVendorHandler(params.row)}
        />,
      ],
    },
  ];

  const dispatch = useDispatch();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 2,
    page: 0,
  });

  const { vendorsList, totalCount } = useSelector(
    (state: RootState) => state.vendor
  );

  const { cursor, handlePaginationModelChange, take } = usePagination({
    paginationModel: paginationModel,
    data: vendorsList,
  });

  useEffect(() => {
    dispatch(getVendorsList({ take: take, cursor: cursor }));
  }, [dispatch, cursor, take]);

  return (
    <div style={{ maxHeight: "400px", height: "auto" }}>
      <DataGrid
        autoHeight
        rows={vendorsList}
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
