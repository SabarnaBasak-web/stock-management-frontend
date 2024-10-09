import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IProduct } from "../../redux/product/productSlice";

interface IProductsListProps {
  productsList: IProduct[];
}
function ProductsList(props: IProductsListProps) {
  const { productsList } = props;
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
      headerName: "Product Name",
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
  ];
  return (
    <div style={{ maxHeight: "400px", height: "auto" }}>
      <DataGrid autoHeight rows={productsList} columns={columns} hideFooter />
    </div>
  );
}

export default ProductsList;
