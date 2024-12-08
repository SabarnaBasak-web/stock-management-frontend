import {
  Card,
  CardHeader,
  TextField,
  styled,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  CardActions,
  Button,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorText from "../ErrorText";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import CustomTextarea from "../CustomTextArea/CustomTextarea";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getVendorsList,
  IVendorResponse,
} from "../../redux/vendor/vendorSlice";
import {
  IUpdateUpsRequestPayload,
  IUpsRequestPayload,
  IUpsResponse,
  registerUps,
  updateUpsDetailsAction,
} from "../../redux/ups/upsSlice";

const StyledCardContent = styled(CardContent)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  padding: "0.8rem",
  boxSizing: "border-box",
}));

interface IRegisterProps {
  updateUpsDetails: IUpsResponse | null;
  cancelUpdate: () => void;
}

interface IRegisterUpsInitialValues {
  problemSelected: boolean;
  warrentySelected: boolean;
  gemNo: string;
  brandName: string;
  serialNo: string;
  modelNo: string;
  problem: string;
  warrentyStartDate: Dayjs | null;
  warrentyEndDate: Dayjs | null;
  isAmc: boolean;
  vendorId: number;
  eWaste?: boolean;
  defunct?: boolean;
}
function RegisterUps(props: IRegisterProps) {
  const { updateUpsDetails, cancelUpdate } = props;
  const [gemDate, setGemDate] = useState<Dayjs | null>(dayjs(Date.now()));

  const { vendorsList } = useSelector((state: RootState) => state.vendor);

  const dispatch = useDispatch();

  const registerUpsInitialValue: IRegisterUpsInitialValues = {
    gemNo: "",
    brandName: "",
    serialNo: "",
    modelNo: "",
    problem: "",
    problemSelected: false,
    warrentyStartDate: null,
    warrentyEndDate: null,
    defunct: false,
    isAmc: false,
    vendorId: 0,
    warrentySelected: false,
    eWaste: false,
  };

  const selectedUpsDetails = (updateUpsDetails: IUpsResponse) => {
    return {
      gemNo: updateUpsDetails.gemNo.toString(),
      brandName: updateUpsDetails.brandName,
      serialNo: updateUpsDetails.serialNo,
      modelNo: updateUpsDetails.modelNo,
      problemSelected: !!updateUpsDetails.problem,
      problem: updateUpsDetails.problem ? updateUpsDetails.problem : "",
      warrentySelected:
        !!updateUpsDetails.warrentyStartDate &&
        !!updateUpsDetails.warrentyEndDate,
      warrentyStartDate: dayjs(new Date(updateUpsDetails.warrentyStartDate)),
      warrentyEndDate: dayjs(new Date(updateUpsDetails.warrentyEndDate)),
      defunct: updateUpsDetails.defunct,
      isAmc: updateUpsDetails.isAmc,
      vendorId: updateUpsDetails.vendorId,
      eWaster: updateUpsDetails.eWaste,
    };
  };

  const formik = useFormik<IRegisterUpsInitialValues>({
    initialValues: updateUpsDetails
      ? selectedUpsDetails(updateUpsDetails)
      : registerUpsInitialValue,
    validationSchema: Yup.object({
      gemNo: Yup.string().required("Required"),
      brandName: Yup.string().required("Required"),
      serialNo: Yup.string().required("Required"),
      modelNo: Yup.string().required("Required"),
      vendorId: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const requestPayload: IUpsRequestPayload = {
        gemNo: +values.gemNo,
        gemDate: gemDate?.toISOString() ?? "",
        problem: values.problem ?? "",
        brandName: values.brandName,
        serialNo: values.serialNo,
        modelNo: values.modelNo,
        warrentyStartDate: values.warrentyStartDate
          ? values.warrentyStartDate.toISOString()
          : null,
        warrentyEndDate: values.warrentyEndDate
          ? values.warrentyEndDate.toISOString()
          : null,
        isAmc: false,
        vendorId: values.vendorId,
        eWaste: values.eWaste,
        defunct: values.defunct,
      };
      if (updateUpsDetails) {
        dispatch(
          updateUpsDetailsAction({
            ...requestPayload,
            id: updateUpsDetails.id,
          } as IUpdateUpsRequestPayload)
        );
      } else {
        dispatch(registerUps(requestPayload));
      }
      resetForm({ values: { ...registerUpsInitialValue } });
    },
    enableReinitialize: true,
  });
  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    touched,
  } = formik;

  const handleSelectVendorChange = (event: SelectChangeEvent) => {
    setFieldValue("vendorId", event.target.value);
  };

  useEffect(() => {
    dispatch(getVendorsList());
  }, [dispatch]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card sx={{ width: "350px" }}>
          <CardHeader
            title={updateUpsDetails ? "Update Ups" : "Register Ups"}
          />
          <StyledCardContent>
            <TextField
              id='gemNo'
              variant='filled'
              name='gemNo'
              type='number'
              label='Gem No'
              onChange={handleChange}
              value={values.gemNo}
            />
            {errors.gemNo && touched.gemNo ? (
              <ErrorText text={errors.gemNo ?? ""} />
            ) : null}
            {/* Gem Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Gem Date'
                value={gemDate}
                onChange={(newValue: Dayjs | null) => setGemDate(newValue)}
              />
            </LocalizationProvider>
            {!gemDate ? <ErrorText text={"Required"} /> : null}
            {/* Brand Name */}
            <TextField
              id='brandName'
              variant='filled'
              name='brandName'
              type='text'
              label='Brand Name'
              onChange={handleChange}
              value={values.brandName}
            />
            {errors.brandName && touched.brandName ? (
              <ErrorText text={errors.brandName ?? ""} />
            ) : null}
            {/* Serial Number */}
            <TextField
              id='serialNo'
              variant='filled'
              name='serialNo'
              type='text'
              label='Serial Number'
              onChange={handleChange}
              value={values.serialNo}
            />
            {errors.serialNo && touched.serialNo ? (
              <ErrorText text={errors.serialNo ?? ""} />
            ) : null}
            {/* Model Number */}
            <TextField
              id='modelNo'
              variant='filled'
              name='modelNo'
              label='Model Number'
              onChange={handleChange}
              value={values.modelNo}
            />
            {errors.modelNo && touched.modelNo ? (
              <ErrorText text={errors.modelNo ?? ""} />
            ) : null}
            {/* Vendor */}
            {vendorsList.length && (
              <FormControl required>
                <InputLabel id='select-vendor'>Select Vendor</InputLabel>
                <Select
                  label-id='select-vendor'
                  placeholder='Select Vendor'
                  name='vendorId'
                  id='vendor-select'
                  label='Select Vendor'
                  value={values.vendorId.toString()}
                  onChange={handleSelectVendorChange}
                >
                  {vendorsList.map((item: IVendorResponse) => {
                    return (
                      <MenuItem key={item.id} value={item.id ?? ""}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
            {errors.vendorId && touched.vendorId ? (
              <ErrorText text={errors.vendorId ?? ""} />
            ) : null}
            {/* Problem */}
            <FormLabel>Problem</FormLabel>
            <RadioGroup
              row
              aria-labelledby='demo-form-control-label-placement'
              name='problemSelected'
              value={values.problemSelected}
              onChange={(event) =>
                setFieldValue(
                  "problemSelected",
                  event?.target.value === "true" ? true : false
                )
              }
            >
              <FormControlLabel
                value={false}
                control={<Radio />}
                label='No'
                labelPlacement='start'
              />
              <FormControlLabel
                value={true}
                control={<Radio />}
                label='Yes'
                labelPlacement='start'
              />
            </RadioGroup>
            {values.problemSelected && (
              <>
                <CustomTextarea
                  ariaLabel='Problem'
                  minRows={3}
                  name='problem'
                  value={values.problem}
                  onChange={(e) => setFieldValue("problem", e.target.value)}
                  placeholderText='State the problem...'
                />
                {errors.problem && touched.problem ? (
                  <ErrorText text={errors.problem ?? ""} />
                ) : null}

                {/* display defunct only in edit mode */}
                {/* Defunct */}
                {updateUpsDetails && (
                  <>
                    <FormLabel>Defunct</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby='demo-form-control-label-placement'
                      name='defunct'
                      value={values.defunct}
                      onChange={(e) =>
                        setFieldValue(
                          "defunct",
                          e.target.value === "true" ? true : false
                        )
                      }
                    >
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label='No'
                        labelPlacement='start'
                      />
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label='Yes'
                        labelPlacement='start'
                      />
                    </RadioGroup>
                  </>
                )}
              </>
            )}

            {/* Warrenty Selected */}
            <FormLabel>Warrenty</FormLabel>
            <RadioGroup
              row
              aria-labelledby='demo-form-control-label-placement'
              name='warrentySelected'
              value={values.warrentySelected}
              onChange={(e) =>
                setFieldValue(
                  "warrentySelected",
                  e.target.value === "true" ? true : false
                )
              }
            >
              <FormControlLabel
                value={false}
                control={<Radio />}
                label='No'
                labelPlacement='start'
              />
              <FormControlLabel
                value={true}
                control={<Radio />}
                label='Yes'
                labelPlacement='start'
              />
            </RadioGroup>
            {values.warrentySelected && (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='Warrent Start Date'
                    name='warrentyStartDate'
                    value={values.warrentyStartDate}
                    onChange={(newValue: Dayjs | null) =>
                      setFieldValue("warrentyStartDate", newValue)
                    }
                  />
                </LocalizationProvider>
                {errors.warrentyStartDate && touched.warrentyStartDate ? (
                  <ErrorText text={errors.warrentyStartDate ?? ""} />
                ) : null}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='Warrenty End Date'
                    name='warrentyEndDate'
                    value={values.warrentyEndDate}
                    onChange={(newValue: Dayjs | null) =>
                      setFieldValue("warrentyEndDate", newValue)
                    }
                  />
                </LocalizationProvider>
                {errors.warrentyEndDate && touched.warrentyEndDate ? (
                  <ErrorText text={errors.warrentyEndDate ?? ""} />
                ) : null}
              </>
            )}
          </StyledCardContent>
          <CardActions
            style={{ justifyContent: "flex-end", marginBottom: "2px" }}
          >
            <Button variant='contained' type='submit'>
              {updateUpsDetails ? "Update" : "Register"}
            </Button>
            {updateUpsDetails ? (
              <Button variant='outlined' type='reset' onClick={cancelUpdate}>
                Cancel
              </Button>
            ) : (
              <Button
                variant='outlined'
                type='reset'
                onClick={() =>
                  resetForm({ values: { ...registerUpsInitialValue } })
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

export default RegisterUps;
