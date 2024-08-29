import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  styled,
  TextField,
} from "@mui/material";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginUserAction } from "../../redux/authentication/authenticationSlice";
import { RootState } from "../../redux/store";
import ErrorText from "../../components/ErrorText";
import Logo from "../../assets/images/logo.png";

const StyledContainer = styled(Container)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: "1rem 0.8rem",
  height: "100vh",
  boxSizing: "border-box",
  flexDirection: "column",
}));

const StyledCardContent = styled(CardContent)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
}));

function LoginScreen() {
  const { error } = useSelector((state: RootState) => state.authentication);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      setSubmitting(true);
      dispatch(loginUserAction(values));
    },
  });

  // Todo: Need to refactor the implementation
  const {
    errors,
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
    setSubmitting,
  } = formik;
  return (
    <>
      <StyledContainer maxWidth={"lg"}>
        <img
          src={Logo}
          height={150}
          width={150}
          style={{ marginBottom: "30px" }}
        />
        <form onSubmit={handleSubmit}>
          <Card
            sx={{ minWidth: 500, borderRadius: "5px", padding: "10px 0.8rem" }}
            variant='elevation'
          >
            <CardHeader
              title='Stock Management System'
              style={{ fontWeight: "bold" }}
            />
            <StyledCardContent>
              <TextField
                id='username'
                variant='filled'
                name='username'
                type='text'
                label='Username'
                onChange={handleChange}
                value={values.username}
              />
              {errors.username && isSubmitting ? (
                <ErrorText text={formik.errors.username ?? ""} />
              ) : null}

              <TextField
                variant='filled'
                label='Password'
                id='password'
                name='password'
                type='password'
                onChange={handleChange}
                value={values.password}
              />
              {errors.password && isSubmitting ? (
                <ErrorText text={errors.password} />
              ) : null}

              <ErrorText text={error} />
            </StyledCardContent>
            <CardActions
              style={{ justifyContent: "flex-end", paddingBottom: "10px" }}
            >
              <Button variant='contained' type='submit'>
                Login
              </Button>
            </CardActions>
          </Card>
        </form>
      </StyledContainer>
    </>
  );
}

export default LoginScreen;
