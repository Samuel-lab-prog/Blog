import { type FieldError } from 'react-hook-form';

type TextAreaProps = {
  label?: string;
  error?: FieldError;
  placeholder?: string;
  rows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({
  label,
  error,
  placeholder = 'Type here',
  rows = 4,
  ...props
}: TextAreaProps) {
  return (
    <div className="flex flex-col">
      {label && <label className="text-gray-700 mb-1">{label}</label>}
      <textarea
        placeholder={placeholder}
        rows={rows}
        className={`text-input resize-none p-2 border rounded focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'
        }`}
        {...props}
      />
      <div className="h-8">
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    </div>
  );
}
