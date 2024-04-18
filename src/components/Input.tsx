import React, { ChangeEventHandler } from "react";

const AuthInput = ({
  type,
  value,
  placeholder,
  onChange,
}: {
  type: string;
  value: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  // get type based on the value which is the key of the signup fields

  return (
    <input
      type={type}
      className="mb-2 w-full text-xs px-4 py-2 border rounded-md"
      name={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default AuthInput;
