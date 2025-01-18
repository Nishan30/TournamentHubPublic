import React from "react";

// Hypothetical SwitchProvider component - replace with your implementation or library
const SwitchProvider: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  width: number;
  height: number;
  checkedIcon: React.ReactNode;
  uncheckedIcon: React.ReactNode;
}> = ({ checked, onChange, width, height, checkedIcon, uncheckedIcon }) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
        backgroundColor: checked ? "#5cdb95" : "#f0f0f0",
      }}
      onClick={() => onChange(!checked)}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        {checked ? checkedIcon : uncheckedIcon}
      </div>
    </div>
  );
};

// Define sizes for different switch sizes
const sizes = {
  xs: {
    width: 36,
    height: 18,
  },
} as const;

// Define props for the Switch component
type SwitchProps = Partial<{
  value: boolean;
  className: string;
  checkedIcon: React.ReactNode;
  uncheckedIcon: React.ReactNode;
  onChange: (val: string | boolean) => void;
  size: keyof typeof sizes;
}>;

// Define the Switch component
const Switch: React.FC<SwitchProps> = ({
  value = false,
  className,
  checkedIcon = <div style={{ width: "12px", height: "12px", backgroundColor: "#fff", borderRadius: "50%", boxShadow: "0 0 3px #888" }} />,
  uncheckedIcon = <div style={{ width: "12px", height: "12px", backgroundColor: "#fff", borderRadius: "50%", boxShadow: "0 0 3px #888" }} />,
  onChange,
  size = "xs",
}) => {
  const [selected, setSelected] = React.useState<boolean>(value); // Ensure selected is boolean
  const handleChange = (val: boolean) => {
    setSelected(val);
    onChange?.(val);
  };

  return (
    <div className={className}>
      <SwitchProvider
        checked={selected} // Ensure selected is boolean
        onChange={handleChange}
        {...sizes[size]}
        checkedIcon={checkedIcon}
        uncheckedIcon={uncheckedIcon}
      />
    </div>
  );
};


export { Switch };
