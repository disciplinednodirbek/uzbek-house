import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Delete } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ImageViewer from "react-simple-image-viewer";
import Map from "components/Map";
import SellPreview from "./components/SellPreview";

const steps = [
  "Contact Information",
  "Property Information",
  "Location Information",
  "Home Images",
];

export default function Sell() {
  const [activeStep, setActiveStep] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [formValues, setFormValues] = useState(null);

  const openImageViewer = useCallback((file) => {
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
        setCurrentImage(reader.result);
        setIsViewerOpen(true);
      };
      reader.onerror = (error) => reject(error);
    });
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  function onSubmit(values) {
    if (activeStep !== steps.length - 1) {
      setActiveStep((prevState) => prevState + 1);
    } else {
      setIsPreviewOpen(true);
      setFormValues(values);
    }
  }

  function handleBack() {
    setActiveStep((prevState) => prevState - 1);
  }

  const images = watch("images");

  const imagesList = [
    "https://cdn.pixabay.com/photo/2023/08/03/22/25/mountain-8168060_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/02/22/09/04/warehouse-8589487_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/09/22/07/52/beach-8268375_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/09/29/07/50/rocks-8283171_1280.jpg",
  ];

  return (
    <div className="bg-gray-100 w-full  p-8 flex">
      {isViewerOpen && (
        <ImageViewer
          src={imagesList}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
      <Paper
        className="grid grid-cols-7 mobile:max-w-[100%]
       lg:max-w-[900px] w-full min-h-[600px] mx-auto p-4"
      >
        <div className="col-span-2 px-4 mobile:border-b-2 md:border-b-0 md:border-r-2">
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="pl-4 col-span-5 flex flex-col justify-between"
        >
          {activeStep === 0 && (
            <div>
              <div className="flex mobile:flex-col md:flex-row gap-4 mt-4">
                <Controller
                  name="fullname"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      type="text"
                      label="Full Name*"
                      {...field}
                      className="md:w-1/2"
                      error={errors.fullname}
                      helperText={errors.fullname && "Full name is required"}
                    />
                  )}
                />
                <Controller
                  name="phone_number"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      type="text"
                      label="Phone Number*"
                      {...field}
                      className="md:w-1/2"
                      error={errors.phone_number}
                      helperText={
                        errors.phone_number && "Phone number is required"
                      }
                    />
                  )}
                />
              </div>
              <div className="flex mobile:flex-col md:flex-row gap-4 mt-4">
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      type="email"
                      label="Email*"
                      {...field}
                      className="md:w-1/2"
                      error={errors.email}
                      helperText={errors.email && "Email is required"}
                    />
                  )}
                />
                <Controller
                  name="available_time"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      className="md:w-1/2"
                      error={errors.available_time}
                    >
                      <InputLabel id="availableTimes">
                        Available Times*
                      </InputLabel>
                      <Select
                        labelId="availableTimes"
                        id="availableTimes"
                        label="Available Times*"
                        {...field}
                      >
                        <MenuItem value={1}>Morning</MenuItem>
                        <MenuItem value={2}>Afternoon</MenuItem>
                        <MenuItem value={3}>Evening</MenuItem>
                      </Select>
                      {errors.available_time && (
                        <FormHelperText>
                          Available times is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </div>
            </div>
          )}
          {activeStep === 1 && (
            <div>
              <div className="flex mobile:flex-col md:flex-row gap-4 mt-4">
                <Controller
                  name="bathroom_count"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      label="Bathroom Count*"
                      {...field}
                      className="md:w-1/2"
                      error={errors.bathroom_count}
                      helperText={
                        errors.bathroom_count && "Bathroom count is required"
                      }
                    />
                  )}
                />
                <Controller
                  name="bedroom_count"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      label="Bedroom Count*"
                      {...field}
                      className="md:w-1/2"
                      error={errors.bedroom_count}
                      helperText={
                        errors.bedroom_count && "Bedroom Count is required"
                      }
                    />
                  )}
                />
              </div>
              <div className="flex mobile:flex-col md:flex-row gap-4 mt-4">
                <Controller
                  name="kitchen_count"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      label="Kitchen Count*"
                      {...field}
                      className="md:w-1/2"
                      error={errors.kitchen_count}
                      helperText={
                        errors.kitchen_count && "Kitchen count is required"
                      }
                    />
                  )}
                />

                <Controller
                  name="balcony"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <FormControl className="md:w-1/2" error={errors.balcony}>
                      <InputLabel id="balcony">Balcony*</InputLabel>
                      <Select
                        labelId="balcony"
                        id="balcony"
                        label="Balcony*"
                        {...field}
                      >
                        <MenuItem value={1}>No</MenuItem>
                        <MenuItem value={2}>Yes</MenuItem>
                      </Select>
                      {errors.balcony && (
                        <FormHelperText>
                          Available times is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </div>
              <div className="flex mobile:flex-col md:flex-row gap-4 mt-4">
                <Controller
                  name="square_yard"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      label="Square Yard M3*"
                      {...field}
                      className="md:w-1/2"
                      error={errors.square_yard}
                      helperText={
                        errors.square_yard && "Square Yard is required"
                      }
                    />
                  )}
                />

                <Controller
                  name="year_build"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      label="Year Build*"
                      {...field}
                      className="md:w-1/2"
                      error={errors.year_build}
                      helperText={errors.year_build && "Year Build is required"}
                    />
                  )}
                />
              </div>
              <div className="flex mobile:flex-col md:flex-row gap-4 mt-4">
                <Controller
                  name="current_condition"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      className="w-full"
                      error={errors.current_condition}
                    >
                      <InputLabel id="current_condition">
                        Current Condition*
                      </InputLabel>
                      <Select
                        labelId="current_condition"
                        id="current_condition"
                        label="Current Condition*"
                        {...field}
                      >
                        <MenuItem value={1}>Good</MenuItem>
                        <MenuItem value={2}>Bad</MenuItem>
                      </Select>
                      {errors.current_condition && (
                        <FormHelperText>
                          Available times is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </div>
              <div className="flex mobile:flex-col md:flex-row gap-4 mt-4">
                <Controller
                  name="maintenance_description"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      type="text"
                      label="Maintenance Description*"
                      {...field}
                      className="w-full"
                      error={errors.maintenance_description}
                      helperText={
                        errors.maintenance_description &&
                        "Maintenance Description is required"
                      }
                    />
                  )}
                />
              </div>
              <div className="flex mobile:flex-col md:flex-row gap-4 mt-4">
                <Controller
                  name="price"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      label="Price*"
                      {...field}
                      className="md:w-1/2"
                      error={errors.price}
                      helperText={errors.price && "Price is required"}
                    />
                  )}
                />

                <Controller
                  name="unit_type"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <FormControl className="md:w-1/2" error={errors.unit_type}>
                      <InputLabel id="unit_type">Unit Type*</InputLabel>
                      <Select
                        labelId="unit_type"
                        id="unit_type"
                        label="unit_type*"
                        {...field}
                      >
                        <MenuItem value={1}>Daily</MenuItem>
                        <MenuItem value={2}>Monthly</MenuItem>
                        <MenuItem value={2}>Yearly</MenuItem>
                      </Select>
                      {errors.unit_type && (
                        <FormHelperText>
                          Available times is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <div className="h-[40vh] w-full mobile:pt-2 md:pt-0">
                <Map draggable={true} />
              </div>
              <div className="flex mobile:flex-col md:flex-row gap-4 mt-4">
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      type="text"
                      label="Address*"
                      {...field}
                      className="w-full"
                      error={errors.address}
                      helperText={errors.address && "Address is required"}
                    />
                  )}
                />
              </div>
              <div className="flex mobile:flex-col md:flex-row gap-4 mt-4">
                <Controller
                  name="region_id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      label="Region Id*"
                      {...field}
                      className="md:w-1/2"
                      error={errors.region_id}
                      helperText={errors.region_id && "Region Id is required"}
                    />
                  )}
                />
                <Controller
                  name="zip_code"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      label="Zip Code*"
                      {...field}
                      className="md:w-1/2"
                      error={errors.zip_code}
                      helperText={errors.zip_code && "Zip Code is required"}
                    />
                  )}
                />
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div>
              <div className="flex mobile:flex-col md:flex-row gap-4 mt-4 flex-wrap">
                {fields.map((item, index) => {
                  // console.log(images[index].image);
                  return (
                    <div
                      key={item.id}
                      className="relative rounded-lg overflow-hidden group"
                    >
                      {images[index].image && (
                        <img
                          className="w-[100px] h-[100px] object-cover"
                          src={URL.createObjectURL(images[index].image)}
                          alt="preview"
                        />
                      )}
                      <div
                        className="inset-0 invisible absolute group-hover:visible cursor-pointer
                        flex items-center justify-center before:absolute before:inset-0
                    before:bg-gray-200 before:opacity-70"
                      >
                        <IconButton
                          color="primary"
                          onClick={() => setIsViewerOpen(true)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => remove(index)}>
                          <Delete className="relative text-red-500" />
                        </IconButton>
                      </div>
                    </div>
                  );
                })}

                <label
                  htmlFor="upload"
                  className="cursor-pointer p-4 border border-dashed rounded hover:bg-gray-100 w-[100px] h-[100px] flex justify-center items-center"
                >
                  <input
                    id="upload"
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(event) => {
                      append({ image: event.target.files[0] });
                    }}
                  />
                  <AddIcon color="primary" fontSize="large" />
                </label>
              </div>
            </div>
          )}
          <div className="flex mobile:flex-col md:flex-row justify-center mt-8 gap-4">
            <Button
              type="button"
              variant="contained"
              fullWidth
              disabled={activeStep === 0}
              onClick={handleBack}
              color="error"
              startIcon={<NavigateBeforeIcon />}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              endIcon={<NavigateNextIcon />}
            >
              {activeStep === steps.length - 1 ? "Preview" : "Next"}
            </Button>
          </div>
        </form>
        {isPreviewOpen && (
          <SellPreview
            formValues={formValues}
            open={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
          />
        )}
      </Paper>
    </div>
  );
}
