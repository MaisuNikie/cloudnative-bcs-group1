interface FormInputFieldProps {
  field: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function FormInputField({
  field,
  value,
  disabled,
  onChange,
}: FormInputFieldProps) {
  return (
    <>
      <label htmlFor={field} className="sr-only">
        {field}
      </label>

      <input
        id={field}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field}
        disabled={disabled}
        className="input"
      />
    </>
  );
}