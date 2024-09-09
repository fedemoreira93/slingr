import { useState, useCallback } from "react";
import { AlertColor } from "@mui/material/Alert";

interface UseNotificationsReturn {
  snackbarOpen: boolean;
  snackbarMessage: string;
  snackbarSeverity: AlertColor;
  handleCloseSnackbar: () => void;
  showSnackbar: (message: string, severity?: AlertColor) => void;
}

const useNotifications = (): UseNotificationsReturn => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("error");

  const handleCloseSnackbar = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  const showSnackbar = useCallback(
    (message: string, severity: AlertColor = "error") => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
    },
    []
  );

  return {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    handleCloseSnackbar,
    showSnackbar,
  };
};

export default useNotifications;
