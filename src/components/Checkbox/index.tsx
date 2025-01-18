import React, { useState } from "react";

const variants = {
  primary: "border-none bg-deep_orange-A200 checked:bg-deep_orange-A200 hover:bg-red-600 checked:hover:bg-red-600",
} as const;

const sizes = {
  xs: "h-[16px] w-[16px]",
} as const;

type CheckboxProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size" | "prefix" | "type" | "onChange"
> &
  Partial<{
    className: string;
    name: string;
    label: string;
    id: string;
    onChange: Function;
    variant: keyof typeof variants;
    size: keyof typeof sizes;
    onClick: () => void;
  }>;

const Checkbox: React.FC<CheckboxProps> = ({
  className = "",
  name = "",
  children,
  label = "",
  id = "checkbox_id",
  onChange,
  variant = "primary",
  size = "xs",
  ...restProps
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className={className + " flex items-center gap-[5px] cursor-pointer"}>
      <input
        className={`${size && sizes[size]} ${variant && variants[variant]}`}
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={handleChange}
        id={id}
        {...restProps}
      />
      {!!label && <label htmlFor={id}>{label}</label>}
      {children}
    </div>
  );
};

export { Checkbox };
