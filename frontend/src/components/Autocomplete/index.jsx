import { ErrorMessage } from "@hookform/error-message";
import {
  Autocomplete as MuiAutocomplete,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useHooks } from "hooks";
import { useState } from "react";
import { Controller } from "react-hook-form";

export function Autocomplete({
  options = [],
  label,
  errors,
  multiple,
  changeTextField,
  onSelect,
  onBlur,
  loading,
  groupBy,
  noOptionsText,
  sx = {},
  className = "",
  helperText = null,
  fullWidth = false,
  freeSolo = false,
  disableCloseOnSelect = false,
  readOnly = false,
  disabled = false,
  hasFilterOptions = true,
  getOptionDisabled = () => {},
  control,
  ...custom
}) {
  const [open, setOpen] = useState(false);
  const asyncLoading = open && loading;
  const { get } = useHooks();
  const filterOptions = (_options, { inputValue }) => {
    if (inputValue === "") {
      return _options.slice(0, 1000); // show first 1000 options when input field is empty
    }

    return _options
      .filter(
        (option) =>
          (option.title ?? option.label)
            ?.toLowerCase()
            .includes(inputValue?.toLowerCase()) || option.hasLoadMore
      )
      .slice(0, 1000); // show only first 1000 matching options
  };

  return (
    <>
      <Controller
        control={control}
        disabled={disabled}
        {...custom}
        render={({ field: { onChange, value = "", ...field } }) => {
          return (
            <MuiAutocomplete
              sx={sx}
              disabled={disabled}
              open={open}
              value={value ? value : null}
              filterOptions={
                hasFilterOptions
                  ? filterOptions
                  : () => {
                      return options;
                    }
              }
              options={options}
              groupBy={groupBy}
              className={className}
              multiple={multiple}
              limitTags={5}
              freeSolo={freeSolo}
              readOnly={readOnly}
              getOptionDisabled={getOptionDisabled}
              fullWidth={fullWidth}
              loading={asyncLoading}
              noOptionsText={noOptionsText}
              onOpen={() => setOpen(true)}
              onClose={() => {
                setOpen(false);
                field.onBlur();
              }}
              getOptionLabel={(option) => option.title ?? option.label ?? ""}
              disableCloseOnSelect={disableCloseOnSelect}
              isOptionEqualToValue={(option, value) => {
                return option.value === value.value;
              }}
              // onBlur={field.onBlur}
              onChange={(e, data, reason) => {
                onChange(data);
                if (onSelect) onSelect(data, reason);
              }}
              renderOption={(_props, option) => {
                if (option.hasLoadMore) {
                  return (
                    <li
                      {..._props}
                      ref={option.ref}
                      style={option.style ? option.style : {}}
                    >
                      {option.label}
                    </li>
                  );
                }
                if (option.onClick) {
                  return (
                    <li
                      className={`px-[18px] py-[6px] cursor-pointer hover:bg-blue-100`}
                      style={option.style ? option.style : {}}
                      key={option.id ?? option.value ?? option.label}
                      onClick={option?.onClick}
                    >
                      {option.title ?? option.label}
                    </li>
                  );
                }
                return (
                  <li
                    {..._props}
                    key={option.id ?? option.value ?? option.label}
                    style={option.style ? option.style : {}}
                  >
                    {option.title ?? option.label}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  disabled={disabled}
                  size="small"
                  error={!!get(errors, custom.name)}
                  helperText={helperText}
                  onChange={(e) => {
                    params.inputProps.onChange(e);
                    if (changeTextField) changeTextField(e.target.value);
                  }}
                  onBlur={(e) => {
                    onBlur?.(e);
                    params.inputProps.onBlur(e);
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {asyncLoading && (
                          <CircularProgress color="inherit" size={20} />
                        )}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              {...field}
            />
          );
        }}
      />
      <ErrorMessage
        errors={errors}
        name={get(custom, "name")}
        render={({ message }) => (
          <span className="text-red-500 block">{message}</span>
        )}
      />
    </>
  );
}
