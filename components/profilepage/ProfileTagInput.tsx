
import { useState, KeyboardEvent, useRef, } from "react";
import { X } from "lucide-react";

interface ProfileTagInputProps {
  id?: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  maxHeight?: string;
}

export const ProfileTagInput = ({
  id,
  value = [],
  onChange,
  placeholder = "Add tag",
  className = "",
  maxHeight,
}: ProfileTagInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus the input when clicking anywhere in the container
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // Add a tag when pressing Enter
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      // Remove the last tag when pressing Backspace in an empty input
      onChange(value.slice(0, -1));
    }
  };

  // Remove a tag when clicking its delete button
  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={`flex flex-wrap items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${maxHeight ? `overflow-y-auto ${maxHeight}` : "min-h-10"} ${className}`}
    >
      {value.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeTag(tag);
            }}
            className="rounded-full p-0.5 hover:bg-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove {tag}</span>
          </button>
        </span>
      ))}
      <input
        id={id}
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground min-w-20"
      />
    </div>
  );
};
