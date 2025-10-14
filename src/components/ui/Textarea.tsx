interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  required = false,
  placeholder,
  rows = 4,
  ...props
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={name} className="text-sm font-medium text-text">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      required={required}
      placeholder={placeholder}
      rows={rows}
      className="px-4 py-3 rounded-lg border-2 border-transparent bg-bg-sec text-text focus:outline-none focus:border-primary transition-all duration-200 resize-none placeholder:text-neutral-500"
      {...props}
    />
  </div>
);

export default Textarea;
