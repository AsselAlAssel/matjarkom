import React, { useId } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";

export default function MatjarkomField(props) {
  const id = useId();
  const { label, required, ...rest } = props;
  return (
    <>
      {props?.label ? (
        <InputLabel
          htmlFor={id}
          required={required}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {props.label}
        </InputLabel>
      ) : null}
      <TextField label={""} id={id} {...rest} />
    </>
  );
}
