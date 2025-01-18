import React from "react";

const shapes = {
  round: "rounded-[15px]",
} as const;

const variants = {
  tarotOutlineDeeporangeA200: "border-deep_orange-A200 border-2 border-solid",
} as const;

const sizes = {
  xs: "h-[220px] px-[12px]",
} as const;

type TextAreaProps = Omit<
  React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
  "size" | "prefix" | "type" | "onChange"
> &
  Partial<{
    className: string;
    name: string;
    placeholder: string;
    onChange: (value: string) => void; 
    shape: keyof typeof shapes;
    variant: keyof typeof variants;
    size: keyof typeof sizes;
    suffix: React.ReactNode; 
  }>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      shape,
      size = "xs",
      variant = "tarotOutlineDeeporangeA200",
      onChange,
      suffix,
      ...restProps
    },
    ref
  ) => {
    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      if (onChange) onChange(e.target.value);
    };

    return (
      <div className="relative w-full">
        <textarea
          ref={ref}
          className={`w-full ${className} ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${
            (variant && variants[variant]) || ""
          }`}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          {...restProps}
        />
        {suffix && (
          <span className="absolute bottom-0 right-0 mb-2 mr-2 text-gray-500">
            {suffix}
          </span>
        )}
      </div>
    );
  }
);

export { TextArea };
