import React, { useRef, useImperativeHandle } from 'react';

const shapes = {
  round: 'rounded-[15px]',
} as const;

const variants = {
  outline: {
    indigo_50_01: 'border-indigo-50_01 border border-solid text-indigo-200',
    deep_orange_A200: 'border-deep_orange-A200 border-2 border-solid text-gray-900',
  },
  fill: {
    gray_50: 'bg-gray-50',
  },
} as const;

const sizes = {
  lg: 'h-[50px] pl-0 pr-[35px] text-sm',
  sm: 'h-[38px] pl-0 pr-[18px]',
  xs: 'h-[26px] px-3.5 text-sm',
  md: 'h-[41px] pl-0 pr-[35px] text-sm',
} as const;

type InputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'prefix' | 'type' | 'onChange'
> & {
  className?: string;
  name?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  shape?: keyof typeof shapes;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  suffix?: React.ReactNode;
  value?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      name = '',
      placeholder = '',
      shape,
      size = 'md',
      variant = 'fill',
      onChange,
      suffix,
      value,
      color = "deep_orange_A200",
      ...restProps
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      onChange(e.target.value);
    };

    return (
      <div className={`flex items-center ${sizes[size]} ${(shape && shapes[shape]) || ""} ${variants[variant]?.[color as keyof (typeof variants)[typeof variant]] || variants[variant] || ""} ${className}`}>
        <input
          ref={inputRef}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          className="flex-1 bg-transparent border-none outline-none"
          {...restProps}
        />
        {suffix && (
          <span
            className="ml-2 absolute bottom-0 right-0 mb-2 mr-2 text-gray-500 cursor-pointer"
            onClick={() => inputRef.current?.focus()}
          >
            {suffix}
          </span>
        )}
      </div>
    );
  }
);

export { Input };
