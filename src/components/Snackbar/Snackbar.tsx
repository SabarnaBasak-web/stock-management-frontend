import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { resetSnackbarMessage } from "../../redux/snackbar/snackbarSlice";

const Notification = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { message, type, title } = useSelector(
    (state: RootState) => state.snackbar
  );

  useEffect(() => {
    if (message !== "") {
      setOpen(true);
    }
  }, [message]);

  const onCloseHandler = () => {
    setOpen(false);
    dispatch(resetSnackbarMessage());
  };

  return (
    <Snackbar
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      title={title}
      open={open}
      onClose={onCloseHandler}
    >
      <Alert
        severity={type}
        variant='filled'
        onClose={onCloseHandler}
        sx={{ color: "white" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
