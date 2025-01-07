import { IAssignProductData } from "../../redux/assignProduct/assignProductSlice";
import { Card, CardContent, Divider, Typography } from "@mui/material";

interface IAssignedProductToEmployeeProps {
  productItem: IAssignProductData;
  key: number;
}
export const AssignedToEmployeeProductList = (
  props: IAssignedProductToEmployeeProps
) => {
  const { productItem, key } = props;

  return (
    <Card
      style={{
        marginTop: "10px",
        backgroundColor: "#262626",
      }}
      key={key}
    >
      <CardContent
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Typography variant='body2'>{productItem.product.name} </Typography>
        <Divider orientation='vertical' sx={{ color: "white" }} />
        <Typography variant='body2'>{productItem.serialNo}</Typography>
        <Divider orientation='vertical' variant='middle' />
        <Typography variant='body2'>{productItem.ip.ipNumber}</Typography>
      </CardContent>
    </Card>
  );
};
