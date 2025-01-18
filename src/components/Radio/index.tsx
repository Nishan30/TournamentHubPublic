import React from "react";

const variants = {
  primary: "border-deep_orange-A200 border-2 border-solid checked:bg-deep_orange-A200 checked:border-transparent",
} as const;

const sizes = {
  xs: "h-[15px] w-[15px] rounded-full",
} as const;

export type RadioProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size" | "prefix" | "type" | "onChange"
> &
  Partial<{
    className: string;
    name: string;
    label: string;
    id: string;
    variant: keyof typeof variants;
    size: keyof typeof sizes;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
  }>;

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className = "", name = "", label = "", id = "radio_id", variant = "primary", size = "xs", onChange, ...restProps }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(event); // Call the provided onChange function
    };

    return (
      <label className={className + " flex items-center gap-[5px] cursor-pointer"}>
        <input
          className={`${(size && sizes[size]) || ""} ${(variant && variants[variant]) || ""} appearance-none`}
          ref={ref}
          type="radio"
          name={name}
          id={id}
          onChange={handleChange} // Call handleChange function on input change
          {...restProps}
        />
        {label && <span>{label}</span>}
      </label>
    );
  }
);

export { Radio };
