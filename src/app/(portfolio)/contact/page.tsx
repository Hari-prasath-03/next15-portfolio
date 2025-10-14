"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";

import Heading from "@/components/ui/Heading";
import ContactForm from "@/components/contact/ContactForm";
import ContactSuccess from "@/components/contact/ContactSuccess";
import ContactInfoCard from "@/components/contact/ContactInfoCard";
import SocialLinks from "@/components/contact/SocialLinks";
import AvailabilityBadge from "@/components/contact/AvailabilityBadge";
import Reveal from "@/motion/Reveal";

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const contactInfo = [
    { icon: MapPin, text: "Tamil nadu, India" },
    { icon: Phone, text: "+91 9786437079" },
    { icon: Mail, text: "hariprasathk2023@gmail.com" },
  ];

  return (
    <div className="min-h-screen max-w-[1378px] mx-auto flex flex-col relative pt-40 pb-10 ml-20 mr-6 sm:mr-20 md:ml-50">
      <Heading title="Let's Connect" />

      <Reveal>
        <p className="sm:text-lg mt-3">
          Have a project in mind or just want to chat? Drop me a message!
        </p>
      </Reveal>

      <div className="flex flex-col lg:flex-row gap-12 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <ContactForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
              />
            ) : (
              <ContactSuccess />
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            {contactInfo.map((info, idx) => (
              <ContactInfoCard key={idx} info={info} delay={0.6 + idx * 0.1} />
            ))}
          </div>

          <SocialLinks />

          <AvailabilityBadge />
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
