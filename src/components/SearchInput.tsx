import { useState } from 'react';
import Input from './Input';

type SearchInputProps = {
  label?: string;
  placeholder?: string;
  options: string[];
  onSelect?: (value: string) => void;
};

export default function SearchInput({
  label,
  placeholder = 'Digite algo...',
  options,
  onSelect,
}: SearchInputProps) {
  const [query, setQuery] = useState('');
  const [showList, setShowList] = useState(false);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative flex flex-col w-full">
      <Input
        label={label}
        placeholder={placeholder}
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
          setShowList(true);
        }}
        onBlur={() => setTimeout(() => setShowList(false), 150)}
        onFocus={() => setShowList(true)}
      />

      {showList && filteredOptions.length > 0 && (
        <ul className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-md max-h-48 overflow-y-auto">
          {filteredOptions.map((opt) => (
            <li
              key={opt}
              className="px-3 py-2 cursor-pointer hover:bg-blue-100"
              onClick={() => {
                setQuery(opt);
                setShowList(false);
                onSelect?.(opt);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
