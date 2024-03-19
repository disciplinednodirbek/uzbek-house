import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Autocomplete,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SubmitButton } from "components/core/Buttons";
import { api } from "services/api";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import GlobalLoader from "components/core/GlobalLoader";
import { useNavigate } from "react-router-dom";
import { useFetch } from "hooks/useFetch";

export default function NewsForm() {
  const [base64, setBase64] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      tags: [],
    },
  });
  const [selectedTags, setSelectedTags] = useState([]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setBase64(base64String);
    };

    reader.readAsDataURL(file);
  };

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await api.post(`/blogs`, {
        ...values,
        image: base64,
      });
      if (data.success) {
        navigate("/news/news-list", { replace: true });
      }
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  }

  const { data: tags } = useFetch({ url: "/blogs/tags", name: "tags" });

  return (
    <div>
      {isLoading && <GlobalLoader />}
      <h1 className="text-2xl font-semibold">News form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6">
          <div className="flex">
            <label htmlFor="newsImage">
              <FileUploadIcon sx={{ fontSize: 52 }} />
              <input
                id="newsImage"
                hidden
                type="file"
                onChange={handleUpload}
              />
            </label>
            {base64 && (
              <img
                src={base64}
                alt="News image"
                width={150}
                height={100}
                className="ml-8"
              />
            )}
          </div>
          {errors.image && (
            <p className="text-red-600 text-[12px] ml-4">Image is required</p>
          )}
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Title"
                {...field}
                fullWidth
                error={!!errors.title}
                helperText={errors.title && "Title is required"}
                className="!mt-4"
              />
            )}
          />
          <div className={`mt-4`}>
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CKEditor
                  editor={ClassicEditor}
                  data={field.value}
                  onChange={(event, editor) => {
                    field.onChange(editor.getData());
                  }}
                />
              )}
            />
            {errors.description && (
              <p className="text-red-600 text-[12px] ml-4">
                Description is required
              </p>
            )}
          </div>
          <div className="mt-4">
            <Controller
              name="tags"
              control={control}
              render={() => (
                <Autocomplete
                  multiple
                  id="tags-filled"
                  options={tags?.tags}
                  freeSolo
                  value={selectedTags}
                  onChange={(event, newValue) => {
                    setSelectedTags(newValue);
                    setValue("tags", newValue);
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.tags}
                      variant="outlined"
                      label="Tags"
                      placeholder="Tags"
                      helperText={errors.tags && "Tags are required"}
                    />
                  )}
                />
              )}
            />
          </div>
          <div className="mt-4">
            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.type}>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Type"
                    {...field}
                  >
                    <MenuItem value="BUYING">Buying</MenuItem>
                    <MenuItem value="SELLING">Selling</MenuItem>
                    <MenuItem value="IMPROVEMENT">Improvement</MenuItem>
                  </Select>
                  {errors.type && (
                    <FormHelperText>Type is required</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </div>
        </div>
        <div className="mt-4 float-end">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
