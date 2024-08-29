import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getIps, IIpDetails } from "../../redux/ip/ipSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import usePagination from "../../customhooks/paginationHook";

interface IIpTableProps {
  editIpHandler: (param: IIpDetails) => void;
}

export default function IpTable(props: IIpTableProps) {
  const { editIpHandler } = props;
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: false,
    },
    {
      field: "ipNumber",
      headerName: "Ip Address",
      width: 150,
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: false,
    },
    {
      field: "active",
      headerName: "Active",
      type: "boolean",
      hideSortIcons: true,
      disableColumnMenu: true,
      resizable: false,
    },
    {
      field: "inUse",
      headerName: "In Use",
      type: "boolean",
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
          label='Edit Ip'
          onClick={() => {
            editIpHandler(params.row);
          }}
        />,
      ],
    },
  ];

  const dispatch = useDispatch();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 2,
    page: 0,
  });

  const { ipDetails, totalCount } = useSelector((state: RootState) => state.ip);

  const { cursor, handlePaginationModelChange, take } = usePagination({
    paginationModel: paginationModel,
    data: ipDetails,
  });

  useEffect(() => {
    dispatch(getIps({ take: take, cursor: cursor }));
  }, [dispatch, cursor, take]);

  return (
    <div style={{ maxHeight: "400px", height: "auto" }}>
      <DataGrid
        autoHeight
        rows={ipDetails}
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
