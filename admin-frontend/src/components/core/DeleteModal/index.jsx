import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { CancelButton } from "../Buttons";
import SaveIcon from "@mui/icons-material/Save";
import { api } from "services/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

export default function DeleteModal({ open, onClose, name, id }) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  async function handleDelete() {
    setIsLoading(true);
    try {
      const { data } = await api.delete(`/${name}/${id}`);
      await onClose();
      await queryClient.invalidateQueries({
        queryKey: [name],
      });
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>Are you sure to delete?</DialogTitle>
      <DialogActions>
        <CancelButton onClick={onClose} label={"Cancel"} />
        <LoadingButton
          loading={isLoading}
          loadingIndicator={
            <CircularProgress sx={{ color: "white" }} size={16} />
          }
          disabled={isLoading}
          variant="contained"
          startIcon={<SaveIcon />}
          color="success"
          size="small"
          title="Submit"
          className="!bg-[#1F2C40] text-white"
          onClick={handleDelete}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
