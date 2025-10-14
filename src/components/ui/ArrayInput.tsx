import { Plus, X } from "lucide-react";
import { useState } from "react";

interface ArrayInputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  defaultItems?: string[];
}

const ArrayInput: React.FC<ArrayInputProps> = ({
  label,
  name,
  placeholder,
  type,
  icon: Icon,
  defaultItems = [""],
}) => {
  const [items, setItems] = useState(defaultItems);

  const addItem = () => setItems([...items, ""]);
  const removeItem = (index: number) =>
    setItems(items.filter((_, i) => i !== index));
  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (type === "url") return;
    const pastedText = e.clipboardData.getData("text");

    const sentences = pastedText
      .split(".")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (sentences.length > 1) {
      e.preventDefault();
      const newItems = [...items];
      newItems[index] = sentences[0];
      const remaining = sentences.slice(1);
      const updated = [
        ...newItems.slice(0, index + 1),
        ...remaining,
        ...newItems.slice(index + 1),
      ];
      setItems(updated);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-text">{label}</label>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex-1 relative">
              {Icon && (
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
              )}
              <input
                type="text"
                name={name}
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                onPaste={(e) => handlePaste(e, index)}
                placeholder={placeholder}
                className={`w-full ${
                  Icon ? "pl-11" : "pl-4"
                } pr-4 py-3 rounded-lg border-2 border-transparent bg-bg-sec text-text focus:outline-none focus:border-primary transition-all duration-200 placeholder:text-neutral-500`}
              />
            </div>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-3 rounded-lg bg-bg-sec text-text transition-all duration-200 hover:scale-105 hover:bg-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-dashed border-primary/30 text-text hover:border-primary transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Add {label.slice(0, -1)}
        </button>
      </div>
    </div>
  );
};

export default ArrayInput;
