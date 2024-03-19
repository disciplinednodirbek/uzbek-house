import { Button, CircularProgress, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";

export function CreateButton({ label, onClick }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      startIcon={<AddIcon />}
      color="success"
      size="small"
      title={label}
      className="!bg-[#1F2C40] text-white"
    >
      {label}
    </Button>
  );
}

export function SubmitButton({ loading }) {
  return (
    <LoadingButton
      loading={loading}
      disabled={loading}
      variant="contained"
      loadingIndicator={<CircularProgress sx={{ color: "white" }} size={16} />}
      type="submit"
      startIcon={<SaveIcon />}
      color="success"
      size="small"
      title="Submit"
      className="!bg-[#1F2C40] text-white"
    >
      Submit
    </LoadingButton>
  );
}

export function CancelButton({ label, onClick }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      startIcon={<CloseIcon />}
      color="error"
      size="small"
      title={label}
    >
      {label}
    </Button>
  );
}

export function UpdateButton({ onClick }) {
  return (
    <IconButton size="small" title="Update" color="warning" onClick={onClick}>
      <EditIcon />
    </IconButton>
  );
}

export function DeleteButton({ onClick }) {
  return (
    <IconButton size="small" title="Delete" color="error" onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  );
}
