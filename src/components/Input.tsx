type InputProps = {
  label?: string;
  error?: import('react-hook-form').FieldError;
  type?: string;
  placeholder?: string;
};

export default function Input({
  label,
  error,
  type = 'text',
  placeholder = 'Type here',
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-gray-700">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`text-input ${
          error ? 'focus:ring-red-500' : 'focus:ring-blue-500 '
        }`}
        {...props}
      />
      <div className='h-8'>

      {error && (
        <p className=" text-red-500">{error.message}</p>
      )}
      </div>
      </div>
  );
}
