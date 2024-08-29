import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";

const ErrorMessageTypography = styled(Typography)(() => ({
  color: red[300],
}));

interface IErrorTextProp {
  text: string;
}
function ErrorText(props: IErrorTextProp) {
  const { text } = props;
  return (
    <ErrorMessageTypography variant='body1'>{text}</ErrorMessageTypography>
  );
}

export default ErrorText;
