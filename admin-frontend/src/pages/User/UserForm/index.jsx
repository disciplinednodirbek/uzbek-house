import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { CancelButton, SubmitButton } from "components/core/Buttons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "services/api";
import EditIcon from "@mui/icons-material/Edit";

export default function UserForm({ open, onClose, modal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [base64, setBase64] = useState(null);
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...modal?.item,
    },
  });

  async function onSubmit(value) {
    setIsLoading(true);
    try {
      const endpoint =
        modal.type === "create" ? "/users" : `/users/${modal?.item?._id}`;
      const method = modal.type === "create" ? api.post : api.put;

      await method(endpoint, {
        ...value,
        image: base64,
      });

      await queryClient.invalidateQueries(["users"]);
      toast.success("Successfully!");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setBase64(base64String);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>User Form</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-4">
          <div className="flex items-center justify-center">
            <div className="relative">
              <Avatar
                src={base64 || modal?.item?.image}
                sx={{ width: 120, height: 120, alignItems: "center" }}
              />
              <label
                htmlFor="uploadAvatar"
                className="absolute bottom-0 right-0 bg-yellow-500 rounded-full p-1 cursor-pointer"
              >
                <EditIcon />
                <input
                  type="file"
                  id="uploadAvatar"
                  hidden
                  accept="image/*"
                  onChange={handleUpload}
                />
              </label>
            </div>
          </div>

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

          <Controller
            name="email"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <TextField
                label="Email"
                type="email"
                {...field}
                error={!!errors.email}
                helperText={!!errors.email && "Email is required"}
              />
            )}
          />

          <Controller
            name="phone_number"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <TextField
                label="Phone"
                {...field}
                error={!!errors.phone_number}
                helperText={!!errors.phone_number && "Phone is required"}
              />
            )}
          />

          <Controller
            name="address"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <TextField
                label="Address"
                {...field}
                error={!!errors.address}
                helperText={!!errors.address && "Address is required"}
              />
            )}
          />
          <Controller
            name="role"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <FormControl error={errors.role}>
                <InputLabel id="roles">Roles</InputLabel>
                <Select labelId="roles" id="roles" label="Roles" {...field}>
                  <MenuItem value={"user"}>User</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"super_admin"}>Super admin</MenuItem>
                </Select>
                {errors.role && (
                  <FormHelperText>Role is required</FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="password"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <TextField
                label="Password"
                type="password"
                {...field}
                error={!!errors.password}
                helperText={!!errors.password && "Password is required"}
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
