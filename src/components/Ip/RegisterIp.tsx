import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
  styled,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorText from "../ErrorText";
import { useDispatch } from "react-redux";
import {
  IIpDetails,
  IIpRequestPayload,
  registerIp,
  updateIpDetails,
} from "../../redux/ip/ipSlice";

const StyledCardContent = styled(CardContent)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  padding: "0.8rem",
  boxSizing: "border-box",
}));

interface IRegisterIpProps {
  cancelUpdate: () => void;
  updateIp: IIpDetails | null;
}

function RegisterIp(props: IRegisterIpProps) {
  const { cancelUpdate, updateIp } = props;

  const dispatch = useDispatch();

  const registerIpInitialValue = {
    ipNumber: "",
    active: true,
    inUse: false,
  };
  const formik = useFormik({
    initialValues: updateIp ? updateIp : registerIpInitialValue,
    validationSchema: Yup.object({
      ipNumber: Yup.string().required("Required"),
    }),
    onSubmit: (values: IIpRequestPayload) => {
      setSubmitting(true);
      if (updateIp) {
        dispatch(updateIpDetails({ id: updateIp.id, ...values }));
      } else {
        dispatch(registerIp(values));
      }
      resetForm({ values: { inUse: false, active: false, ipNumber: "" } });
    },
    enableReinitialize: true,
  });

  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    setSubmitting,
    resetForm,
  } = formik;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card sx={{ maxHeight: "350px", width: "350px" }}>
          <CardHeader title={updateIp ? "Update Ip" : "Register Ip"} />
          <StyledCardContent>
            <TextField
              id='ipNumber'
              variant='filled'
              name='ipNumber'
              type='text'
              label='Ip address'
              onChange={handleChange}
              value={values.ipNumber}
            />
            {errors.ipNumber ? (
              <ErrorText text={errors.ipNumber ?? ""} />
            ) : null}
            <FormGroup style={{ display: "flex", flexDirection: "row" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name='active'
                    value={values.active}
                    checked={values.active}
                  />
                }
                label='Active'
              />
            </FormGroup>
          </StyledCardContent>
          <CardActions
            style={{ justifyContent: "flex-end", marginBottom: "2px" }}
          >
            <Button variant='contained' type='submit'>
              {!updateIp ? "Register" : "Update"}
            </Button>
            {updateIp ? (
              <Button variant='outlined' type='reset' onClick={cancelUpdate}>
                Cancel
              </Button>
            ) : (
              <Button
                variant='outlined'
                type='reset'
                onClick={() =>
                  resetForm({ values: { ...registerIpInitialValue } })
                }
              >
                Reset
              </Button>
            )}
          </CardActions>
        </Card>
      </form>
    </>
  );
}

export default RegisterIp;
