interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  ...props
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={name} className="text-sm font-medium text-text">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      required={required}
      placeholder={placeholder}
      className="px-4 py-3 rounded-lg border-2 border-transparent bg-bg-sec text-text focus:outline-none focus:border-primary transition-all duration-200 placeholder:text-neutral-500"
      {...props}
    />
  </div>
);

export default Input;
