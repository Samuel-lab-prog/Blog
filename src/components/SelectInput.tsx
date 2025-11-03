type SelectInputProps = {
  label?: string;
  error?: import('react-hook-form').FieldError;
  options: { value: string | number; label: string }[];
  placeholder?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function SelectInput({
  label,
  error,
  options,
  placeholder = 'Select an option',
  ...props
}: SelectInputProps) {
  return (
    <div className="flex flex-col">
      {label && <label className="text-gray-700">{label}</label>}

      <select
        className={`text-input ${
          error ? 'focus:ring-red-500' : 'focus:ring-blue-500'
        }`}
        {...props}
      >
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="h-8">
        {error && (
          <p className="text-red-500">{error.message}</p>
        )}
      </div>
    </div>
  );
}
