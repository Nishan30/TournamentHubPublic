"use client";
import React from "react";
import Select, { Props } from "react-select";

const shapes = {
  square: "rounded-[0px]",
  round: "rounded-[20px]",
} as const;

const variants = {
  fill: {
    gray_50: "bg-gray-50 text-orange-A200",
  },
} as const;

const sizes = {
  xs: "h-[19px] pr-[15px] text-xs",
  sm: "h-[24px] pl-4 pr-8 text-sm",
} as const;

type selectionOptionType = { value: string; label: string };
type SelectProps = Omit<Props, "getOptionLabel"> &
  Partial<{
    className: string;
    options: selectionOptionType[];
    isSearchable: boolean;
    isMulti: boolean;
    onChange: (option: any) => void;
    value: string;
    indicator: React.ReactElement;
    getOptionLabel: (e: any) => string;
    shape: keyof typeof shapes;
    variant: keyof typeof variants;
    size: keyof typeof sizes;
    color: keyof (typeof variants)[keyof typeof variants];
  }>;

const SelectBox = React.forwardRef<any, SelectProps>(
  (
    {
      className = "",
      options = [],
      isSearchable = false,
      isMulti = false,
      indicator,
      shape,
      variant = "fill",
      size = "xs",
      color = "gray_50",
      ...restProps
    },
    ref
  ) => {
    const [menuPortalTarget, setMenuPortalTarget] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
      setMenuPortalTarget(document.body);
    }, []);

    return (
      <Select

        ref={ref}
        options={options}
        className={`${className} flex ${shape && shapes[shape]} ${size && sizes[size]} ${variant && variants[variant][color as keyof (typeof variants)[keyof typeof variants]]}`}
        isSearchable={isSearchable}
        isMulti={isMulti}
        components={{
          IndicatorSeparator: () => null,
          ...(indicator && { DropdownIndicator: () => indicator }),
        }}
        styles={{
          container: (provided) => ({ ...provided, zIndex: 0 }),
          control: (provided) => ({
            ...provided,
            backgroundColor: "transparent",
            border: "0 !important",
            boxShadow: "0 !important",
            minHeight: "auto",
            width: "100%",
            "&:hover": {
              border: "0 !important",
            },
          }),
          input: (provided) => ({
            ...provided,
            color: "inherit",
          }),
          option: (provided, state) => ({
            ...provided,
            color: "#000",
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: 0,
          }),
          placeholder: (provided) => ({
            ...provided,
            margin: 0,
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        menuPortalTarget={menuPortalTarget}
        closeMenuOnScroll={(event: any) => {
          return event.target.id === "scrollContainer";
        }}
        {...restProps}
      >
      </Select>
    );
  }
);

export { SelectBox };
