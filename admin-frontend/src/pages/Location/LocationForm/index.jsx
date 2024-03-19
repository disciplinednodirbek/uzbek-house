import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { CancelButton, SubmitButton } from "components/core/Buttons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "services/api";

export default function LocationForm({ open, onClose, locationForm }) {
  const [formLoading, setFormLoading] = useState(false);
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: locationForm?.item?.name,
    },
  });

  async function onSubmit(value) {
    setFormLoading(true);
    try {
      const endpoint =
        locationForm.type === "create"
          ? "/regions"
          : `/regions/${locationForm?.item?._id}`;
      const method = locationForm.type === "create" ? api.post : api.put;

      await method(endpoint, value);

      await queryClient.invalidateQueries(["regions"]);
      toast.success("Successfully!");
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.error);
    } finally {
      setFormLoading(false);
    }
  }
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>Location Form</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-4">
          <Controller
            name="name"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <TextField
                label="Name"
                {...field}
                error={!!errors.name}
                helperText={!!errors.name && "Name is required"}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={onClose} label={"Cancel"} />
          <SubmitButton loading={formLoading} />
        </DialogActions>
      </form>
    </Dialog>
  );
}
