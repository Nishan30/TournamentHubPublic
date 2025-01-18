"use client";
import React, { HTMLAttributes } from "react";
import { Radio } from "../Radio";

type RadioGroupProps = Omit<React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "onChange"> & 
  Partial<{
    selectedValue: string;
    orientation: string;
    name: string;
    disabled: boolean;
    onChange: Function;
  }>;

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ selectedValue, orientation = "horizontal", className, name, children, onChange, disabled, ...restProps }, ref) => {
    const [value, setValue] = React.useState(selectedValue);

    React.useEffect(() => {
      setValue(selectedValue);
    }, [selectedValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value); // Update the selected value state
      onChange && onChange(event.target.value); // Call the provided onChange function
    };

    const compChildren = React.Children.map(children, (child: any) => {
      if (child?.type === Radio) {
        return React.cloneElement(child, {
          value: child.props.value,
          name,
          checked: child.props.value === value,
          onChange: handleChange, // Pass the correct onChange handler
          orientation,
          disabled: child.props.disabled || disabled, // Handle the disabled prop
        });
      }
      return child;
    });

    return (
      <div ref={ref} className={`${className} ${orientation}`} {...restProps}>
        {compChildren}
      </div>
    );
  }
);

export { RadioGroup };
