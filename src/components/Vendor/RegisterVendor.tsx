import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  styled,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorText from "../ErrorText";
import {
  addNewVendor,
  IVendor,
  IVendorResponse,
  updateVendorDetails,
} from "../../redux/vendor/vendorSlice";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from "react-redux";

const StyledCardContent = styled(CardContent)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  padding: "0.8rem",
  boxSizing: "border-box",
}));

const initialVendorFormState = {
  name: "",
  address: "",
  mobile: "",
  dateOfRegistry: new Date().toISOString(),
};
interface IRegisterVendorProps {
  updateVendor: IVendorResponse | null;
  cancelUpdate: () => void;
}
function RegisterVendor(props: IRegisterVendorProps) {
  const dispatch = useDispatch();
  const { updateVendor, cancelUpdate } = props;

  const formik = useFormik({
    initialValues: updateVendor ? updateVendor : initialVendorFormState,
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      mobile: Yup.string().required("Required"),
      dateOfRegistry: Yup.string().required("Required"),
    }),
    onSubmit: (values: IVendor) => {
      setSubmitting(true);

      if (updateVendor) {
        dispatch(updateVendorDetails({ id: updateVendor.id, ...values }));
      } else {
        const payload = { ...values, mobile: values.mobile.toString() };
        dispatch(addNewVendor(payload));
      }
      resetForm({
        values: { ...initialVendorFormState },
      });
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <Card
          sx={{
            width: "350px",
            border: "1px solid #808080",
          }}
        >
          <CardHeader title={"Register Vendor"} />
          <StyledCardContent>
            <TextField
              id='vendorName'
              variant='filled'
              name='name'
              type='text'
              label='Vendor Name'
              onChange={handleChange}
              value={values.name}
            />
            {errors.name ? <ErrorText text={errors.name ?? ""} /> : null}

            <TextField
              id='vendorAddress'
              variant='filled'
              name='address'
              type='text'
              label='Vendor Address'
              onChange={handleChange}
              value={values.address}
            />
            {errors.address ? <ErrorText text={errors.address ?? ""} /> : null}

            <TextField
              id='mobileNumber'
              variant='filled'
              name='mobile'
              type='number'
              label='Mobile Number'
              onChange={handleChange}
              value={values.mobile}
            />
            {errors.mobile ? <ErrorText text={errors.mobile ?? ""} /> : null}

            <DatePicker
              label='Date Of Registration'
              value={dayjs(values.dateOfRegistry)}
              onChange={handleChange}
            />
          </StyledCardContent>
          {/* Footer */}
          <CardActions
            style={{ justifyContent: "flex-end", marginBottom: "2px" }}
          >
            <Button variant='contained' type='submit'>
              {!updateVendor ? "Register" : "Update"}
            </Button>
            {updateVendor ? (
              <Button variant='outlined' type='reset' onClick={cancelUpdate}>
                Cancel
              </Button>
            ) : (
              <Button
                variant='outlined'
                type='reset'
                onClick={() =>
                  resetForm({ values: { ...initialVendorFormState } })
                }
              >
                Reset
              </Button>
            )}
          </CardActions>
        </Card>
      </form>
    </LocalizationProvider>
  );
}

export default RegisterVendor;
