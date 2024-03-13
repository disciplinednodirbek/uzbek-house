import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Dialog,
  DialogContent,
  Tab,
  Box,
  TextField,
  Button,
  DialogTitle,
  IconButton,
} from "@mui/material";
import GoogleIcon from "assets/icons/google.svg";
import LogoWhiteIcon from "assets/icons/logo-white.png";
import CloseIcon from "@mui/icons-material/Close";

export default function AuthModal({ open, onClose }) {
  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const {
    handleSubmit: handleSignInSubmit,
    control: signInController,
    formState: { errors: signInErrors },
  } = useForm({});

  const {
    handleSubmit: handleSignUpSubmit,
    control: signUpController,
    formState: { errors: signUpErrors },
  } = useForm({});

  async function onSignInSubmit(values) {
    console.log(values);
  }

  async function onSignUpSubmit(values) {
    console.log(values);
  }

  function loginWithGoogle() {
    window.open("api/auth/google", "_self");
  }

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle className="relative">
        <div className="flex items-center justify-center">
          <img src={LogoWhiteIcon} alt="logo" className="w-[100px] h-[100px]" />
        </div>
        <div className="absolute top-2 right-2">
          <IconButton onClick={onClose} title="Close">
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
                textColor="#1D728E"
              >
                <Tab label="Sign In" value="1" />
                <Tab label="New Account" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <form onSubmit={handleSignInSubmit(onSignInSubmit)}>
                <Controller
                  name="email"
                  control={signInController}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Email *"
                      type="email"
                      {...field}
                      fullWidth
                      className="!mt-4"
                      error={signInErrors.email}
                      helperText={signInErrors.email && "Email is required"}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={signInController}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Password *"
                      type="password"
                      {...field}
                      fullWidth
                      className="!mt-4"
                      error={signInErrors.password}
                      helperText={
                        signInErrors.password && "Password is required"
                      }
                    />
                  )}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="!mt-4 hover:!bg-[#1D728E]"
                  sx={{ background: "#1D728E" }}
                >
                  Submit
                </Button>
              </form>
              <Button
                fullWidth
                color="primary"
                variant="outlined"
                className="!mt-8"
                onClick={loginWithGoogle}
              >
                <img src={GoogleIcon} alt="Google" className="w-[20px] mr-2" />
                Continue with Google
              </Button>
            </TabPanel>
            <TabPanel value="2">
              <form onSubmit={handleSignUpSubmit(onSignUpSubmit)}>
                <Controller
                  name="username"
                  control={signUpController}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Username *"
                      type="text"
                      {...field}
                      fullWidth
                      className="!mt-4"
                      error={signUpErrors.username}
                      helperText={
                        signUpErrors.username && "Username is required"
                      }
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={signUpController}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Email *"
                      type="email"
                      {...field}
                      fullWidth
                      className="!mt-4"
                      error={signUpErrors.email}
                      helperText={signUpErrors.email && "Email is required"}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={signUpController}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Password *"
                      type="password"
                      {...field}
                      fullWidth
                      className="!mt-4"
                      error={signUpErrors.password}
                      helperText={
                        signUpErrors.password && "Password is required"
                      }
                    />
                  )}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="!mt-4 hover:!bg-[#1D728E]"
                  sx={{ background: "#1D728E" }}
                >
                  Submit
                </Button>
              </form>
              <Button
                fullWidth
                color="primary"
                variant="outlined"
                className="!mt-8"
                onClick={loginWithGoogle}
              >
                <img src={GoogleIcon} alt="Google" className="w-[20px] mr-2" />
                Continue with Google
              </Button>
            </TabPanel>
          </TabContext>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
