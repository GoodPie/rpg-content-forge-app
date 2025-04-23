import * as React from "react";

export interface CheckboxFieldProps {
  id: string;
  label: string;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

/**
 * CheckboxField component for displaying a labeled checkbox input
 * Used in forms throughout the application
 */
export const CheckboxField = ({ 
  id, 
  label, 
  defaultChecked = false, 
  onChange,
  className = ""
}: CheckboxFieldProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 text-(--primary) focus:ring-(--ring) border-(--input) rounded"
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <label htmlFor={id} className="ml-2 block text-sm text-(--muted-foreground)">
        {label}
      </label>
    </div>
  );
};