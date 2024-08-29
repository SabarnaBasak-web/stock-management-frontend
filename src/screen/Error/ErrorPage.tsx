import { Container, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <Container
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography variant='h3' style={{ fontWeight: "bold" }}>
        404!
      </Typography>
      <br />
      <Typography variant='h4'>{error.statusText || error.message}</Typography>
    </Container>
  );
}

export default ErrorPage;
