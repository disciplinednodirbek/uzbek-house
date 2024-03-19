import { TextField } from "@mui/material";
import { SubmitButton } from "components/core/Buttons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "services/api";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/auth/email_login", values);
      if (data.success) {
        navigate("/", { replace: true });
        toast.success("Successfully!");
        localStorage.setItem("token", "access_key");
      }
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center h-[100vh]">
      <div className="flex justify-center align-middle items-center w-[50%] bg-slate-100 h-[100vh]">
        <img
          style={{ width: "200px", height: "200px" }}
          src="https://cdn-icons-png.freepik.com/256/1503/1503145.png"
          alt="admin"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[50%] items-center justify-center p-8"
      >
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              fullWidth
              type="email"
              label="Email*"
              {...field}
              error={!!errors.email}
              helperText={!!errors.email && "Email is required"}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              fullWidth
              type="password"
              label="Password*"
              {...field}
              error={!!errors.password}
              helperText={!!errors.password && "Password is required"}
            />
          )}
        />
        <SubmitButton loading={isLoading} />
      </form>
    </div>
  );
}
