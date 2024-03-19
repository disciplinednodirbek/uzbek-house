import {
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
import { CancelButton, SubmitButton } from "components/core/Buttons";
import { Controller, useForm } from "react-hook-form";

export default function AdminForm({ open, onClose }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
    },
  });

  async function onSubmit(data) {
    console.log(data);
  }
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>Admin Form</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-4">
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
            name="username"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <TextField
                label="Username"
                {...field}
                error={!!errors.username}
                helperText={!!errors.username && "Username is required"}
              />
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

          <Controller
            name="role"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Role"
                  {...field}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="super_admin">Super Admin</MenuItem>
                </Select>
                {errors.role && (
                  <FormHelperText error>Role is required</FormHelperText>
                )}
              </FormControl>
            )}
          />
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={onClose} label={"Cancel"} />
          <SubmitButton />
        </DialogActions>
      </form>
    </Dialog>
  );
}
