import * as React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  id: string;
  label: string;
  options: SelectOption[];
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

/**
 * SelectField component for displaying a labeled select input
 * Used in forms throughout the application
 */
export const SelectField = ({ 
  id, 
  label, 
  options, 
  defaultValue = "", 
  onChange,
  className = ""
}: SelectFieldProps) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-(--muted-foreground) mb-2">
        {label}
      </label>
      <select
        id={id}
        className="block w-full border-(--input) rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-(--ring) focus:border-(--ring) dark:bg-(--input)/30 text-(--foreground)"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};