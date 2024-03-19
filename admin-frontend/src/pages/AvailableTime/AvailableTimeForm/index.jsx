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

export default function AvailableTimeForm({ open, onClose, formValues }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: formValues?.item?.name,
    },
  });
  const queryClient = useQueryClient();

  async function onSubmit(value) {
    setIsLoading(true);
    try {
      const endpoint =
        formValues.type === "create"
          ? "/available-times"
          : `/available-times/${formValues?.item?._id}`;
      const method = formValues.type === "create" ? api.post : api.put;

      await method(endpoint, value);

      await queryClient.invalidateQueries(["available-times"]);
      toast.success("Successfully!");
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>Available time form</DialogTitle>
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
          <SubmitButton loading={isLoading} />
        </DialogActions>
      </form>
    </Dialog>
  );
}
