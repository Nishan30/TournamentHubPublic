// DateInput.tsx

import React, { useRef, useImperativeHandle } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  
type DateInputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'prefix' | 'type' | 'onChange' | 'value'
> & {
  className?: string;
  name?: string;
  placeholder?: string;
  onChange: (value: Date | null) => void;
  shape?: keyof typeof shapes;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  suffix?: React.ReactNode;
  value?: Date | null;
  datepickerProps?: any;
};

const DateInput = React.forwardRef<HTMLDivElement, DateInputProps>(
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
        datepickerProps,
        color = "deep_orange_A200",
        ...restProps
      },
      ref
    ) => {
      const inputRef = useRef<HTMLInputElement>(null);
      useImperativeHandle(ref, () => inputRef.current!);
  
      return (
        <div className={`relative ${className}`} ref={ref}>
          <DatePicker
            selected={value}
            onChange={(date: Date | null) => onChange(date)}
            customInput={
              <input
                ref={inputRef}
                className={`flex items-center ${sizes[size]} ${(shape && shapes[shape]) || ""} ${variants[variant]?.[color as keyof (typeof variants)[typeof variant]] || variants[variant] || ""}`}
                name={name}
                placeholder={placeholder}
                {...restProps}
              />
            }
            {...datepickerProps}
          />
          {suffix && (
            <span className="absolute top-1/2 transform -translate-y-1/2 left-40 flex items-center">
              {suffix}
            </span>
          )}
        </div>
      );
    }
  );
  
  export { DateInput };
  
