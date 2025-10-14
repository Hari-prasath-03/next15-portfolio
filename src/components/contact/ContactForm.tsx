"use client";

import { motion } from "motion/react";
import { Send } from "lucide-react";
import { ContactFormData } from "@/app/(portfolio)/contact/page";


type Props = {
  formData: ContactFormData;
  setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const ContactForm = ({ formData, setFormData, onSubmit }: Props) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-6 bg-bg-sec/50 backdrop-blur-sm p-4 py-6 sm:p-8 rounded-2xl border border-primary/20 shadow-2xl max-w-full sm:min-w-md lg:max-w-lg"
      exit={{ opacity: 0, scale: 0.9 }}
      key="form"
    >
      {["name", "email"].map((field, idx) => (
        <motion.div
          key={field}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * idx }}
        >
          <label className="block text-sm font-medium mb-2 capitalize">
            {field}
          </label>
          <motion.input
            type={field === "email" ? "email" : "text"}
            name={field}
            value={formData[field as keyof ContactFormData]}
            onChange={handleChange}
            required
            className="w-full bg-bg border-2 border-primary/30 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all duration-300"
            whileFocus={{ scale: 1.02 }}
          />
        </motion.div>
      ))}

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="block text-sm font-medium mb-2">Message</label>
        <motion.textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full bg-bg border-2 border-primary/30 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all duration-300 resize-none"
          whileFocus={{ scale: 1.02 }}
        />
      </motion.div>

      <motion.button
        type="submit"
        className="w-full bg-primary text-bg font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Send Message</span>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Send className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
        </motion.div>
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;
